import {Button, ButtonGroup, Typography} from "@material-ui/core";
import React from "react";
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  quantity: {
    color: theme.palette.text.primary
  }
}));

interface Props {
  quantityInCart: number,
  onAdd: Function,
  onQuantityIncrement: Function,
  onQuantityDecrement: Function,
  isInCart: boolean
}

const ProductActions = ({quantityInCart, onAdd, onQuantityIncrement, onQuantityDecrement, isInCart}: Props) => {
  const classes = useStyles();

  if (!isInCart) {
    return (
        <Button variant="outlined" color="primary" onClick={() => onAdd()}>
          Add
        </Button>
    )
  }
  return (
      <ButtonGroup className={classes.root} color="primary" aria-label="outlined primary button group">
        <Button size="small" variant="text" aria-label="remove from shopping cart" color="primary" onClick={() => onQuantityDecrement()}>
          <IndeterminateCheckBoxIcon/>
        </Button>
        <Button variant="text" disabled={true}>
          <Typography  className={classes.quantity} variant="body1" align="center">
            {quantityInCart}
          </Typography>
        </Button>
        <Button size="small" variant="text" aria-label="add to shopping cart" color="primary" onClick={() => onQuantityIncrement()}>
          <AddBoxIcon/>
        </Button>
      </ButtonGroup>
  )
}

export default ProductActions