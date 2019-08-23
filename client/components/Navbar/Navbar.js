import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/styles';

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
  const styleClasses = useStyles();

  return (
    <AppBar position='static' className={styleClasses.appBar}>
      <Toolbar>
        <div className={styleClasses.brand}>
          <Brand />
        </div>
        <MobileMenu />
        <DesktopMenu />
      </Toolbar>
    </AppBar>
  );
};