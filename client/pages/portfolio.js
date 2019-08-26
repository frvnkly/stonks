import { useContext, useEffect } from 'react';
import Router from 'next/router';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

import UserContext from '../context/UserContext';
import Navbar from '../components/Navbar';
import BuyModal from '../components/BuyModal';

const useStyles = makeStyles({
  header: {
    paddingBottom: '20px',
  },
});

export default () => {
  const { user } = useContext(UserContext);

  const styleClasses = useStyles();

  useEffect(() => {
    // redirect if user not logged in
    if (user === '') { Router.replace('/') }
  });

  return (
    <div>
      <Navbar />
      <Container maxWidth='md'>
        <Typography variant='h4' align='center' className={styleClasses.header}>
          Portfolio
        </Typography>
        {user &&
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Card>
                <CardHeader
                  title='Balance'
                  subheader={`$${user.balance}`}
                  action={<BuyModal />}
                />
              </Card>
              </Grid>
            <Grid item>
              <Card>
              <CardHeader
                  title='Portfolio'
                  subheader='$5000'
                />
              </Card>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
            <Grid item>
              <div>
                <ExpansionPanel>
                  <ExpansionPanelSummary>
                    Stock 1
                  </ExpansionPanelSummary>
                </ExpansionPanel>
                <ExpansionPanel>
                  <ExpansionPanelSummary>
                    Stock 2
                  </ExpansionPanelSummary>
                </ExpansionPanel>
                <ExpansionPanel>
                  <ExpansionPanelSummary>
                    Stock 3
                  </ExpansionPanelSummary>
                </ExpansionPanel>
              </div>
            </Grid>
          </Grid>
        }
      </Container>
    </div>
  );
};