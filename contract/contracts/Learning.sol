// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Learning is ERC20, ERC20Burnable, Ownable {
    uint256 public immutable maxSupply;

    constructor(address initialOwner)
        ERC20("Learning", "LTK")
        Ownable(initialOwner)
    {
        maxSupply = 10_000_000 * 10 ** decimals();
        _mint(msg.sender, 10_000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= maxSupply, "Max supply exceeded");
        _mint(to, amount);
    }
}
