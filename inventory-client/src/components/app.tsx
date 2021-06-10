import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from "./nav-bar";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {PageId, ToolBar} from "./nav-bar/side-nav";
import Page from "./page";

interface Props {
  window?: () => Window;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(2),
      },
    }),
);

export default function App(props: Props) {
  const { window } = props;
  const classes = useStyles();
  const [pageId, setPage] = useState<PageId>();

  return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar window={window} onSideMenuSelect={(pageId) => setPage(pageId)}/>
        <main className={classes.content}>
          <ToolBar/>
          <Page pageId={pageId}/>
        </main>
      </div>
  );
}
