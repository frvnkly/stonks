import { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
  },
  typography: {
    textAlign: 'center',
    paddingBottom: '20px',
  }
});

export default () => {
  const styleClasses = useStyles();

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordReenter, setPasswordReenter ] = useState('');

  const signupFormHandler = e => {
    e.preventDefault();
    
    const signupEndpoint = '/auth/register';
    axios.post(
      signupEndpoint,
      {
        name,
        email,
        password,
      }
    ).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err.response.status);
    })
  };

  return (
    <Container maxWidth='lg'>
      <Typography className={styleClasses.typography} variant='h4'>Sign Up</Typography>
      <form
        onSubmit={signupFormHandler}
      >
        <Grid container spacing={3} justify='center'>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant='outlined'
              label='Name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} justify='center'>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant='outlined'
              label='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} justify='center'>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type='password'
              variant='outlined'
              label='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} justify='center'>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type='password'
              variant='outlined'
              label='Re-enter Password'
              value={passwordReenter}
              onChange={e => setPasswordReenter(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} justify='center'>
          <Grid item xs={12} sm={4}>
            <Button
              variant='contained'
              fullWidth
              onClick={signupFormHandler}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};