const fetch = require(`node-fetch`);

let act = async (ticker) => {
    ticker = ticker.toLowerCase();
    cgPriceFetch = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=${ticker}`).then(res => res.json());
    let eTRXUSD = cgPriceFetch.tron[ticker];
    if (!eTRXUSD) return console.log(`none`);
    console.log(eTRXUSD);
}

act(`GBPs`);
