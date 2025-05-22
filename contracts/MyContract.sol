// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract MyContract is ERC721, Ownable, ERC721Enumerable {
    using Strings for uint256;

    mapping(uint256 => string) private _tokenURIs;

    struct Property {
        string location;
        uint256 rentPrice;
        uint256 deposit;
        address currentTenant;
        uint256 rentalStart;
        uint256 rentalExpiry;
    }


    mapping(uint256 => Property) public properties;

    event RentalHistory(
        uint256 indexed tokenId,
        address indexed tenant,
        uint256 rentalPeriod,
        uint256 rentalStartTime,
        uint256 rentalExpiryTime
    );

    struct RentalRecord {
        address tenant;
        uint256 startTime;
        uint256 endTime;
        uint256 pricePaid;
    }

    mapping(uint256 => RentalRecord[]) public rentalRecords;
    // 存儲每個 tokenId 的押金
    mapping(uint256 => uint256) public deposits;


    uint256 public nextTokenId;

    constructor() ERC721("RentalNFT", "rNFT") {}

    function mint(string memory location, uint256 rentPrice, uint256 deposit, string memory tokenURI_) external {
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


    function tokenURI(uint256 tokenId) public view override(ERC721) returns (string memory) {
        require(ERC721._exists(tokenId), "Token does not exist");
        return _tokenURIs[tokenId];
    }

    function rent(uint256 tokenId, uint256 rentalPeriod) external payable {
    Property storage property = properties[tokenId];

    require(_exists(tokenId),"Token does not exist");
    require(property.currentTenant == address(0) || block.timestamp > property.rentalExpiry, "Currently rented");

    uint256 totalRequired = property.rentPrice + property.deposit;
    require(msg.value >= totalRequired, "Insufficient payment");

    address landlord = ownerOf(tokenId);
    require(landlord != msg.sender, "Owner cannot rent own property");

    // 更新租賃資訊
    property.currentTenant = msg.sender;
    property.rentalStart = block.timestamp;
    property.rentalExpiry = block.timestamp + rentalPeriod;

    // 存放押金（留在合約內）
    deposits[tokenId] = property.deposit;

    // 轉租金給房東
    payable(landlord).transfer(property.rentPrice);

    // 儲存租賃紀錄
    rentalRecords[tokenId].push(RentalRecord({
        tenant: msg.sender,
        startTime: block.timestamp,
        endTime: property.rentalExpiry,
        pricePaid: msg.value
    }));

    emit RentalHistory(tokenId, msg.sender, rentalPeriod, block.timestamp, property.rentalExpiry);
    }


    function returnRental(uint256 tokenId) external {
        Property storage property = properties[tokenId];
        require(property.currentTenant == msg.sender, "Not the current tenant");
        require(block.timestamp <= property.rentalExpiry, "Rental expired");

        uint256 refund = deposits[tokenId];
        require(refund > 0, "No deposit found");

        // 清除租賃資訊
        property.currentTenant = address(0);
        property.rentalStart = 0;
        property.rentalExpiry = 0;
        deposits[tokenId] = 0;

        // 退押金
        payable(msg.sender).transfer(refund);
    }


    function extendRental(uint256 tokenId, uint256 extraTime) external payable {
        Property storage property = properties[tokenId];
        require(property.currentTenant == msg.sender, "Not the current tenant");
        require(msg.value >= property.rentPrice, "Insufficient payment");

        address landlord = ownerOf(tokenId);
        require(block.timestamp <= property.rentalExpiry, "Rental already expired");

        payable(landlord).transfer(msg.value);

        emit RentalHistory(tokenId, msg.sender, extraTime, block.timestamp, property.rentalExpiry);
    }

    function sublet(uint256 tokenId, address newTenant) external payable {
        Property storage property = properties[tokenId];
        require(property.currentTenant == msg.sender, "Not the current tenant");
        require(block.timestamp <= property.rentalExpiry, "Rental expired");
        require(msg.value > 0, "Sublet fee required");

        payable(msg.sender).transfer(msg.value);

        property.currentTenant = newTenant;

        emit RentalHistory(tokenId, newTenant, property.rentalExpiry - block.timestamp, block.timestamp, property.rentalExpiry);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override(ERC721,ERC721Enumerable) {
        Property storage property = properties[tokenId];
        if (property.currentTenant != address(0) && block.timestamp <= property.rentalExpiry) {
            require(from == address(0) || to == address(0), "Cannot transfer while rented");
        }
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
{
    return super.supportsInterface(interfaceId);
}

}