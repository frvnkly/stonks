import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  navOption: {
    margin: '0 3px',
  },
});

export default () => {
  const styleClasses = useStyles();

  return (
    <Hidden xsDown>
      <Button color='inherit' className={styleClasses.navOption}>Portfolio</Button>
      <Button color='inherit' className={styleClasses.navOption}>Purchase</Button>
      <IconButton color='inherit' className={styleClasses.navOption}>
        <AccountCircle />
      </IconButton>
    </Hidden>
  );
};