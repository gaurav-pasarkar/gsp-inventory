import {Box, Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {ProductToAdd, View} from "../index";

export interface CartSummaryProps {
  products: Map<string, ProductToAdd>,
  onCheckout: Function,
  onPlace: Function,
  view: View
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
}));

const CartSummary = ({ products, onCheckout, onPlace, view }: CartSummaryProps) => {
  const classes = useStyles();

  const total = Array.from(products).reduce((acc, p) => {
    return acc + (p[1].quantityToAdd * p[1].product.sellingPrice)
  }, 0)

  return (
      <Card className={classes.root}>
        <CardContent>
          <Typography component="span">
            <Box fontWeight="fontWeightMedium" m={1}>
              Total: ₹ {total} /-
            </Box>
          </Typography>
        </CardContent>
        <CardActions>
          {
            view === 'checkout'
              &&
            <Button variant="contained" size="small" color="primary" onClick={() => onCheckout()}>
              Checkout ({products.size})
            </Button>
          }
          {
            view === 'place-order'
              &&
            <Button variant="contained" size="small" color="primary" onClick={() => onPlace()}>
              Place order
            </Button>
          }
        </CardActions>
      </Card>
  )
}

export default CartSummary;