import {makeStyles} from "@material-ui/core/styles";
import {Card, CardActions, CardContent, Typography} from "@material-ui/core";
import React from "react";
import ProductActions from "./product-actions";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },

    [theme.breakpoints.up('lg')]: {
      width: '40%',
    }
  },
  content: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
  },
  cta: {
    width: '50%',
    justifyContent: 'center'
  },
  priceChip: {
    marginLeft: theme.spacing(1),
  }
}));

interface Props {
  productName: string,
  sellingPrice: number,
  quantityInCart: number,
  onAdd: Function,
  onQuantityIncrement: Function,
  onQuantityDecrement: Function,
  isInCart: boolean
}

const CartProduct = ({ productName, sellingPrice, onAdd, onQuantityIncrement, onQuantityDecrement, isInCart, quantityInCart }: Props) => {
  const classes = useStyles();

  return (
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Typography gutterBottom component="span">
            {productName}
          </Typography>
          <Typography gutterBottom component="span">
            ₹ {sellingPrice}
          </Typography>
        </CardContent>
        <CardActions className={classes.cta}>
          <ProductActions
              quantityInCart={quantityInCart}
              onAdd={onAdd}
              onQuantityIncrement={onQuantityIncrement}
              onQuantityDecrement={onQuantityDecrement}
              isInCart={isInCart}
          />
        </CardActions>
      </Card>
  )
}

export default CartProduct;