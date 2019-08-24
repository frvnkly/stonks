import { useContext } from 'react';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/styles';

import UserContext from '../../context/UserContext';
import Brand from './Brand';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';

const useStyles = makeStyles({
  brand: {
    flexGrow: 1,
  },
  appBar: {
    marginBottom: '50px',
  },
});

export default () => {
  const { updateUser } = useContext(UserContext);

  const styleClasses = useStyles();

  const logoutHandler = () => {
    const logoutEndpoint = '/auth/logout';
    axios.get(logoutEndpoint).then(updateUser);
  };

  return (
    <AppBar position='static' className={styleClasses.appBar}>
      <Toolbar>
        <div className={styleClasses.brand}>
          <Brand />
        </div>
        <MobileMenu logout={logoutHandler} />
        <DesktopMenu logout={logoutHandler} />
      </Toolbar>
    </AppBar>
  );
};