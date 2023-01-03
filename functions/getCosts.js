export default function getCosts(products) {
  const total = products?.reduce(
    (total, product) => total + product.sale_price,
    0
  )

  const best = products[0]?.sale_price
  const average = (total / products.length).toFixed(2)

  return {
    best,
    average,
  }
}
