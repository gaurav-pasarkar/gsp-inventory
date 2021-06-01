import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import React, {ReactElement} from "react";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";

interface Props {
  initialWidth: Breakpoint;
  children: ReactElement;
}

const WithTheme = (props: Props) => {
  const theme = createMuiTheme({
    props: { MuiWithWidth: { initialWidth: props.initialWidth } },
  });

  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;
};

WithTheme.defaultProps = {
  initialWidth: 'sm'
}

export default WithTheme;