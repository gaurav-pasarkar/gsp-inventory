import {PageId} from "../nav-bar/side-nav";
import {Typography} from "@material-ui/core";
import BuyProduct from "./buy-product";
import SellProduct from "./sell-product";

interface Props {
  pageId: PageId;
}

const Page = ({ pageId }: Props) => {

  if(pageId === 'buy_product') {
    return (
        <BuyProduct/>
    )
  }

  if(pageId === 'sell_product') {
    return (
        <SellProduct/>
    )
  }

  return (
      <Typography variant="h1"> Hello: {pageId} </Typography>
  )
}

Page.defaultProps = {
  pageId: 'buy_product'
}

export default Page;