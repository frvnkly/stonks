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
  name: {
    value: '',
    label: 'Name',
    type: 'text',
    action: 'name',
    error: null,
    required: true
  },
  email: {
    value: '',
    label: 'Email',
    type: 'email',
    action: 'email',
    error: null,
    required: true
  },
  password: {
    value: '',
    label: 'Password',
    type: 'password',
    action: 'password',
    error: null,
    required: true
  },
  reenterPassword: {
    value: '',
    label: 'Re-enter password',
    type: 'password',
    action: 'reenterPassword',
    error: null,
    required: true
  },
};

// reducer handles form updates and validation
const formStateReducer = (formState, action) => {
  switch (action.type) {
    case 'name':
      let nameError = null;
      if (!action.payload) nameError = 'Name required.';
      return {
        ...formState,
        name: {
          ...formState.name,
          value: action.payload,
          error: nameError
        }
      };
    case 'email':
      let emailError = null;
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!action.payload) emailError = 'Email required.'
      else if (!emailRegex.test(action.payload))
        emailError = 'Please enter a valid email address';
      return {
        ...formState,
        email: {
          ...formState.email,
          value: action.payload,
          error: emailError
        }
      };
    case 'emailInUse':
      return {
        ...formState,
        email: {
          ...formState.email,
          error: 'Email in use.'
        }
      };
    case 'password':
      let passwordError = null;
      const minLength = 8;
      if (!action.payload) passwordError = 'Password required.'
      else if (action.payload.length < minLength)
        passwordError = `Password must be a minimum of ${minLength} characters.`;
      return {
        ...formState,
        password: {
          ...formState.password,
          value: action.payload,
          error: passwordError
        }
      };
    case 'reenterPassword':
      let reenterError = null;
      if (action.payload !== formState.password.value)
        reenterError = 'Password fields must match.';
      return {
        ...formState,
        reenterPassword: {
          ...formState.reenterPassword,
          value: action.payload,
          error: reenterError
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

  const signupFormHandler = e => {
    e.preventDefault();

    setLoading(true);
    
    const signupEndpoint = '/auth/register';
    axios.post(
      signupEndpoint,
      {
        name: formState.name.value,
        email: formState.email.value,
        password: formState.password.value
      }
    ).then(res => {
      setLoading(false);
    }).catch(err => {
      if (err.response.status === 409) { dispatch({ type: 'emailInUse' }) };
      setLoading(false);
    });
  };

  const renderForm = () => {
    const fields = Object.keys(formState);
    const formFields = fields.map(field => (
      <Grid container spacing={3} justify='center' key={field}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            variant='outlined'
            required={formState[field].required}
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
      <Typography className={styleClasses.typography} variant='h4'>Sign Up</Typography>
      <form
        onSubmit={signupFormHandler}
      >
        {renderForm()}
        <Grid container spacing={3} justify='center'>
          <Grid item xs={12} sm={4}>
            <Button
              variant='contained'
              fullWidth
              disabled={loading}
              onClick={signupFormHandler}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};