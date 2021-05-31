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
import useStyles from "../styles";

const SideNav = () => {
  const classes = useStyles();

  return (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button key="Buy Product(s)">
            <ListItemIcon><AddIcon/></ListItemIcon>
            <ListItemText primary="Buy Product(s)" />
          </ListItem>
          <ListItem button key="Sell Product(s)">
            <ListItemIcon><ShoppingCartIcon/></ListItemIcon>
            <ListItemText primary="Sell Product(s)" />
          </ListItem>
          <ListItem button key="Inventory">
            <ListItemIcon><StoreIcon/></ListItemIcon>
            <ListItemText primary="Inventory" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="Reports">
            <ListItemIcon><AssessmentIcon/></ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button key="Invoices">
            <ListItemIcon><ReceiptIcon/></ListItemIcon>
            <ListItemText primary="Invoices" />
          </ListItem>
        </List>
      </div>
  )
}

export default SideNav;