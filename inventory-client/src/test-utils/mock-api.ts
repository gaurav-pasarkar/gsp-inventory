
const injectMockApis = () => {
  // @ts-ignore
  window.google = {
    script: {
      run: {
        withSuccessHandler: (cb: any) => {
          return {
            submitProduct: () => {
              cb();
            },
            getAvailableProducts: () => {
              cb([
                {
                  product_name: 'Product 1 (10/-)',
                  cost_price: 10,
                  selling_price: 11,
                  quantity: 100
                },
                {
                  product_name: 'Product 2 (5/-)',
                  cost_price: 5,
                  selling_price: 6,
                  quantity: 150
                },
                {
                  product_name: 'Product 3 (20/-)',
                  cost_price: 20,
                  selling_price: 22,
                  quantity: 50
                }
              ])
            }
          }
        }
      }
    }
  }
}

export default injectMockApis;