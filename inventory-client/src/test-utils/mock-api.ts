
const injectMockApis = () => {
  // @ts-ignore
  window.google = {
    script: {
      run: {
        withSuccessHandler: (cb: any) => {
          return {
            submitProduct: () => {
              cb();
            }
          }
        }
      }
    }
  }
}

export default injectMockApis;