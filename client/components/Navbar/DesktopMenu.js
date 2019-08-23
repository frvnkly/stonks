import { useContext } from 'react';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/styles';

import UserContext from '../../context/UserContext';

const useStyles = makeStyles({
  navOption: {
    margin: '0 3px',
  },
});

export default () => {
  const { user } = useContext(UserContext);

  const styleClasses = useStyles();

  const renderNavOptions = () => {
    const navOptions = user
    ? <>
        <Button color='inherit' className={styleClasses.navOption}>Portfolio</Button>
        <Button color='inherit' className={styleClasses.navOption}>Purchase</Button>
        <IconButton color='inherit' className={styleClasses.navOption}>
          <AccountCircle />
        </IconButton>
      </>
    : <>
        <Button color='inherit' className={styleClasses.navOption}>Log In</Button>
        <Button color='inherit' className={styleClasses.navOption}>Register</Button>
      </>;

    return navOptions;
  };

  return (
    <Hidden xsDown>
      {renderNavOptions()}
    </Hidden>
  );
};