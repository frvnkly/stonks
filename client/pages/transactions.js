import { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import UserContext from '../context/UserContext';
import Navbar from '../components/Navbar';
import TransactionList from '../components/TransactionList';

const useStyles = makeStyles({
  heading: {
    paddingBottom: '20px',
  },
});

export default () => {
  const { user } = useContext(UserContext);
  const [ transactions, setTransactions ] = useState([]);

  const styleClasses = useStyles();

  useEffect(() => {
    // redirect if user not logged in
    if (user === '') { Router.replace('/') }
  });

  useEffect(() => {
    // retrieve transaction history from server
    if (user) {
      const transactionsEndpoint = 'api/stocks/transactions';
      axios.get(transactionsEndpoint)
        .then(res => { setTransactions(res.data.transactions); })
        .catch(err => { setTransactions([]); });
    }
  }, [ user ]);

  return (
    <div>
      <Navbar />
      <Container maxWidth='md'>
        <Typography variant='h4' align='center' className={styleClasses.heading}>
          Transactions
        </Typography>
        <TransactionList transactions={transactions} />
      </Container>
    </div>
  );
};