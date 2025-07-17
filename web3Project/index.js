const { Web3 } = require("web3");

const infuraApiKey = "83688b4b2d204096b7535d541c693ad2";
const infuraUrl = `https://mainnet.infura.io/v3/${infuraApiKey}`;
const web3 = new Web3(infuraUrl);

const vitalikWalletAddress = "0xab5801a7d398351b8be11c439e05c5b3259aec9b";

async function getBalance() {
  try {
    const balanceInWei = await web3.eth.getBalance(vitalikWalletAddress);
    const balanceInEther = web3.utils.fromWei(balanceInWei, "ether");
    console.log(
      `O saldo da carteira de Vitalik Buterin é: ${balanceInEther} ETH`
    );
  } catch (error) {
    console.error("Ocorreu um erro ao consultar o saldo:", error);
  }
}

getBalance();
