pragma solidity ^0.5.0;

// Funcionalidades:
//  - Buy
//  - Refund account
//  - Refund to account
// Herencia:
//  - Ownable
//  - Pausable
// Events

contract Concert {

    string public concertName;
    uint public ticketPrice;

    mapping(address => bool) customers;

    constructor(string memory _concertName, uint _etherPrice) public {
        concertName = _concertName;
        ticketPrice = _etherPrice * 1 ether;
        
    }

}