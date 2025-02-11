import { useState } from "react";

const useWalletBalances = () => {
  const [walletBalance] = useState([
    { currency: "USD", amount: 100, blockchain: "Ethereum" },
    { currency: "EUR", amount: 200, blockchain: "Neo" },
  ]);
  return walletBalance;
};

export default useWalletBalances;
