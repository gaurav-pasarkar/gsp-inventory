import {Typography, withStyles} from "@material-ui/core";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import React, {useEffect, useState} from "react";
import AddProducts from "./add-products";
import {getProducts, Product} from "../../../apis/products";

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

export const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

export const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

type CartState = 'add-to-cart' | 'review-cart' | 'checkout';

const SellProduct = () => {

  const [cartState, setCartState] = useState<CartState>('add-to-cart');
  const [availableProducts, setAvailableProducts] = useState<Product[]>([])

  useEffect( () => {
    (async () => {
      const products = await getProducts()
      setAvailableProducts(products)
    })()
  }, [])

  return (
      <div>
        <Accordion square expanded={cartState === 'add-to-cart'}>
          <AddProducts availableProducts={availableProducts}/>
        </Accordion>
        <Accordion square expanded={cartState === 'review-cart'}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Collapsible Group Item #2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion square expanded={cartState === 'checkout'}>
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Collapsible Group Item #3</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
  );
}

export default SellProduct;