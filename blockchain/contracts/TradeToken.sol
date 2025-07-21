// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TradeToken {
    address public owner;
    uint public price = 0.01 ether;

    mapping(address => uint) public balances;

    event Bought(address indexed buyer, uint amount);
    event Sold(address indexed seller, uint amount);

    constructor() {
        owner = msg.sender;
    }

    function buy() public payable {
        require(msg.value >= price, "Send more ETH");
        uint amount = msg.value / price;
        balances[msg.sender] += amount;
        emit Bought(msg.sender, amount);
    }

    function sell(uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount * price);
        emit Sold(msg.sender, amount);
    }

    function withdraw() public {
        require(msg.sender == owner, "Not owner");
        payable(owner).transfer(address(this).balance);
    }
}
