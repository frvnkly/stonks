import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  timestamp: {
    color: 'gray',
    flexBasis: '100%',
  },
  column: {
    flexBasis: '25%',
  },
  price: {
    textAlign: 'right',
  },
  positiveText: {
    color: 'green',
  },
  negativeText: {
    color: 'red',
  },
});

export default ({ transactions }) => {
  const styleClasses = useStyles();

  const renderTransactions = (transactions) => {
    return transactions.map(t => {
      // decompose timestamp
      const ts = new Date(t.timestamp);
      const date = `${ts.getMonth() + 1}/${ts.getDate()}/${ts.getFullYear()}`;
      const hour = ts.getHours() % 12 === 0 ? 12 : ts.getHours() % 12;
      const minute = String(ts.getMinutes()).padStart(2, '0');
      const amPm = ts.getHours() < 12 ? 'AM' : 'PM';

      const plusMinus = t.type === 'buy' ? '-' : '+';
      const priceColor = t.type === 'buy' 
        ? styleClasses.negativeText
        : styleClasses.positiveText;

      return (
        <Grid item key={t.timestamp}>
          <Card>
            <CardContent className={styleClasses.card}>
              <div className={styleClasses.timestamp}>
                {`${date} ${hour}:${minute}${amPm}`}
              </div>
              <div className={styleClasses.column}>
                {t.type.toUpperCase()}
              </div>
              <div className={styleClasses.column}>
                {t.symbol}
              </div>
              <div className={styleClasses.column}>
                {`Shares: ${t.shares}`}
              </div>
              <div
                className={
                  `${styleClasses.column} ${styleClasses.price} ${priceColor}`
                }
              >
                {`${plusMinus}$${t.total.toFixed(2)}`}
              </div>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  };

  return (
    <Grid container direction='column' spacing={2}>
      {renderTransactions(transactions)}
    </Grid>
  );
};