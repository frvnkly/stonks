import { useState } from 'react';
import axios from 'axios';

export default () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const signupFormHandler = e => {
    e.preventDefault();
  }

  return (
    <form onSubmit={signupFormHandler}>
      <p>Email</p>
      <input 
        type='text' 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
      />
      <p>Password</p>
      <input
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <input type='submit' value='Submit' />
    </form>
  );
};