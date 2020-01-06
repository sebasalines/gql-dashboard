import React from 'react';
import UserIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
// import Logo from 'assets/logo_text.png';
import { useScrollTrigger, AppBar, Toolbar, Typography, IconButton, Button, fade, InputBase, Menu, MenuItem, ButtonGroup, Paper } from '@material-ui/core';
import Colors from 'constants/Colors';
import { makeStyles, createStyles } from '@material-ui/styles';
import { useStateValue } from 'store';
import { Viewer } from 'store/initialState';

interface HeaderProps {
  authenticated?: boolean;
  window?: () => Window;
  children?: React.ReactElement;
}

function ElevationScroll(props: HeaderProps) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    // target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    opacity: trigger ? 1 : 0,
  });
};

export default function Header(props: HeaderProps) {
  const isScrolling = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    // target: window ? window() : undefined,
  });
  const styles = useStyles(props);
  const { state: { viewer } } = useStateValue();
  return (
    <AppBar className={styles.appBar} color="inherit" elevation={isScrolling ? 2 : 0}>
      <Toolbar className={`${styles.toolbar} ${isScrolling ? styles.toolBarScrolling : ''}`}>
        <Typography>Dashboard</Typography>
        <IconButton size="small" className={styles.burger}>
          <MenuIcon />
        </IconButton>
        <div className={styles.content}>
          <Paper className={styles.search}>
            {/* <div className={styles.searchIcon}>
              <SearchIcon />
            </div> */}
            <InputBase
              placeholder="Search…"
              classes={{
                root: styles.inputRoot,
                input: styles.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton size="small">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <Actions scrolling={isScrolling} styles={styles} viewer={viewer} />
      </Toolbar>
    </AppBar >
  )
}

function Actions({ styles, scrolling, viewer }: {
  styles: any,
  scrolling?: boolean,
  viewer?: Viewer,
}) {
  return (
    <div className={styles.actions}>
      {!!viewer
        ? (
          <div className={styles.viewerInfo}>
            <Typography variant="subtitle1">{`${viewer.firstName} ${viewer.lastName}`}</Typography>
            <IconButton size="small">
              <UserIcon />
            </IconButton>
          </div>
        ) : (
          <>
            <Button className={styles.buttons}>Log In</Button>
          </>
        )}
    </div>
  )
}

const useStyles = makeStyles(theme => createStyles({
  appBar: {
    backgroundColor: Colors.sand,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: fade(Colors.sand, 0),
  },
  toolBarScrolling: {
    backgroundColor: Colors.sand,
  },
  logo: {
    width: 230,
    height: '100%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  burger: {
    marginLeft: 15,
    marginRight: 15,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'flex-end',
  },
  buttons: {
    marginRight: 2.5,
    marginLeft: 2.5
  },
  search: {
    alignSelf: 'flex-end',
    position: 'relative',
    borderRadius: 4,
    // backgroundColor: fade(Colors.primary, .1),//fade(Colors.primary, 0.15),
    // '&:hover': {
    //   backgroundColor: fade(Colors.primary, 0.25),
    // },
    // '&:focus': {
    //   backgroundColor: fade(Colors.primary, 0.25),
    // },
    // '&:focus-within': {
    //   backgroundColor: fade(Colors.primary, 0.25),
    // },
    marginRight: 8,
    marginLeft: 0,
    padding: "0 8px",
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    display: 'flex',
    width: 200,
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(3),
    //   width: 'auto',
    // },
  },
  searchIcon: {
    width: 4 * 7,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.heavyGray,
  },
  inputRoot: {
    flex: 1,
    color: 'inherit',
  },
  inputInput: {
    padding: 8,
    // transition: theme.transitions.create('width'),
    width: '100%',
    color: Colors.primary,
    // [theme.breakpoints.up('md')]: {
    //   width: 200,
    // },
  },
  viewerInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));