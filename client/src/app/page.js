"use client";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ABI from './TradeABI.js'; // Import the ABI

const contractAddress = "0xf86e51b4bD8918A4Bf997FBB1cFA2a8c70fB2536"; // Replace with real one

export default function Home() {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(0);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (wallet && contract) fetchBalance();
  }, [wallet, contract]);

  const connectWallet = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const instance = new ethers.Contract(contractAddress, ABI, signer);
    setWallet(address);
    setContract(instance);
  };

  const buy = async () => {
    const tx = await contract.buy({ value: ethers.parseEther("0.01") });
    await tx.wait();
    fetchBalance();
  };

  const sell = async () => {
    const tx = await contract.sell(1);
    await tx.wait();
    fetchBalance();
  };

  const fetchBalance = async () => {
    const bal = await contract.balances(wallet);
    setBalance(bal.toString());
  };

  return (
    <main className="p-8 font-mono">
      <h1 className="text-xl font-bold mb-4">🚀 Avalanche Token Trade (Testnet)</h1>
      {!wallet ? (
        <button onClick={connectWallet} className="bg-blue-600 text-white px-4 py-2 rounded">
          Connect Wallet
        </button>
      ) : (
        <>
          <p>Wallet: {wallet}</p>
          <p className="mb-4">Balance: {balance} Token(s)</p>
          <button onClick={buy} className="bg-green-600 text-white px-4 py-2 mr-2 rounded">
            Buy (0.01 AVAX)
          </button>
          <button onClick={sell} className="bg-red-600 text-white px-4 py-2 rounded">
            Sell (1 Token)
          </button>
        </>
      )}
    </main>
  );
}
