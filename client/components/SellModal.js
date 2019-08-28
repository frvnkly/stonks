import { useContext, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';

import UserContext from '../context/UserContext';

const useStyles = makeStyles({
  paper: {
    minWidth: '300px',
    outline: 'none',
    position: 'absolute',
    padding: '25px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
})

export default ({ symbol }) => {
  const { updateUser } = useContext(UserContext);
  const [ open, setOpen ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ shares, setShares ] = useState('');
  const [ feedback, setFeedback ] = useState(null);
  const [ transactionMade, setTransactionMade ] = useState(false);

  const styleClasses = useStyles();

  const closeHandler = () => {
    setShares('');
    setOpen(false);

    // reload user data if transaction was made
    if (transactionMade) updateUser();
  };

  const submitHandler = () => {
    setLoading(true);
    const sellEndpoint = '/api/stocks/sell';
    axios.put(
      sellEndpoint,
      {
        symbol: symbol.toUpperCase(),
        shares
      }
    ).then(res => {
      setFeedback('Share(s) sold.');
      setTransactionMade(true);
    }).catch(err => { setFeedback('Error: sale failed.') })
    .finally(() => { setLoading(false) });
  };

  const submissionEnabled = Boolean(shares);

  return (
    <div>
      <Button variant='contained' onClick={() => setOpen(true)}>Sell</Button>

      <Modal
        open={open}
        onClose={closeHandler}
      >
        <Paper className={styleClasses.paper}>
          <Grid container direction='column' spacing={2}>
            <Typography variant='h5' align='center'>
              {`Sell: ${symbol}`}
            </Typography>

            <Grid item>
              <TextField
                type='number'
                label='Number of shares'
                variant='outlined'
                value={shares}
                onChange={
                  e => { setShares(e.target.value); }
                }
                fullWidth
              />
            </Grid>

            <Grid item>
              <Button
                variant='contained'
                disabled={!submissionEnabled || loading}
                fullWidth
                onClick={submitHandler}
              >
                {loading ? <CircularProgress size={24} /> : 'Sell'}
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant='contained'
                fullWidth
                onClick={closeHandler}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>

      <Snackbar
        open={Boolean(feedback)}
        onClose={() => setFeedback(null)}
        message={feedback}
        action={
          <IconButton color='inherit' onClick={() => setFeedback(null)}>
            <CloseIcon />
          </IconButton>
        }
      />
    </div>
  );
};