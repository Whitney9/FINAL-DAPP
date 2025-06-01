// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyContract is Ownable, ERC721 {
    using Strings for uint256;
    uint256 public constant SECONDS_PER_DAY = 86400;

    struct Property {
        string location;
        uint256 rentPrice;
        uint256 deposit;
        address currentTenant;
        uint256 rentalStart;
        uint256 rentalExpiry;
    }

    struct RentalRecord {
        address tenant;
        uint256 startTime;
        uint256 endTime;
        uint256 pricePaid;
    }

    mapping(uint256 => Property) public properties;
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => uint256) public deposits;
    mapping(uint256 => RentalRecord[]) public rentalRecords;

    uint256 public nextTokenId;

    event RentalHistory(
        uint256 indexed tokenId,
        address indexed tenant,
        uint256 rentalPeriod,
        uint256 rentalStartTime,
        uint256 rentalExpiryTime
    );

    constructor() ERC721("RentalNFT", "rNFT") Ownable(msg.sender) {}

    // Mint NFT with rental info
    function mint(
        string memory location,
        uint256 rentPrice,
        uint256 deposit,
        string memory tokenURI_
    ) external {
        uint256 tokenId = nextTokenId;
        _safeMint(msg.sender, tokenId);

        properties[tokenId] = Property({
            location: location,
            rentPrice: rentPrice,
            deposit: deposit,
            currentTenant: address(0),
            rentalStart: 0,
            rentalExpiry: 0
        });

        _tokenURIs[tokenId] = tokenURI_;
        nextTokenId++;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function rent(uint256 tokenId, uint256 numDays) external payable {
        require(numDays > 0, "Invalid rental period");
        Property storage property = properties[tokenId];
        require(
            property.currentTenant == address(0) || block.timestamp > property.rentalExpiry,
            "Currently rented"
        );

        uint256 totalRent = property.rentPrice * numDays;
        uint256 total = totalRent + property.deposit;
        require(msg.value >= total, "Insufficient payment");

        address landlord = ownerOf(tokenId);
        require(msg.sender != landlord, "Owner cannot rent own property");

        property.currentTenant = msg.sender;
        property.rentalStart = block.timestamp;
        property.rentalExpiry = block.timestamp + (numDays * SECONDS_PER_DAY);

        deposits[tokenId] = property.deposit;

        payable(landlord).transfer(totalRent);

        if (msg.value > total) {
            payable(msg.sender).transfer(msg.value - total);
        }

        rentalRecords[tokenId].push(RentalRecord({
            tenant: msg.sender,
            startTime: block.timestamp,
            endTime: property.rentalExpiry,
            pricePaid: totalRent
        }));

        emit RentalHistory(tokenId, msg.sender, numDays, block.timestamp, property.rentalExpiry);
    }


    function returnRental(uint256 tokenId) external {
        Property storage property = properties[tokenId];
        require(property.currentTenant == msg.sender, "Not current tenant");
        require(block.timestamp >= property.rentalExpiry, "Rental not ended");

        uint256 refund = deposits[tokenId];
        require(refund > 0, "No deposit");

        property.currentTenant = address(0);
        property.rentalStart = 0;
        property.rentalExpiry = 0;
        deposits[tokenId] = 0;

        payable(msg.sender).transfer(refund);
    }

    function extendRental(uint256 tokenId, uint256 extraDays) external payable {
        require(extraDays > 0, "Invalid extension time");
        Property storage property = properties[tokenId];
        require(property.currentTenant == msg.sender, "Not current tenant");
        require(block.timestamp <= property.rentalExpiry, "Already expired");

        uint256 extraRent = property.rentPrice * extraDays;
        require(msg.value >= extraRent, "Insufficient payment");

        address landlord = ownerOf(tokenId);
        payable(landlord).transfer(extraRent);

        if (msg.value > extraRent) {
            payable(msg.sender).transfer(msg.value - extraRent);
        }

        property.rentalExpiry += (extraDays * SECONDS_PER_DAY);

        rentalRecords[tokenId].push(RentalRecord({
            tenant: msg.sender,
            startTime: block.timestamp,
            endTime: property.rentalExpiry,
            pricePaid: extraRent
        }));

        emit RentalHistory(tokenId, msg.sender, extraDays, block.timestamp, property.rentalExpiry);
    }


    function totalDeposits() public view returns (uint256 total) {
        for (uint256 i = 0; i < nextTokenId; i++) {
            total += deposits[i];
        }
    }

    function withdraw() external onlyOwner {
        uint256 available = address(this).balance - totalDeposits();
        require(available > 0, "Nothing to withdraw");
        payable(owner()).transfer(available);
    }
}
