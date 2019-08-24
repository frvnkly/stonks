import { useContext, useReducer, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import UserContext from '../context/UserContext';

const useStyles = makeStyles({
  typography: {
    textAlign: 'center',
    paddingBottom: '20px',
  }
});

const initialState = {
  email: {
    value: '',
    label: 'Email',
    type: 'email',
    action: 'email',
    error: null,
  },
  password: {
    value: '',
    label: 'Password',
    type: 'password',
    action: 'password',
    error: null,
  }
};

// reducer handles form updates and validation
const formStateReducer = (formState, action) => {
  switch (action.type) {
    case 'email':
      return {
        ...formState,
        email: {
          ...formState.email,
          value: action.payload,
        }
      };
    case 'password':
      return {
        ...formState,
        password: {
          ...formState.password,
          value: action.payload,
        }
      };
    case 'incorrectCredentials':
      return {
        ...formState,
        email: {
          ...formState.email,
          error: 'Incorrect username or password.',
        },
        password: {
          ...formState.password,
          error: 'Incorrect username or password.',
        }
      }
    default:
      return formState;
  }
}

export default () => {
  const styleClasses = useStyles();

  const { updateUser } = useContext(UserContext);
  const [ formState, dispatch ] = useReducer(formStateReducer, initialState);
  const [ loading, setLoading ] = useState(false);

  let submitEnabled = true;
  for (let f in formState) {
    if (!formState[f].value) {
      submitEnabled = false;
      break;
    }
  }

  const loginFormHandler = e => {
    e.preventDefault();
    if (!submitEnabled) return;

    setLoading(true);

    const loginEndpoint = '/auth/login';
    axios.post(
      loginEndpoint,
      {
        email: formState.email.value,
        password: formState.password.value
      }
    ).then(res => {
      updateUser();
      setLoading(false);
      return;
    }).catch(err => {
      dispatch({ type: 'incorrectCredentials' })
      setLoading(false);
      return;
    });
  };

  const enterKeySubmitHandler = e => {
    if (e.key === 'Enter') loginFormHandler(e);
  };

  const renderForm = () => {
    const fields = Object.keys(formState);
    const formFields = fields.map(field => (
      <Grid container spacing={3} justify='center' key={field}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            variant='outlined'
            type={formState[field].type}
            label={formState[field].label}
            value={formState[field].value}
            error={!!formState[field].error}
            helperText={formState[field].error}
            onChange={e => {
              dispatch({ type: formState[field].action, payload: e.target.value })
            }}
            onKeyDown={enterKeySubmitHandler}
          />
        </Grid>
      </Grid>
    ));
    return formFields;
  };

  return (
    <Container maxWidth='lg'>
      <Typography
        className={styleClasses.typography} 
        variant='h4'
      >
        Log In
      </Typography>
      <form>
        {renderForm()}
        <Grid container spacing={3} justify='center'>
          <Grid item xs={12} sm={4}>
            <Button
              variant='contained'
              fullWidth
              disabled={!submitEnabled || loading}
              onClick={loginFormHandler}
            >
              {loading ? <CircularProgress size={24} /> : 'Log In'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};