import { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

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
  const [ open, setOpen ] = useState(false);
  const [ form, setForm ] = useState({
    symbol: '',
    shares: '',
  });

  const styleClasses = useStyles();

  const closeHandler = () => {
    setForm({ symbol: '', shares: '' });
    setOpen(false);
  };

  const submitHandler = () => {
    const buyEndpoint = '/api/stocks/buy';
    axios.put(
      buyEndpoint,
      {
        symbol: form.symbol,
        shares: form.shares
      }
    );
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
      <Button onClick={() => setOpen(true)}>Buy</Button>
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
                disabled={!submissionEnabled}
                fullWidth
                onClick={submitHandler}
              >
                Buy
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
    </div>
  );
};