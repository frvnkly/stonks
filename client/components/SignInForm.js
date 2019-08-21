import { useReducer, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

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
      let emailError = null;
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(action.payload))
        emailError = 'Please enter a email address.';
      return {
        ...formState,
        email: {
          ...formState.email,
          value: action.payload,
          error: emailError
        }
      };
    case 'password':
      let passwordError = null;
      if (!action.payload) passwordError = 'Please enter a password.';
      return {
        ...formState,
        password: {
          ...formState.password,
          value: action.payload,
          error: passwordError,
        }
      };
    default:
      return formState;
  }
}

export default () => {
  const styleClasses = useStyles();

  const [ formState, dispatch ] = useReducer(formStateReducer, initialState);
  const [ loading, setLoading ] = useState(false);

  const signinFormHandler = () => {};

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
        Sign In
      </Typography>
      <form
        onSubmit={signinFormHandler}
      >
        {renderForm()}
        <Grid container spacing={3} justify='center'>
          <Grid item xs={12} sm={4}>
            <Button
              variant='contained'
              fullWidth
              disabled={loading}
              onClick={signinFormHandler}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};