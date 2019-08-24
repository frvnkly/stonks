import { useContext, useEffect } from 'react';
import Router from 'next/router';

import UserContext from '../context/UserContext';
import Navbar from '../components/Navbar';

export default () => {
  const { user } = useContext(UserContext);

  useEffect(
    () => {
      // redirect based on auth state
      // null: initial state, empty string: no user
      if (user === '') { Router.replace('/login'); }
      else if (user) { Router.replace('/portfolio'); }
    },
  );

  return (
    <div>
      <Navbar />
    </div>
  );
};