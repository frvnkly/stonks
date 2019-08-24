import { useContext, useState } from 'react';
import Router from 'next/router';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';

import UserContext from '../../context/UserContext';

const useStyles = makeStyles({
  list: {
    width: '250px',
  },
});

export default ({ logout }) => {
  const { user } = useContext(UserContext);
  const [ drawerOpen, setDrawerOpen ] = useState(false);

  const styleClasses = useStyles();

  const renderListItems = () => {
    const listItems = user
      ? <>
          <ListItem alignItems='center'>
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => { Router.push('/portfolio') }}>
            <ListItemText primary='Portfolio' />
          </ListItem>
          <ListItem button onClick={() => { Router.push('/transactions') }}>
            <ListItemText primary='Transactions' />
          </ListItem>
          <Divider />
          <ListItem button onClick={logout}>
            <ListItemText primary='Log Out' />
          </ListItem>
        </>
      : <>
          <ListItem button onClick={() => { Router.push('/login') }}>
            <ListItemText primary='Log In' />
          </ListItem>
          <ListItem button onClick={() => { Router.push('/register') }}>
            <ListItemText primary='Register' />
          </ListItem>
        </>;
    
    return listItems;
  };

  return (
    <Hidden smUp>
      <div>
        <IconButton color='inherit' onClick={() => { setDrawerOpen(true) }}>
          <MenuIcon />
        </IconButton>
        <Drawer 
          anchor='right'
          open={drawerOpen}
          onClose={() => { setDrawerOpen(false) }}
        >
          <List className={styleClasses.list}>
            {renderListItems()}
          </List>
        </Drawer>
      </div>
    </Hidden>
  );
};