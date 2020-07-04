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

If there have been no Poloni DEX trades in the last 24 hours for SCCN, the following functions will return false.

The values returned will have 8 decimal places by default, but that can be changed with the JS built-in `Math` functions.

```js
async function getPrices() {

    let trxPrice = await sccn_js.getPriceTRX();
    await console.log(`TRX price: ${trxPrice}`);
    // expected output: float or boolean (false)

    let btcPrice = await sccn_js.getPriceBTC();
    await console.log(`BTC price: ${btcPrice}`);
    // expected output: float or boolean (false)

    let usdPrice = await sccn_js.getPriceUSD();
    await console.log(`USD price: ${usdPrice}`);
    // expected output: float or boolean (false)
    
}
```

### Contribute

Do you want to help contribute to this project? Just fork the project, make a new branch and send in a pull request!

Can't code but have a suggestion? Experiencing a bug? Send in an issue report in the "Issues" section of the GitHub repository!

This package is designed by developers for developers!