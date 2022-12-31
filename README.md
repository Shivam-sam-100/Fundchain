# React Truffle Box

This box comes with everything you need to start using Truffle to write, compile, test, and deploy smart contracts, and interact with them from a React app.

## Installation

First ensure you are in an empty directory.

Run the `unbox` command using 1 of 2 ways.

```sh
# Install Truffle globally and run `truffle unbox`
$ npm install -g truffle
$ truffle unbox react
```

```sh
# Alternatively, run `truffle unbox` via npx
$ npx truffle unbox react
```

Start the react dev server.

```sh
$ cd client
$ npm start
  Starting the development server...
```

From there, follow the instructions on the hosted React app. It will walk you through using Truffle and Ganache to deploy the `SimpleStorage` contract, making calls to it, and sending transactions to change the contract's state.

## FAQ

- __How do I use this with Ganache (or any other network)?__

  The Truffle project is set to deploy to Ganache by default. If you'd like to change this, it's as easy as modifying the Truffle config file! Check out [our documentation on adding network configurations](https://trufflesuite.com/docs/truffle/reference/configuration/#networks). From there, you can run `truffle migrate` pointed to another network, restart the React dev server, and see the change take place.

- __Where can I find more resources?__

  This Box is a sweet combo of [Truffle](https://trufflesuite.com) and [Create React App](https://create-react-app.dev). Either one would be a great place to start!

Solidity
Solidity is an object-orieted, high level language which is used to write smart contracts. We can think of smart contracts as just regular programs (hosted on the blockchain) that gets executed whenever certain conditions are met on the blockchain. Do go over the following resources for learning more about Solidity and its functions :

Solidity Docs (Best place to start learning about Solidity)
Chainlink Docs (For learning and using price feeds, VRF and other functions)
Let us discuss the various parts of our solidity code (namely the files createCharity.sol and importer.sol present in the truffle/contracts/ folder.

createCharity.sol
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./importer.sol";
The first line specifies what liscense we are using (MIT Liscense in our case). The second line indicates the version of solidity we are using and finally the third line imports the file importer.sol (which we will be creating later).

Let us look over the rest of the code. Here we are writing a smart contract called createCharity which has three public variables (availableContracts for storing the total number of contracts or in our case funds that we will be creating) and a mapping of type uint to type charity (think of mappings in solidity as kind of map data-structures, here our key if of type uint and our value is of type Charity). It is important to note at this stage that Charity is not a valid pre-defined type in solidity, but it is a self-defined type (which we will be defining in the importer.sol file).

We have a function createFund which takes in

address (of the charity owner / the person creating the fund)
string (charity name/ name of the fund)
uint256 (required amout/ amount requested by the charity creator)
string (fund description / A short description of the fund)
uint256 (minimum amount / minimum amount that anyone can donate)
and creates a new contract which stores all the data related to the fund that we have just created and finally we map a new id (by incrementing the number of total available contracts) to the contract (or fund) that we just created.

importer.sol
Here we define the contract Charity which takes in all the values that we passed to it in the createFund function, along with some new variables like amountCollected and the array tags (to store any tags). Here we use a constructor.

A constructor is a function which initialises the variables present inside the contract to the values that we have passed during contract creation. Constructors are very necessary if we want initialised values during contract creation. Now let us go over the function present inside our charity contract.

pay
This functions helps us in receiving payments from doners, and also keeping track of how much amount we have collected along with some other checks. This is by far one of the most important function of our contract.

addTags
For adding new tags to the contract created (tags are keyword related to the charity / fund which hels us in finding funds related to any term that the doner is searching for).

getCollectionPercentage
Returns the percentage of completition of the selected fund.

Do note that Solidity does not have some regularly used data structures like Sets pre-build into it and if we want to use the functionality that those data structures provide then we need to implement them ourselves.
