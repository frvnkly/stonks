import { useContext, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
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

export default () => {
  const { updateUser } = useContext(UserContext);
  const [ open, setOpen ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ form, setForm ] = useState({
    symbol: '',
    shares: '',
  });
  const [ feedback, setFeedback ] = useState(null);
  const [ transactionMade, setTransactionMade ] = useState(false);

  const styleClasses = useStyles();

  const closeHandler = () => {
    setForm({ symbol: '', shares: '' });
    setOpen(false);

    // reload user data if transaction was made
    if (transactionMade) updateUser();
  };

  const submitHandler = () => {
    setLoading(true);
    const buyEndpoint = '/api/stocks/buy';
    axios.put(
      buyEndpoint,
      {
        symbol: form.symbol.toUpperCase(),
        shares: form.shares
      }
    ).then(res => {
      setFeedback('Purchase successful.');
      setTransactionMade(true);
    }).catch(err => { setFeedback('Error: purchase failed.') })
    .finally(() => { setLoading(false) });
  };

  let submissionEnabled = true;
  for (let f in form) {
    if (!form[f]) {
      submissionEnabled = false;
      break;
    }
  }

  return (
    <div>
      <Button variant='contained' onClick={() => setOpen(true)}>Buy</Button>

      <Modal
        open={open}
        onClose={closeHandler}
      >
        <Paper className={styleClasses.paper}>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <TextField
                label='Ticker symbol'
                variant='outlined'
                value={form.symbol}
                onChange={
                  e => {
                    setForm({ symbol: e.target.value, shares: form.shares });
                  }
                }
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                type='number'
                label='Number of shares'
                variant='outlined'
                value={form.shares}
                onChange={
                  e => {
                    setForm({ symbol: form.symbol, shares: e.target.value });
                  }
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
                {loading ? <CircularProgress size={24} /> : 'Buy'}
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