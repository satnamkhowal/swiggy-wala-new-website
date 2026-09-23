function getPriceForDate(date, pricingSource) {
    const resolvedPricingData = Array.isArray(pricingSource)
      ? pricingSource
      : Array.isArray(window.pricingData)
        ? window.pricingData
        : [];
    const dayOfWeek = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
    var price = "-";

    for (let range of resolvedPricingData) {
      const startDate = new Date(range.start_date);
      const endDate = new Date(
        range.end_date === "no_end_date" ? "9999-12-31" : range.end_date
      );
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      if (date >= startDate && date <= endDate && range.trip_days.includes(dayOfWeek)) {
        price = range.format_price;
      }
    }

    return price;
}
function getOfferPriceFromData(date, pricingSource) {
  const resolvedPricingData = Array.isArray(pricingSource)
    ? pricingSource
    : Array.isArray(window.pricingData)
      ? window.pricingData
      : [];
  const dayOfWeek = date
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  var offerPrice = "-";

  for (let range of resolvedPricingData) {
    const startDate = new Date(range.start_date);
    const endDate = new Date(
      range.end_date === "no_end_date" ? "9999-12-31" : range.end_date
    );
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    if (date >= startDate && date <= endDate && range.trip_days.includes(dayOfWeek)) {
      offerPrice = range.format_offer_price || "-";
    }
  }

  return offerPrice;
}
