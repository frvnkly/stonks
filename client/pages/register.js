import { useContext, useEffect } from 'react';
import Router from 'next/router';

import UserContext from '../context/UserContext';
import RegisterForm from '../components/RegisterForm';
import Navbar from '../components/Navbar';

export default () => {
  const { user } = useContext(UserContext);

  useEffect(
    () => {
      // redirect if user logged in
      if (user) { Router.replace('/') };
    },
  );

  return (
    <div>
      <Navbar />
      <RegisterForm />
    </div>
  );
};