export default function getPriceEstimates(product) {
  const histories = product?.pricehistory

  const xValues = []
  const newYvalues = []
  const usedYvalues = []

  if (histories) {
    histories?.map((history) => {
      xValues.push(history.date)
      newYvalues.push(history.new_retail)
      usedYvalues.push(history.used_retail)
    })

    const estimates = {
      newRetail: histories[histories.length - 1].new_retail,
      newAuction: histories[histories.length - 1].new_auction,
      usedRetail: histories[histories.length - 1].used_retail,
      usedAuction: histories[histories.length - 1].used_auction,
      xValues,
      newYvalues,
      usedYvalues,
    }

    return estimates
  } else {
    return null
  }
}
