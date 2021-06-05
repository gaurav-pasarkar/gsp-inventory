import {Button, TextField, Typography} from "@material-ui/core";
import React from "react";
import {AccordionDetails, AccordionSummary} from "../index";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {makeStyles} from "@material-ui/core/styles";
import {Controller, useForm} from "react-hook-form";
import {Product} from "../../../../apis/products";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
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


interface Props {
  availableProducts: Product[]
}

const AddProducts = ({ availableProducts = [] }: Props) => {
  const classes = useStyles();
  const {handleSubmit, control} = useForm();

  const onSubmit = async (product: Product) => {
    console.log('Product', product)
  };

  return (
      <>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Add Products</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="productName"
                control={control}
                render={({field: {onChange, value, ref}, fieldState: {error}}) => (
                    <Autocomplete
                        data-testid="productName"
                        options={availableProducts}
                        getOptionLabel={(option: Product) => option.productName}
                        onChange={(_, value: any) => onChange(value)}
                        ref={ref}
                        getOptionSelected={(o, v) => o.productName === v.productName}
                        fullWidth
                        renderInput={(params: any) => {
                          return (<TextField {...params}
                                             label="Product Name"
                                             variant="outlined"
                                             value={value}
                                             error={!!error}
                                             helperText={error ? error.message : null}
                          />)
                        }}
                    />)}
                rules={{required: 'Product required'}}/>

            <div>
              <Button type="submit" variant="contained" color="primary" size="large">
                Add product
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </>

  )
}

export default AddProducts;