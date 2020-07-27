const TronWeb = require(`tronweb`);
const fetch = require(`node-fetch`);
const EventEmitter = require(`events`);

let tronWeb = new TronWeb({
    fullHost: `https://api.trongrid.io`,
    privateKey: `8c79f1455ddc3171e9bf44ce98c32482dbc05b9edb199197f1ae21fda9bc4748`
});

function noLatest() {
    console.log(`There have been no SCCN trades in the past 24 hours, so we cannot fetch price-based data.`);
    return false;
}

let toExport = {
    getPriceTRX: async function () {
        let eSCCNTRX = false;
        tmPriceFetch = await fetch("https://api.trx.market/api/exchange/common/latestOrders?pairID=129&limit=1").then(res => res.json());
        if (tmPriceFetch.data.rows[0]) eSCCNTRX = tmPriceFetch.data.rows[0].price;
        console.log(eSCCNTRX);

        if (eSCCNTRX == false) return noLatest();

        return (eSCCNTRX).toFixed(8);
    },
    getPriceBTC: async function () {
        let eSCCNTRX = false;
        tmPriceFetch = await fetch("https://api.trx.market/api/exchange/common/latestOrders?pairID=129&limit=1").then(res => res.json());
        if (tmPriceFetch.data.rows[0]) eSCCNTRX = tmPriceFetch.data.rows[0].price;

        if (eSCCNTRX == false) return noLatest();

        let eTRXBTC = false;
        cgPriceFetch = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=btc").then(res => res.json());
        eTRXBTC = cgPriceFetch.tron.btc;

        return (eSCCNTRX * eTRXBTC).toFixed(8);
    },
    getPriceUSD: async function () {
        let eSCCNTRX = false;
        tmPriceFetch = await fetch("https://api.trx.market/api/exchange/common/latestOrders?pairID=129&limit=1").then(res => res.json());
        if (tmPriceFetch.data.rows[0]) eSCCNTRX = tmPriceFetch.data.rows[0].price;

        if (eSCCNTRX == false) return noLatest();

        let eTRXUSD = false;
        cgPriceFetch = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd").then(res => res.json());
        eTRXUSD = cgPriceFetch.tron.usd;

        return (eSCCNTRX * eTRXUSD).toFixed(8);
    }
};

module.exports = toExport;

// events

const emitter = new EventEmitter();

async function eventListeners() {

    let contractAddress = "TTP81ruqBGfSmh2raNV4uf4btgUxkKnfti";
    let tokenSCCN = await tronWeb.contract().at(contractAddress);

    tokenSCCN.Transfer().watch((err, res) => {
        emitter.emit(`transfer`, res);
    });

};

// internal functions


// external functions







// .call() functions

totalSupply = async function () {
    let tokenSCCN = await tronWeb.contract().at('TTP81ruqBGfSmh2raNV4uf4btgUxkKnfti');
    let totalSupply = await tokenSCCN.totalSupply().call();

    return parseFloat(totalSupply);
}

balanceOf = async function (address) {
    let tokenSCCN = await tronWeb.contract().at('TTP81ruqBGfSmh2raNV4uf4btgUxkKnfti');
    let balanceOf = await tokenSCCN.balanceOf(address).call();

    return parseFloat(balanceOf);
}

allowance = async function (allower, sender) {
    let tokenSCCN = await tronWeb.contract().at('TTP81ruqBGfSmh2raNV4uf4btgUxkKnfti');
    let allowance = await tokenSCCN.allowance(allower, sender).call();

    return parseFloat(allowance);
}