# shaycryptocoin-js

Do you want to help SCCN grow? Do you have the JavaScript expertise to make interactive applications which people will want to use? Think you can make new and unique use-cases for SCCN?

This package is designed to interact with the SCCN smart contract!

### Documentation

First you need to install the module:

`npm i @shaycryptocoin/shaycryptocoin-js`

All the functions below return integers. For example, if the balance of a user is 10 SCCN, the balanceOf(user) function will return 1000 because the token has 2 decimals.

```js
const sccn_js = require(`@shaycryptocoin/shaycryptocoin-js`);

async function getDetails() {

    const ownerAddress = `TWL1CUj7jjmJcRRwiRvGT6q1rZMGS7KQNd`;

    // sccn_js.totalSupply() returns the total supply of SCCN
    let totalSupply = await sccn_js.totalSupply();

    // sccn_js.balanceOf(ownerAddress) returns the SCCN balance of ownerAddress
    let balanceOfUser = await sccn_js.balanceOf(ownerAddress);
    
    // sccn_js.allowance(allower, spender) returns the allowance that allower has given to spender
    let allowance = await sccn_js.allowance(ownerAddress, otherAddress);

}

getDetails()
```

#### Price-related functions

The function below can help resolve a price for SCCN!

```js
async () => {
    console.log(`TRX price: ${await sccn_js.getPrice(`TRX`)}`);
    console.log(`USD price: ${await sccn_js.getPrice(`USD`)}`);
    console.log(`EUR price: ${await sccn_js.getPrice(`EUR`)}`);
}
```

If a currency is not supported, the function will return 0.

#### Event listeners

This module can also listen for contract events on the SCCN smart contract!

```js
// listen for SCCN transfer events
sccn_js.events.on(`transfer`, async function(err, res) {
    if (err) console.log(err);
    console.log(res);
});

// listen for SCCN approval events
sccn_js.events.on(`approval`, async function(err, res) {
    if (err) console.log(err);
    console.log(res);
});

// listen for SCCN burn events
sccn_js.events.on(`burn`, async function(err, res) {
    if (err) console.log(err);
    console.log(res);
});
```

### Contribute

Do you want to help contribute to this project? Just fork the project, make a new branch and send in a pull request!

Can't code but have a suggestion? Experiencing a bug? Send in an issue report in the "Issues" section of the GitHub repository!

This package is designed by developers for developers!