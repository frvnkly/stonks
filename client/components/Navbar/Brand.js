import Typography from '@material-ui/core/Typography';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  logo: {
    marginRight: '5px',
  },
});

export default () => {
  const styleClasses = useStyles();

  return (
    <div className={styleClasses.root}>
      <AssessmentIcon fontSize='large' className={styleClasses.logo} />
      <Typography variant='h4'>
        Stonks
      </Typography>
    </div>
  );
};
