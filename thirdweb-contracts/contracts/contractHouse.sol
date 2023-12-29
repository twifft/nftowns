// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC1155LazyMint.sol";

contract contractHouse is ERC1155LazyMint {
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC1155LazyMint(msg.sender, _name, _symbol, msg.sender, 0) {}

    function verifyClaim(
        address _claimer, uint256 _tokenId, uint256 _quantity
        ) public view override {
        
    }

    function merge() public {
        _burn(msg.sender, 0, 1);
        _mint(msg.sender, 1, 1, "");
    }
    function upgrade() public {
        
    }
    

}