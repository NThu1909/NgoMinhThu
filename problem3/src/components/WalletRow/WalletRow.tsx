import React from "react";

const WalletRow: React.FC<{
  amount: number;
  usdValue: number;
  formattedAmount: string;
  className?: string;
}> = ({ usdValue, formattedAmount, className }) => {
  return (
    <div className={className}>
      <p>
        Amount: {formattedAmount} ({usdValue} USD)
      </p>
    </div>
  );
};

export default WalletRow;
