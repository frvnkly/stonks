import { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { makeStyles } from '@material-ui/styles';

import UserContext from '../context/UserContext';
import Navbar from '../components/Navbar';
import BuyModal from '../components/BuyModal';
import StockList from '../components/StockList';

const useStyles = makeStyles({
  header: {
    paddingBottom: '20px',
  },
});

export default () => {
  const { user } = useContext(UserContext);
  const [ portfolio, setPortfolio ] = useState(null);

  const styleClasses = useStyles();

  useEffect(() => {
    // redirect if user not logged in
    if (user === '') { Router.replace('/') }
  });

  useEffect(() => {
    // retrieve user portfolio
    if (user) {
      const portfolioEndpoint = '/api/stocks/portfolio';
      axios.get(portfolioEndpoint)
      .then(res => { setPortfolio(res.data); })
      .catch(err => {});
    }
  }, [ user ]);

  return (
    <div>
      <Navbar />
      <Container maxWidth='md'>
        <Typography variant='h4' align='center' className={styleClasses.header}>
          Portfolio
        </Typography>
        {portfolio &&
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Card>
                <CardHeader
                  title='Balance'
                  subheader={`$${portfolio.balance.toFixed(2)}`}
                  action={<BuyModal />}
                />
              </Card>
            </Grid>

            <Grid item>
              <Card>
              <CardHeader
                  title='Portfolio'
                  subheader={
                    portfolio.portfolio
                    ? `$${portfolio.portfolio.toFixed(2)}`
                    : 'N/A'
                  }
                />
              </Card>
            </Grid>

            <Grid item>
              <Divider />
            </Grid>

            <Grid item>
              <Typography variant='h5' align='center'>Stocks</Typography>
            </Grid>

            <Grid item>
              <StockList stocks={portfolio.stocks} />
            </Grid>
          </Grid>
        }
      </Container>
    </div>
  );
};