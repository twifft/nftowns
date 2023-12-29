// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC721LazyMint.sol";

contract contract721 is ERC721LazyMint {
    constructor(
        
        string memory _name,
        string memory _symbol
        
    ) ERC721LazyMint(msg.sender, _name, _symbol, msg.sender, 0) {}
        enum Rarity {Common, Uncommon, Epic, Legendary, Monopol, Mythic}

        mapping(uint256 => Rarity) private rarityLevels;

        event RarityUpgraded(uint256 indexed tokenId, Rarity newRarity);

        function getRarity(uint256 tokenId) external view returns (Rarity) {
            return rarityLevels[tokenId];
        }

        function upgradeRarity(uint256 tokenId) external {
            require(_exists(tokenId), "Token does not exist!");
            require(ownerOf(tokenId) == msg.sender, "Not the Owner of the token!");
            require(rarityLevels[tokenId] == Rarity.Common, "");

            rarityLevels[tokenId] = Rarity.Uncommon;
        }
    


    
}

/*

pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC721LazyMint.sol";

contract Contract721 is ERC721LazyMint {
    constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    ) ERC721LazyMint(_defaultAdmin, _name, _symbol, _royaltyRecipient, _royaltyBps) {}

    // Enum to represent rarity levels
    enum Rarity { Common, Uncommon }

    // Mapping to store the rarity level of each token
    mapping(uint256 => Rarity) private rarityLevels;

    // Event emitted when an NFT's rarity is upgraded
    event RarityUpgraded(uint256 indexed tokenId, Rarity newRarity);

    // Function to get the current rarity of a token
    function getRarity(uint256 tokenId) external view returns (Rarity) {
        return rarityLevels[tokenId];
    }

    // Function to upgrade the rarity of an NFT
    function upgradeRarity(uint256 tokenId) external {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "Not the owner of the token");
        require(rarityLevels[tokenId] == Rarity.Common, "Token is not common");

        // Additional upgrade criteria checks can be added here

        // Upgrade logic
        rarityLevels[tokenId] = Rarity.Uncommon;

        // Emit an event for the UI to update
        emit RarityUpgraded(tokenId, Rarity.Uncommon);
    }
}
*/