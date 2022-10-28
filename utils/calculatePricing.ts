export const calculateDiscount = (price: number) => {
  const discountTotals = price - price * 0.2;
  return Number(discountTotals.toFixed(2));
};

export const removeDiscountFromTotals = (price: number) => {
  const discountTotals = price + price * 0.2;
  return Number(discountTotals.toFixed(2));
};

export const calculatePrice = (
  qtyChange: number,
  price: number,
  currentTotal: number,
  isDiscount: Boolean
) => {
  if (qtyChange === 1) {
    const priceInteger = price * 100;
    const totalsInteger = currentTotal * 100;
    const newSum = priceInteger + totalsInteger;
    const newSumDecimal = newSum / 100;

    if (isDiscount) return calculateDiscount(newSumDecimal);
    return newSumDecimal;
  } else {
    let productPrice = price;

    if (isDiscount) {
      productPrice = productPrice - price * 0.2;
    }
    console.log(productPrice);
    const productPriceInteger = productPrice * 100;

    const totalsInteger = currentTotal * 100;
    const newSum = totalsInteger - productPriceInteger;
    const newSumDecimal = newSum / 100;

    return newSumDecimal;
  }
};
