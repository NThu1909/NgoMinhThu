import React from "react";
import { useMemo } from "react";
import useWalletBalances from "../../hooks/useWalletBalances";
import usePrices from "../../hooks/usePrices";
import { Props } from "../../interfaces/Props";
import { WalletBalance } from "../../interfaces/WalletBalance";
import { FormattedWalletBalance } from "../../interfaces/FormattedWalletBalance";
import WalletRow from "../WalletRow/WalletRow";

const WalletPage: React.FC<Props> = (props: Props) => {
  // Define classes variable
  const classes = {
    row: "wallet-row",
  };

  const { children, ...rest } = props;
  const balances = useWalletBalances();
  // Declare the correct data type for prices
  const prices: { [key: string]: number } = usePrices();

  // Declare blockchain type as a string instead of any
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        //Shorten the if function
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);

        const rightPriority = getPriority(rhs.blockchain);
        // Add case where leftPriority and leftPriority are equal
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
        return 0;
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      //Create a price variable to check: if the value of prices[balance.currency] is undefined or does not exist, return 0.
      const price = prices[balance.currency] ?? 0;
      const usdValue = price * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );
  return <div {...rest}>{rows}</div>;
};
export default WalletPage;
