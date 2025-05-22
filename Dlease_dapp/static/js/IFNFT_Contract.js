//讀取合約以太幣餘額
async function contract_getContractBalance(contract) {
  try {
    var data = await contract.getContractBalance();
    //var data = await contract.methods.getContractBalance().call();
    return data;
  } catch (error) {
    console.log(error);
    alert("執行getContractBalance失敗");
  }
}

//查詢合約管理者帳戶
async function contract_getContractOwner(contract) {
  try {
    var data = await contract.getContractOwner();
    return data;
  } catch (error) {
    console.log(error);
    alert("執行getContractOwner失敗");
  }
}

//設定合約管理者
async function contract_setContractOwner(contract, account) {
  try {
    var tx = await contract.setContractOwner(account);
    var receipt = await tx.wait();
  } catch (error) {
    console.log(error);
    alert("執行setContractOwner失敗");
  }
}

//查詢代幣的名稱
async function contract_name(contract) {
  try {
    var data = await contract.name();
    return data;
  } catch (error) {
    console.log(error);
    alert("執行name失敗");
  }
}

//查詢代幣的代稱
async function contract_symbol(contract) {
  try {
    var data = await contract.symbol();
    return data;
  } catch (error) {
    console.log(error);
    alert("執行symbol失敗");
  }
}

//查詢代幣的總發行量
async function contract_totalSupply(contract) {
  try {
    var data = await contract.totalSupply();
    return data;
  } catch (error) {
    console.log(error);
    alert("執行totalSupply失敗");
  }
}

//鑄幣
async function contract_mint(contract, uri, value) {
  try {
    const options = { value: value };
    var tx = await contract.mint(uri, options);
    var receipt = await tx.wait();
  } catch (error) {
    console.log(error);
    alert("執行mint失敗");
  }
}

//轉帳
async function contract_transferContractBalance(contract, address, value) {
  try {
    var tx = await contract.transferContractBalance(address, value);
    var receipt = await tx.wait();
  } catch (error) {
    console.log(error);
    alert("執行transferContractBalance失敗");
  }
}

//依據索引值查詢Token ID
async function contract_tokenByIndex(contract, index) {
  try {
    var data = await contract.tokenByIndex(index);
    return data;
  } catch (error) {
    console.log(error);
    alert("執行tokenByIndex失敗");
  }
}

//查詢Token的持有者帳戶
async function contract_ownerOf(contract, tokenId) {
  try {
    var data = await contract.ownerOf(tokenId);
    return data;
  } catch (error) {
    console.log(error);
    alert("執行ownerOf失敗");
  }
}

//查詢代幣的資源URI
async function contract_tokenURI(contract, tokenId) {
  try {
    var data = await contract.tokenURI(tokenId);
    return data;
  } catch (error) {
    console.log(error);
    alert("執行tokenURI失敗");
  }
}
