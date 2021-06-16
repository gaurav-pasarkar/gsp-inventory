import React, {ChangeEvent, useEffect, useReducer, useState} from "react";
import {getProducts, placeOrder, Product} from "../../../apis/products";
import {Snackbar, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import CartProduct from "./cart-product";
import CartSummary from "./cart-summary";
import reducer from "./cart-reducer";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      '& .MuiTextField-root': {
        width: '100%',
      }
    },

    [theme.breakpoints.up('sm')]: {
      '& .MuiTextField-root': {
        width: '60%',
      }
    }
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },

    [theme.breakpoints.up('sm')]: {
      width: '60%',
    }
  },

  products: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }
}));

export interface ProductToAdd {
  quantityToAdd: number,
  product: Product
}

export type View = 'checkout' | 'place-order';

const SellProduct = () => {

  const classes = useStyles();
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [view, setView] = useState<View>('checkout');
  const [cartProducts, dispatch] = useReducer(reducer, new Map());
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const products = await getProducts()
      setAvailableProducts(products)
      setSearchedProducts(products)
    })()
  }, [])

  const onProductSearch = (searchKey: string) => {
    setSearchText(searchKey);
    if(view === 'place-order') {
      setView('checkout');
    }
    const searched = availableProducts
      .filter(p => p.productName.toLowerCase().includes(searchKey.toLowerCase()));
    setSearchedProducts(searched);
  }

  const onCheckout = () => {
    setView('place-order');
    setSearchText('');
  }

  const onPlace = async () => {
    await placeOrder(Array.from(cartProducts).map(cp => cp[1]));
    setSubmitted(true);
    setView('checkout');
    dispatch({ type: 'reset'})
  }

  const getProductsToShow = () => {
    if(view === 'checkout') {
      return searchedProducts;
    } else if (view === 'place-order') {
      return Array.from(cartProducts).map(value => value[1].product);
    } else {
      return [];
    }
  }

  return (
      <div className={classes.root}>
        <Snackbar
            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            open={submitted}
            onClose={() => setSubmitted(false)}
            autoHideDuration={2000}
            message="Product(s) sold successfully."
        />
        <TextField
            label="Search products"
            margin="normal"
            variant="outlined"
            value={searchText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onProductSearch(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon/>,
            }}
            inputProps={{
              "data-testid": "productSearch",
            }}
        />
        <div className={classes.container}>
          <CartSummary products={cartProducts} view={view} onCheckout={onCheckout} onPlace={onPlace}/>
          <div className={classes.products}>
            {
              getProductsToShow().map(p => <CartProduct
                  productName={p.productName}
                  sellingPrice={p.sellingPrice}
                  quantityInCart={cartProducts.get(p.productName)?.quantityToAdd || 0}
                  isInCart={cartProducts.has(p.productName)}
                  key={p.productName}
                  onAdd={() => dispatch({ type: 'new', product: p})}
                  onQuantityIncrement={() => dispatch({product: p, type: 'increase-quantity'})}
                  onQuantityDecrement={() => dispatch({product: p, type: 'decrease-quantity'})}
              />)
            }
          </div>
        </div>
      </div>
  );
}

export default SellProduct;