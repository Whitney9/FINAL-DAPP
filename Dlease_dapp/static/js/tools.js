//根據Chain ID取得網路名稱
async function getChainNameByID(chainid) {
  let url = "https://chainid.network/chains.json";//新的做法
  var chainlist = null;
  await $.getJSON(url, function (data) {
    chainlist = data;
  });
  for (let i = 0; i < chainlist.length; i++) {
    if (chainlist[i].chainId == chainid) {
      return chainlist[i].name;
    }
  }
  return "Unknown";
  /*
    switch (chainid) {
        case "0x1":
            return "Ethereum Main Network";
        case "0x3":
            return "Ropsten Test Network";
        case "0x4":
            return "Rinkeby Test Network";
        case "0x5":
            return "Goerli Test Network";
        case "0x2a":
            return "Kovan Test Network";
        case "0x539":
            return "Ganache Test Network";
        case "0xaa36a7":
            return "Sepolia Test Network";
        default:
            return "Unknown Network";
    }
    */
}

//更新區塊鏈名稱
async function updateChainName(chainId, target) {
  let chainName = await getChainNameByID(chainId);
  let chain = `(${chainId})${chainName}`;
  //let chain = "(" + connectInfo.chainId + ")" + getChainNameByID(connectInfo.chainId);
  $(target).val(chain);
  console.log("updateChainName", chain);
}

//更新帳戶
async function updateAccount(target) {
  //var accounts = await ethereum.enable(); //MetaMask請求用戶授權, 舊版的用法未來會停用
  var accounts = await ethereum.request({ method: "eth_requestAccounts" }); //MetaMask請求用戶授權, 連結會登入到MetaMask
  if (typeof ethers !== "undefined")
    $(target).val(ethers.getAddress(accounts[0]));
  else $(target).val(accounts[0]);
  console.log("updateAccount", accounts);
}

//更新區塊鏈高度
async function updateBlockNumber(target) {
  $(target).val("");
  if (provider != null) {
    var block_number = await provider.getBlockNumber();
    $(target).val(block_number);
    console.log("updateBlockNumber", block_number);
  }
}

//更新帳戶餘額
async function updateAccountBalance(account, target) {
  $(target).val("");
  if (ethers != null && provider != null) {
    var balance = await provider.getBalance(account);
    $(target).val(ethers.formatUnits(balance, 18));
    console.log("updateAccountBalance", balance);
  }
}
