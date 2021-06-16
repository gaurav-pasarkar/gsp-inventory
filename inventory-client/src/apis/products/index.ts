import {ProductToAdd} from "../../components/page/sell-product";

export interface Product {
  productName: string,
  costPrice: number,
  sellingPrice: number,
  quantity: number,
  id: string
}

interface ApiProduct {
  product_name: string,
  cost_price: number,
  selling_price: number,
  quantity: number,
  id: string
}

interface ApiSellProduct {
  id: string,
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

export const placeOrder = async (products: ProductToAdd[] = []) => {

  const apiProducts: ApiSellProduct[] = products.map(p => ({
    id: p.product.id,
    quantity: p.quantityToAdd
  }))

  return await new Promise(resolve => {
    // @ts-ignore
    google.script.run
      .withSuccessHandler(resolve)
      .sellProducts(apiProducts)
  })
}

export const getProducts = async (): Promise<Product[]> => {

  const transformProducts = (products: ApiProduct[]) => products.map(p => ({
    productName: p.product_name,
    costPrice: p.cost_price,
    sellingPrice: p.selling_price,
    quantity: p.quantity,
    id: p.id
  }))

  return await new Promise(resolve => {
    // @ts-ignore
    google.script.run
      .withSuccessHandler((products: ApiProduct[]) => resolve(transformProducts(products)))
      .getAvailableProducts()
  })
}