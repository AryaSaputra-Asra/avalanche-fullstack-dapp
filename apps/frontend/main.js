const connectBtn = document.getElementById("connectBtn");
const statusText = document.getElementById("status");
const addressText = document.getElementById("address");
const balanceText = document.getElementById("balance");
const networkText = document.getElementById("network");

connectBtn.addEventListener("click", connectWallet);

async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    alert("Core Wallet belum terinstall");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const address = accounts[0];
    addressText.innerText = address;

    const balanceHex = await window.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"],
    });

    const balance = parseInt(balanceHex, 16) / 1e18;
    balanceText.innerText = balance.toFixed(4);

    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    if (chainId === "0xa869") {
      networkText.innerText = "Avalanche Fuji Testnet";
      statusText.innerText = "Connected";
    } else {
      networkText.innerText = "Wrong Network";
      statusText.innerText = "Connected (Wrong Network)";
    }

    connectBtn.disabled = true;
    connectBtn.innerText = "Wallet Connected";
  } catch (error) {
    console.error(error);
    alert("User menolak koneksi wallet");
  }
}
