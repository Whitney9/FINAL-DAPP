async function signLease() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      const transactionParameters = {
        to: account,
        from: account,
        value: '0x29A2241AF62C0000', // 0.1 ETH in wei
        gas: '0x5208',
      };
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      alert('Transaction sent!\nTransaction Hash: ' + txHash);
    } catch (error) {
      console.error(error);
      alert('Transaction failed: ' + error.message);
    }
  } else {
    alert('Please install MetaMask!');
  }
}