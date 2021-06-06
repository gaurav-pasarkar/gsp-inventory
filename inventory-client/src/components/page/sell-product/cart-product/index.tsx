import {makeStyles} from "@material-ui/core/styles";
import {Button, Card, CardActions, CardContent, Chip, Typography} from "@material-ui/core";
import React from "react";
import {Product} from "../../../../apis/products";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: 300,
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  priceChip: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  }
}));

interface Props {
  product: Product
}

const CartProduct = ({ product }: Props) => {
  const classes = useStyles();

  return (
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom component="span">
            {product.productName}
          </Typography>
          <Chip className={classes.priceChip} variant="outlined" size="small" label={`${product.sellingPrice}/-`}/>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Add
          </Button>
        </CardActions>
      </Card>
  )
}

export default CartProduct;