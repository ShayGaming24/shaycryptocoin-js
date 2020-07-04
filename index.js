const TronWeb = require(`tronweb`);

const tronWeb = new TronWeb({
    fullHost: `https://api.trongrid.io`,
    privateKey: `8c79f1455ddc3171e9bf44ce98c32482dbc05b9edb199197f1ae21fda9bc4748`
});

exports.totalSupply = async function () {
    let tokenSCCN = await tronWeb.contract().at('TTP81ruqBGfSmh2raNV4uf4btgUxkKnfti');
    let totalSupply = await tokenSCCN.totalSupply().call();
    return parseFloat(totalSupply / 1e2);
}

exports.balanceOf = async function (address) {
    let tokenSCCN = await tronWeb.contract().at('TTP81ruqBGfSmh2raNV4uf4btgUxkKnfti');
    let balanceOf = await tokenSCCN.balanceOf(address).call();
    return parseFloat(balanceOf / 1e2);
}

exports.allowance = async function (allower, sender) {
    let tokenSCCN = await tronWeb.contract().at('TTP81ruqBGfSmh2raNV4uf4btgUxkKnfti');
    let allowance = await tokenSCCN.allowance(allower, sender).call();
    return parseFloat(allowance / 1e2);
}