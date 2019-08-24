import { useContext, useEffect } from 'react';
import Router from 'next/router';

import UserContext from '../context/UserContext';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';

export default () => {
  const { user } = useContext(UserContext);

  useEffect(
    () => {
      // redirect user logged in
      if (user) { Router.replace('/') }
    },
  );

  return (
    <div>
      <Navbar />
      <LoginForm />
    </div>
  );
};