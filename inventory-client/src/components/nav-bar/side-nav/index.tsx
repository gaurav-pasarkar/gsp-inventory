import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from '@material-ui/icons/Add';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StoreIcon from '@material-ui/icons/Store';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      toolbar: theme.mixins.toolbar,
    }),
);

export const ToolBar = () => {
  const classes = useStyles();

  return (<div className={classes.toolbar} />)
}

export type PageId = 'buy_product' | 'sell_product' | 'inventory' | 'reports' | 'invoices';

interface Props {
  onItemSelect: (pageId: PageId) => void
}

const SideNav = ({ onItemSelect }: Props) => {
  return (
      <div>
        <ToolBar/>
        <Divider />
        <List>
          <ListItem button key="Buy Product(s)" onClick={() => onItemSelect('buy_product')}>
            <ListItemIcon><AddIcon/></ListItemIcon>
            <ListItemText primary="Buy Product(s)" />
          </ListItem>
          <ListItem button key="Sell Product(s)" onClick={() => onItemSelect('sell_product')}>
            <ListItemIcon><ShoppingCartIcon/></ListItemIcon>
            <ListItemText primary="Sell Product(s)" />
          </ListItem>
          <ListItem button key="Inventory" onClick={() => onItemSelect('inventory')}>
            <ListItemIcon><StoreIcon/></ListItemIcon>
            <ListItemText primary="Inventory" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="Reports" onClick={() => onItemSelect('reports')}>
            <ListItemIcon><AssessmentIcon/></ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button key="Invoices" onClick={() => onItemSelect('invoices')}>
            <ListItemIcon><ReceiptIcon/></ListItemIcon>
            <ListItemText primary="Invoices" />
          </ListItem>
        </List>
      </div>
  )
}

export default SideNav;