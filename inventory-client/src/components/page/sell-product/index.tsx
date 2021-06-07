import React, {ChangeEvent, useEffect, useState} from "react";
import {getProducts, Product} from "../../../apis/products";
import {TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import CartProduct from "./cart-product";

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

  products: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },

    [theme.breakpoints.up('sm')]: {
      width: '60%',
    }
  }
}));

const SellProduct = () => {

  const classes = useStyles();
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([])

  useEffect( () => {
    (async () => {
      const products = await getProducts()
      setAvailableProducts(products)
      setSearchedProducts(products)
    })()
  }, [])

  const onProductSearch = (searchKey: string) => {
    const searched = availableProducts
      .filter(p => p.productName.toLowerCase().includes(searchKey.toLowerCase()));
    setSearchedProducts(searched);
  }

  return (
      <div className={classes.root}>
        <TextField
            label="Search products"
            margin="normal"
            variant="outlined"
            onChange={(e: ChangeEvent<HTMLInputElement>) => onProductSearch(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon/>,
            }}
            inputProps={{
              "data-testid": "productSearch",
            }}
        />
        <div className={classes.products}>
          {
            searchedProducts.map(p => <CartProduct product={p} key={p.productName}/>)
          }
        </div>
      </div>
  );
}

export default SellProduct;