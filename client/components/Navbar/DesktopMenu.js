import { useState, useContext } from 'react';
import Router from 'next/router';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';

import UserContext from '../../context/UserContext';

const useStyles = makeStyles({
  navOption: {
    margin: '0 3px',
  },
});

export default ({ logout }) => {
  const { user } = useContext(UserContext);
  const [ submenuAnchor, setSubmenuAnchor ] = useState(null);

  const styleClasses = useStyles();

  const submenuOpenHandler = e => {
    setSubmenuAnchor(e.target);
  };

  const submenuCloseHandler = () => {
    setSubmenuAnchor(null);
  };

  const renderNavOptions = () => {
    const navOptions = user
    ? <>
        <Button
          color='inherit'
          className={styleClasses.navOption}
          onClick={() => { Router.push('/portfolio') }}
        >
          Portfolio
        </Button>
        <Button
          color='inherit'
          className={styleClasses.navOption}
          onClick={() => { Router.push('/transactions') }}
        >
          Transactions
        </Button>
        <IconButton
          color='inherit'
          className={styleClasses.navOption}
          onClick={submenuOpenHandler}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={submenuAnchor}
          keepMounted
          open={Boolean(submenuAnchor)}
          onClose={submenuCloseHandler}
        >
          <MenuItem>
            <ListItemText primary={user.name} secondary={user.email} />
          </MenuItem>
          <Divider />
          <MenuItem onClick={logout}>
            <ListItemText primary='Log Out' />
          </MenuItem>
        </Menu>
      </>
    : <>
        <Button
          color='inherit'
          className={styleClasses.navOption}
          onClick={() => { Router.push('/login') }}
        >
          Log In
        </Button>
        <Button
          color='inherit'
          className={styleClasses.navOption}
          onClick={() => { Router.push('/register') }}
        >
          Register
        </Button>
      </>;

    return navOptions;
  };

  return (
    <Hidden xsDown>
      {renderNavOptions()}
    </Hidden>
  );
};