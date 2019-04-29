pragma solidity ^0.5.0;

import "./Ownable.sol";

contract Pausable is Ownable {

    bool public paused;
    
    function pause() public onlyOwner {
        paused = true;
    }

    function resume() public onlyOwner {
        paused = false;
    }

    modifier whenNotPaused() {
        require(paused == false, "Not Paused");
        _;
    }
}