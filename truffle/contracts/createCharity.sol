// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./importer.sol";

contract createCharity {
    uint256 public availableContracts = 0;
    address payable public contractAddress;
    address payable charityowner;
    mapping (uint => Charity) public charities;
 function createFund(address _charityowner, string memory _charityname, uint256 _requiredamount, string memory _funddescription, uint256 _minamount) public
 {
     charities[availableContracts] = new Charity(_charityowner, _charityname, _requiredamount, _funddescription, _minamount);
     availableContracts++;
 }

}