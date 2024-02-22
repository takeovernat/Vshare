# introduction

Vshare a Decentralized Asset Sharing Application

built on the Ethereum blockchain written in solidity, it uses the web3 JavaScript library to interact with the smart contract using truffle framework
and it is tested on ropsten test network with a front end written in react.js 

## Solution
My solution addresses the problem by eliminating the middle man, or central server / authority that can
regulate your asset sharing and can even peek at your asset. This solution brings availability to asset
sharing, since all data is stored on the chain there will always be a node to provide an asset stored in
storage, this dApp is applicable in situations where data availability and asset tracking is important.
One unique feature that this dApp has is the ability to request assets from other users, user can share their
assets with anyone but they can also request assets if they know another user’s id or address. Another
distinctive feature that this dApp has is the ability to encrypt sensitive assets if the user chooses, as
observed in the metrics this dApp has a fast transaction time and low gas cost and can be efficiently used
for its purpose.

## Metrics
• Cumulative gas consumption chart
This metric shows the trend of the gas consumption for the dApp as more users are partaking in
Everday functions for the dApp, like add an asset, share asset, request asset, etc. It can be used to
map the total gas consumption of the dApp as more users are participating in this application.
• Transaction cost compared to Transaction time
The relationship between transaction time of functionalities compared to their
transaction cost. Some transactions take more time than others, however, that does not mean that
the operations were more expensive, this metric can help us exploit that relationship.
• Transaction time for functionalities as assets accumulate for a user
These metrics show the change in transaction time as assets are accumulated in storage, in which
in some functions like reading a specific asset, the contract might need to access an asset deep
inside an array, using this metric we can predict the scalability of this dApp as assets get
extremely large.

## Experimental setup and a test plan
Vshare Test plan requires multiple accounts to interact with each other, as it is an asset sharing system,
therefore multiple subjects are needed for testing. Luckily ganache provides us with 100 accounts with
fake ether to do our testing. A web3 python script takes in a file with the test data as parameters and
interacts with the smart contract for us through the API with different datasets, therefore I do not have to
manually test every function. The tests run and provide us with the transaction cost and time it takes for
each transaction. After recording those results, the test input file is modified and tested with different
parameters for any behavioral changes in the app as data accumulates. Some security configurations
tested are:
• A user not being able to request asset or share asset with self as that is unnecessary.
• Existing users trying to create a new identity, as Each user is required to create an
account to interact with any of the functions, and once an account is created, an id is
mapped to that address, therefore that address cannot create another account and will
have a permanent user id.
• Requesting or sharing assets to unknown addresses or requesting nonexistent assets gets
checked and reverted

## Results
From our test on the Ropsten test network, we get this linear graph that shows the cumulative gas
consumption for each operation like a user creating an account and then adding an asset. The average gas
cost per transaction call is 443,601 gwei and the average time it takes for a transaction call is 0.159
seconds. We know that these results will not directly transfer on the main net as there will be factors like
network traffic will be significantly different and can have inflated transaction costs, however, we can
learn from this test net that these transactions get completed very quickly (0.159 seconds). With little to
medium network traffic in the EVM, we can assume transactions get finished in less than a second.

## Conclusions and future work
Blockchain technology popularity has skyrocketed in the past years and dApps developed now will have
an early start, therefore I believe Vshare, a decentralized asset sharing system has immense potential.
Vshare takes big central authority out of asset sharing and significantly improves availability compared to
the traditional server-client structure with no extra cost. There is also transparency in the transactions
themselves to keep track of what was sent, from who and to who. There are two features that will be
added before this dApp can be released and that is cryptography for sensitive assets and develop a well-
detailed front end for the app using react for web and mobile use.
Some concerns for this dApp include scalability and security. Scalability won’t be much of an issue
because we are using mapping for storage which is O (1) time complexity which is very fast, however
even with the mappings, we can see from the metrics that the more assets we have the more time it will
take to fetch that data and these values trend in a linear fashion. Security is also a concern for sensitive
documents, however, this dApp provides the optional feature to encrypt the assets if the user chooses too.
Even with encryption though, Security still hangs in the air, as with any system.
