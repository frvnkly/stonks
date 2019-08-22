import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default () => {
  return (
    <Hidden smUp>
      <div>
        <IconButton color='inherit'>
          <MenuIcon />
        </IconButton>
      </div>
    </Hidden>
  );
};