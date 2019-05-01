pragma solidity ^0.5.0;

import './Pausable.sol';

// Funcionalidades:
//  - Buy
//  - Refund account
//  - Refund to account
// Herencia:
//  - Ownable
//  - Pausable
// Events
contract Concert is Pausable {

    string public concertName;
    uint public ticketPrice;

    mapping(address => bool) customers;

    constructor(string memory _concertName, uint _etherPrice) public {
        concertName = _concertName;
        ticketPrice = _etherPrice * 1 ether;       
    }

    function isAccountCustomer(address _account) public view onlyOwner returns (bool) {
        return _isCustomer(_account);
    }

    function buyTicket() payable public {
        require(msg.value == ticketPrice, "IncorrectPrice");
        if (!_isCustomer(msg.sender)) {
            // Si no es customer ==> Puede comprar
            _setPurchaseStatus(msg.sender, true);
        } else {
            // Si es customer ==> Revertir
            revert("AlreadyClient");
        }
    }

    function refundTicket() payable public isCustomer {
        _refundTicket(msg.sender);
    }

    function refundTicketToAccount(address payable _account) payable public isCustomer validAccount(_account) {
        _refundTicket(_account);
    }

    function transferTicket(address _to) public isCustomer validAccount(_to) {
        require(!_isCustomer(_to), "AlreadyCustomer");
 		_setPurchaseStatus(msg.sender, false);
        _setPurchaseStatus(_to , true);
    }

    function _refundTicket (address payable _account) private {
        _setPurchaseStatus(msg.sender, false);
        _account.transfer(ticketPrice);
    }

    modifier isCustomer() {
        require(_isCustomer(msg.sender));
        _;
    }

    function _isCustomer(address _account) private view returns (bool) {
        return customers[_account] == true;
    }

    function _setPurchaseStatus(address _account, bool _status) private {
        customers[_account] = _status;
    }
}