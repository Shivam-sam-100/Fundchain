// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Charity{
    address payable public charityOwner;
    string public charityName;
    uint256 public requiredAmount;
    string public description;
    string[] public tags;
    uint256 public minAmount;
    uint256 public amountCollected;
    bool public isOpen;
    uint256 public noOfDonors = 0;
    address[] public donors;
    mapping (address => bool) hasDonated; // To check if the sameperson has donated before
    constructor (address _charityowner, string memory _charityname, uint256 _requiredamount, string memory _funddescription, uint256 _minamount)  {
        charityOwner = payable(_charityowner);
        charityName = _charityname;
        requiredAmount = _requiredamount;
        description = _funddescription;
        minAmount = _minamount;
        tags = new string[](0);
        isOpen = true;
        noOfDonors=0;
        donors = new address[](0);
        amountCollected = 0;
    }
  
    function pay() external payable {
        if (msg.value<minAmount)
        {
            revert();
        }
        if (isOpen!=true)
        {
            revert();
        }
        amountCollected+= msg.value;
        if (amountCollected>=requiredAmount)
        {
            isOpen=false;
            charityOwner.transfer(address(this).balance);
        }
        if (!hasDonated[msg.sender])
        {
            donors.push(msg.sender);
            noOfDonors++;
        }
        hasDonated[msg.sender]=true;
    }
     function addTags(string[] memory _s) public {
        for (uint i=0;i<_s.length;i++)
        {
           tags.push(_s[i]);
        }
    }
    function getNoOfDonors() public view returns (uint256) {
        return noOfDonors;
    }
    function getTags() public view returns (string[] memory) {
        return tags;
    }
      function withdraw() public payable {
        charityOwner.transfer(address(this).balance);
        isOpen=false;
    }
    function getDonors() public view returns (address[] memory) {
        return donors;
    }
    function getCollectionPercentage() public view returns(uint256){
        return ((amountCollected*100)/requiredAmount);
    }
    

}