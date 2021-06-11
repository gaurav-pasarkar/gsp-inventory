import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import {createStyles, makeStyles, Theme, useTheme} from "@material-ui/core/styles";
import SideNav, {PageId} from "./side-nav";

interface Props {
  window?: () => Window;
  onSideMenuSelect: (pageId: PageId) => void;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      drawer: {
        [theme.breakpoints.up('sm')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
      },
      appBar: {
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
        },
      },
      drawerPaper: {
        width: drawerWidth,
      },
      menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      }
    }),
);

const NavBar = (props: Props) => {
  const { window, onSideMenuSelect } = props;
  const classes = useStyles();
  const theme = useTheme();
  const container = window !== undefined ? () => window().document.body : undefined;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onSelectInDesktop = (pageId: PageId) => {
    handleDrawerToggle();
    onSideMenuSelect(pageId);
  }

  return (
      <>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
                data-testid="menu-item"
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Retail E-commerce
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="options">
          <Hidden smUp implementation="js">
            <Drawer
                data-testid="mobile_drawer"
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true,
                }}
            >
              <SideNav onItemSelect={onSelectInDesktop}/>
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="js">
            <Drawer
                data-testid="desktop_drawer"
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >
              <SideNav onItemSelect={onSideMenuSelect}/>
            </Drawer>
          </Hidden>
        </nav>
      </>
  )
}

export default NavBar;