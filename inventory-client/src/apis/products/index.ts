export interface Product {
  productName: string,
  costPrice: number,
  sellingPrice: number,
  quantity: number
}

interface ApiProduct {
  product_name: string,
  cost_price: number,
  selling_price: number,
  quantity: number
}

export const createProduct = async (product: Product) => {

  const apiProduct = {
    product_name: product.productName,
    cost_price: product.costPrice,
    selling_price: product.sellingPrice,
    quantity: product.quantity
  }

  return await new Promise(resolve => {
    // @ts-ignore
    google.script.run.withSuccessHandler(resolve).submitProduct(apiProduct)
  })
}

export const getProducts = async (): Promise<Product[]> => {

  const transformProducts = (products: ApiProduct[]) => products.map(p => ({
    productName: p.product_name,
    costPrice: p.cost_price,
    sellingPrice: p.selling_price,
    quantity: p.quantity
  }))

  return await new Promise(resolve => {
    // @ts-ignore
    google.script.run
      .withSuccessHandler((products: ApiProduct[]) => resolve(transformProducts(products)))
      .getAvailableProducts()
  })
}