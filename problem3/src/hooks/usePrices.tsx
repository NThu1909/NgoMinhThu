import { useState } from "react";

const usePrices = () => {
  const [prices] = useState({
    USD: 1,
    EUR: 1.2,
  });
  return prices;
};

export default usePrices;
