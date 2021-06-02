import {Controller, useForm} from "react-hook-form";
import {Button, Container, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  halfWidth: {
    width: '50ch',
  },
}));

const BuyProduct = () => {
  const classes = useStyles();
  const {handleSubmit, control} = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
      <Container>
        <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
          <Controller
              name="productName"
              control={control}
              defaultValue=""
              render={({field: {onChange, value}, fieldState: {error}}) => (
                  <TextField
                      label="Product Name"
                      fullWidth
                      margin="normal"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
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
                      className={classes.halfWidth}
                      label="Cost Price"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                  />
              )}
              rules={{required: 'Cost price required'}}
          />
          <Controller
              name="sellingPrice"
              control={control}
              defaultValue=""
              render={({field: {onChange, value}, fieldState: {error}}) => (
                  <TextField
                      label="Selling Price"
                      className={classes.halfWidth}
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="number"
                  />
              )}
              rules={{required: 'Selling price required'}}
          />
          <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({field: {onChange, value}, fieldState: {error}}) => (
                  <TextField
                      label="Password"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      type="password"
                  />
              )}
              rules={{required: 'Password required'}}
          />
          <div>
            <Button variant="contained" onClick={() => console.log('Cancelled')}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Signup
            </Button>
          </div>
        </form>
      </Container>
  );
};


export default BuyProduct;