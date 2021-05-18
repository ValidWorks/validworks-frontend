<h1 align="center">ValidWorks-Frontend</h1>
<h6 align="center"><i>A decentralised marketplace for freelance services built on the Elrond blockchain.</i></h6>

<p align="center">
 <img src="https://img.shields.io/badge/last%20updated-May%202021-3d62d1">
</p>

## Table of contents

* [Introduction](#introduction)
* [Tech Stack](#tech-stack)
* [Usage](#usage)
* [Features](#features)
* [Future expansions](#future-expansions)

## Introduction
<b>Why ValidWorks?</b><br>
Freelance jobs are becoming increasingly popular. However, current platforms that serve as a marketplace for such freelance gigs takes a huge cut from the transaction for both parties and might serve as a hindrance for developers to take up freelancing as a career. ValidWorks is the answer to this problem. It is a fully decentralised solution to allow freelancers and clients to have full control over their gigs as well as how they want to structure their pricing, while leveraging on the power of blockchain to allow a trustless and seamless transaction.

<b>How does it work?</b><br>
To prevent users from scamming on the site, we at ValidWorks pioneered a unique escrow mechanism that gives both the buyers and sellers a peace of mind during the transaction.<br>
1. The seller would first list a gig
2. Prospective buyers would first link up with the seller
3. After both party comes to a consensus on the details of the gig, the buyer would place an order.
4. The buyer would send a payment to the smart contract along with a small deposit.
5. After the gig is completed, the payment would be released to the seller and the deposit would be returned back to the buyer.


## Tech Stack
1. Frontend: react.js
2. Backend: Moralis, erdjs for communication with the smart contract
3. Payment gateway: Elrond smart contracts

## Usage
<b>In the project directory, you can run:</b>
<br><i>A test user is created in development mode. test:password</i>
```commandline
yarn start // Runs the app in development mode
tarn test  // Launches the test runner in interactive watch mode
yarn build // builds the app for production to the build folder
```

## Features
<b>Frontend</b>
- [x] Login
- [ ] Dashboard
  - [ ] Stats on the website
- [ ] My Orders
  - [ ] View the gigs that I have ordered
- [ ] My Gigs
  - [x] View the gigs that I have posted 
  - [ ] Reviews
- [ ] Marketplace
  - [ ] Explore new gig postings
  - [ ] Category page
  - [ ] Sub category page
  - [ ] Searching of gigs
  - [ ] Filtering of gigs
- [ ] User Profile
  - [ ] Selection of skill sets
  - [ ] Linking elrond wallet to the account
  - [x] Edit Profile
  - [x] Uploading of profile photo using IPFS
  - [x] View Profile
  - [ ] User ACL (only allow the editing of the profile by the current authenticated user)
  - [ ] Password reset when the user forgets the password
- [ ] Gig page
  - [X] Posting of a gig
  - [x] Viewing of a gig
  - [ ] Gig ACL (only allow the editing of the gig by the one who posted)
  - [ ] Ordering of a gig
  - [ ] Setting of deadline
  - [ ] Deposit into a gig
  - [ ] Confirmation of a gig
  - [ ] Claim payment
  - [ ] Cancelling of a gig

<b>Backend</b>
- [ ] Database needed
  - [ ] User (username, email, password, bio, erdaddr, emailVerified)
  - [ ] Category (name, imageUrl)
  - [ ] SubCategory extends Category (name, categoryId, imageUrl?)
  - [ ] Gig extends SubCategory (title, price, subCategoryId, description, sellerId)
  - [ ] Order extends Gig (gigId, buyerId, sellerId, txHash, status)

- [ ] Addition Database
  - [ ] Pricing extends Gig // For different pricing tiers depending on the complexity of the gig

<b>Current problem faced</b>
- [x] Redirection through a promise
- [ ] Linking wallet to account


## Future Extensions
- [ ] "Kickstarter" for community projects
- [ ] ValidWorks token