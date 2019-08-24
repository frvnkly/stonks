import { useContext, useEffect } from 'react';
import Router from 'next/router';

import UserContext from '../context/UserContext';
import Navbar from '../components/Navbar';

export default () => {
  const { user } = useContext(UserContext);

  useEffect(
    () => {
      // redirect based on auth state
      // null: initial state, false: no user
      if (user === false) { Router.replace('/login'); }
      else if (user) { Router.replace('/portfolio'); }
    },
  );

  return (
    <div>
      <Navbar />
    </div>
  );
};