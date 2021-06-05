import {PageId} from "../nav-bar/side-nav";
import {Container, Typography} from "@material-ui/core";
import BuyProduct from "./buy-product";
import SellProduct from "./sell-product";

interface Props {
  pageId: PageId;
}

const Page = ({ pageId }: Props) => {

  if(pageId === 'buy_product') {
    return (
        <Container>
          <BuyProduct/>
        </Container>
    )
  }

  if(pageId === 'sell_product') {
    return (
        <Container>
          <SellProduct/>
        </Container>
    )
  }

  return (
      <Container>
        <Typography variant="h1"> Hello: {pageId} </Typography>
      </Container>
  )
}

Page.defaultProps = {
  pageId: 'buy_product'
}

export default Page;