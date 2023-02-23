# Multisig Wallet
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## Description
Fully customize how you manage your crypto assets in individual or group, with the option to require a predefined number of signatures to confirm transactions. Require multiple signers to confirm every transaction in order to execute it, which helps prevent unauthorized access to your wallet

## Documentation
Before using the features of this page, please set up and connect your ETH-Wallet (Goerli testnet) to the website
### `page/create`
To create a new wallet, you must provide the owners' addresses and the approval rate.

![createWallet](https://i.imgur.com/J90oBe3.png)

### `page/index`
General information about the wallet, please note that before creating transactions, you must deposit to it. We have 2 options ID:
- `transactionID`: to make a transaction proposal
- `consensusID`: to change owners or approval required

![createWallet](https://i.imgur.com/ueKGuG9.png)

### `Make a transaction`
To make a transaction, please provide `receiver address` and `amount`. Make sure that wallet doesn't have any `consensusID` pending before create a new `transactionID` 

![createWallet](https://i.imgur.com/iTwgPgA.png)

### `Make a consensus`
To make a consensus, please provide `add owners`, `del owners` and `approval required`. Make sure that wallet doesn't have any ID pending before create a new `consensusID` 

![createWallet](https://i.imgur.com/s8PNgye.png)

### `page/stats`
Detail information about the wallet, includes: `IDState rate`, `IDType rate`, `Owner Vote Stats`, `ID History`

![createWallet](https://i.imgur.com/RlMSkrM.png)
