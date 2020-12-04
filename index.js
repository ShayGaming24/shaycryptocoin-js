const TronWeb = require(`tronweb`);
const fetch = require(`node-fetch`);
const EventEmitter = require(`events`);

let tronWeb = new TronWeb({
    fullHost: `https://api.trongrid.io`,
    privateKey: `8c79f1455ddc3171e9bf44ce98c32482dbc05b9edb199197f1ae21fda9bc4748`
});

const emitter = new EventEmitter();

let contractAddress = "TTP81ruqBGfSmh2raNV4uf4btgUxkKnfti";

async function eventListeners() {
    
    let tokenSCCN = await tronWeb.contract().at(contractAddress);
    
    tokenSCCN.Transfer().watch((err, res) => {
        emitter.emit(`transfer`, (err, res));
    });

    tokenSCCN.Approval().watch((err, res) => {
        emitter.emit(`approval`, (err, res));
    });

    tokenSCCN.Burn().watch((err, res) => {
        emitter.emit(`burn`, (err, res));
    });
    
};

eventListeners();

let toExport = {
    getPriceTRX: async function () {
        let tokenSCCN = await tronWeb.contract().at(contractAddress);

        let justTRX = (await tronWeb.trx.getBalance(`TR6nwJUfMCYa5koqoDN5BM6EtVMn7WkFPp`)) / 1e6;
        let justSCCN;

        await tokenSCCN.balanceOf(`TR6nwJUfMCYa5koqoDN5BM6EtVMn7WkFPp`).call().then(balance => {
            justSCCN = balance / 1e2;
        });

        let eSCCNTRX = justTRX / justSCCN;

        return eSCCNTRX;
    },
    getPrice: async function (ticker) {
        ticker = ticker.toLowerCase();
        
        let eSCCNTRX = await this.getPriceTRX();
        if (ticker == `trx`) return eSCCNTRX;

        cgPriceFetch = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=${ticker}`).then(res => res.json());
        let eTRXUSD = cgPriceFetch.tron[ticker];

        if (!eTRXUSD) return 0;

        let eSCCNUSD = eSCCNTRX * eTRXUSD;

        return eSCCNUSD;
    },
    totalSupply: async function () {
        let tokenSCCN = await tronWeb.contract().at(contractAddress);

        let totalSupply = await tokenSCCN.totalSupply().call();

        return parseFloat(totalSupply);
    },
    balanceOf: async function (address) {
        let tokenSCCN = await tronWeb.contract().at(contractAddress);

        let balanceOf = await tokenSCCN.balanceOf(address).call();

        return parseFloat(balanceOf);
    },
    allowance: async function (allower, sender) {
        let tokenSCCN = await tronWeb.contract().at(contractAddress);

        let allowance = await tokenSCCN.allowance(allower, sender).call();

        return parseFloat(allowance);
    },
    events: emitter
};

module.exports = toExport;