import {Controller, useForm} from "react-hook-form";
import {Button, Snackbar, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {createProduct, Product} from "../../../apis/products";
import {useState} from "react";

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

  cta: {
    marginTop: theme.spacing(2)
  }
}));

const BuyProduct = () => {
  const classes = useStyles();
  const {handleSubmit, reset, control} = useForm();
  const [submitted, setSubmitted] = useState<boolean>(false);

  const onSubmit = async (product: Product) => {
    await createProduct(product);
    setSubmitted(true);
    reset({
      productName: '',
      costPrice: '',
      sellingPrice: '',
      quantity: ''
    });
  };

  return (
      <div>
        <Snackbar
            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            open={submitted}
            onClose={() => setSubmitted(false)}
            autoHideDuration={2000}
            message="Product created successfully."
        />
        <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
          <Controller
              name="productName"
              control={control}
              defaultValue=""
              render={({field: {onChange, value}, fieldState: {error}}) => (
                  <TextField
                      label="Product Name"
                      margin="normal"
                      value={value}
                      variant="outlined"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      inputProps={{
                        "data-testid": "productName",
                      }}
                  />
              )}
              rules={{required: 'Product name required'}}
          />
          <Controller
              name="costPrice"
              control={control}
              defaultValue=""
              render={({field: {onChange, value}, fieldState: {error}}) => (
                  <TextField
                      type="number"
                      label="Cost Price(per unit)"
                      margin="normal"
                      value={value}
                      variant="outlined"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      inputProps={{
                        "data-testid": "costPrice",
                      }}
                  />
              )}
              rules={{required: 'Cost price(per unit) required'}}
          />
          <Controller
              name="sellingPrice"
              control={control}
              defaultValue=""
              render={({field: {onChange, value}, fieldState: {error}}) => (
                  <TextField
                      label="Selling Price(per unit)"
                      margin="normal"
                      value={value}
                      variant="outlined"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="number"
                      inputProps={{
                        "data-testid": "sellingPrice",
                      }}
                  />
              )}
              rules={{required: 'Selling price(per unit) required'}}
          />
          <Controller
              name="quantity"
              control={control}
              defaultValue=""
              render={({field: {onChange, value}, fieldState: {error}}) => (
                  <TextField
                      label="Quantity"
                      margin="normal"
                      value={value}
                      variant="outlined"
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="number"
                      inputProps={{
                        "data-testid": "quantity",
                      }}
                  />
              )}
              rules={{required: 'Quantity required'}}
          />
          <div className={classes.cta}>
            <Button type="submit" variant="contained" color="primary" size="large">
              Add product
            </Button>
          </div>
        </form>
      </div>
  );
};


export default BuyProduct;