# Magic NFT Token Gating - Demo Repo

Welcome to Magic's NFT Token Gating demo repo.

This site shows how to implement a NextJS app that:
1. Contains a "restricted" section of the website, only accessible by logged in users that own a specific NFT
2. Generates QR codes for an IRL event, where someone can scan the code and determine if the user owns a specific NFT

## Setup

### Prerequisites

You'll need an NFT that you want to use to gate the content on your site. If you don't have a contract set up, you can mint a free NFT on Magic's homepage: https://magic.link/ and send it to your wallet later on.

You also need a Magic Dedicated Wallet App, which you can create for free at https://dashboard.magic.link/ -- make sure you are using Dedicated Wallet and not Universal!

### Environment Variables

Clone this repo locally and copy the `.env.example` file into a new file called `.env.local`. 

- Add the Magic public + private keys (found in your dashboard at https://dashboard.magic.link/).
- Replace the contract address and token ID with your contract. This repo assumes you are using Polygon mainnet -- if not, replace the RPC_URL and CHAIN_ID variables.

### Installation

Install yarn (or other package manager) if you don't already have it, then run

`yarn install`

to install all the required packages.

### Development Server

Run the development server with:

`yarn dev`

And open your browser to http://localhost:3000 to view the app.

## Usage

Once the app is up and running, you can try to click "View Gated Content" -- you'll get access denied because you haven't logged in.

Log into the app by clicking "Connect", and try again. You will still get access denied, but this time the message will show that it's because you don't have the NFT. Transfer a Demo NFT (or your own, if you set the contract + token information in the environment variables) to your new wallet. You can find details about the wallet by clicking the "Open Wallet" button.

Once you have logged in, and your wallet has the right NFT, you should be able to view the Gated Content!

You can also build an "IRL" type experience using this repo. For example, let's say you deploy this to https://awesome-gated-experience.com on Vercel. You sent your users their tickets to an event via email, they minted the NFTs and have their wallets ready to go. At the event:

1. The users scan a QR code printed on a banner or entrance area
2. The QR brings them to your website. They log into Magic if needed (they may already be logged in from minting previously).
3. A big QR code appears on their phone screen. They present it to the ticket-checking staff
4. The ticket-checking staff scans the QR code, which brings them to https://awesome-gated-experience.com/verify . This checks that the user actually owns the wallet, and that the wallet contains the NFT. The app shows either "Valid" or "Not Valid" and the user is (hopefully) allowed into the event!

## How it Works

Under the hood we use DID tokens -- a special token you can generate with the Magic SDK for logged in users. The token is sent to your backend (SSR in this repo example) for validation:

- The backend uses the Magic Admin SDK to call Magic's API and validate the DID token, which expires after a certain time
- Magic returns the wallet address for the token, so your backend can then check on-chain to see if the wallet contains the NFT


## Additional Resources

- [API Documentation](https://magic.link/docs/home/welcome)
- [Blog](https://magic.link/blogs)
- [Help Center](https://help.magic.link/knowledge)

## Help

Contact us via [discord](https://discord.gg/magiclabs) or visit our [help page](https://help.magic.link/knowledge).
