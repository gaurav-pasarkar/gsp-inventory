import {Product} from "../../components/page/buy-product";

const createProduct = async (product: Product) => {

  return await new Promise(resolve => {
    // @ts-ignore
    google.script.run.withSuccessHandler(resolve).submitProduct({
      product_name: product.productName,
      cost_price: product.costPrice,
      selling_price: product.sellingPrice,
      quantity: product.quantity
    })
  })
}

export default createProduct