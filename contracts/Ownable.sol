pragma solidity ^0.5.0;

contract Ownable {

    address payable public owner;
    
    constructor() public {
        owner = msg.sender;
    }  

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner");
        _;
    }
    
    modifier validAccount(address _account) {
        require(_account != address(0x0));
        _;
    }

    function transferOwnership(address payable _newOwner) public onlyOwner validAccount(_newOwner) {
        owner = _newOwner;
    }

    function destroy() public onlyOwner {
        selfdestruct(owner);
    }
}