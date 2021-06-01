import {PageId} from "../nav-bar/side-nav";
import {Container, Typography} from "@material-ui/core";

interface Props {
  pageId: PageId;
}

const Page = ({ pageId }: Props) => {

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