function calculateDiscount() {
  const originalPrice = parseFloat(document.getElementById("originalPrice").value);
  const discountPercent = parseFloat(document.getElementById("discountPercent").value);

  if (isNaN(originalPrice) || isNaN(discountPercent)) {
    alert("Please enter valid numbers");
    return;
  }

  const discountAmount = (originalPrice * discountPercent) / 100;
  const finalPrice = originalPrice - discountAmount;

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  });

  document.getElementById("discountAmount").textContent = formatter.format(discountAmount);
  document.getElementById("finalPrice").textContent = formatter.format(finalPrice);
}
