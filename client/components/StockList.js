import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  summaryHeader: {
    flexGrow: 1,
  },
  details: {
    flexDirection: 'column',
  },
  positiveText: {
    color: 'green',
  },
  negativeText: {
    color: 'red',
  },
  neutralText: {
    color: 'gray',
  },
});

export default ({ stocks }) => {
  const styleClasses = useStyles();

  const renderStockList = stocks => {
    return stocks.map(s => {
      let price, open, value, valueStyle;
      if (s.price) {
        price = `$${s.price.toFixed(2)}`;
        open = `$${s.open.toFixed(2)}`
        value = `$${(s.price * s.shares).toFixed(2)}`

        if (s.price > s.open) valueStyle = styleClasses.positiveText
        else if (s.price < s.open) valueStyle = styleClasses.negativeText
        else valueStyle = styleClasses.neutralText;
      } else {
        price = 'N/A';
        open = 'N/A';
        value = 'N/A';
        valueStyle = styleClasses.neutralText;
      }

      return (
        <ExpansionPanel key={s.symbol}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={styleClasses.summaryHeader}>
              {`${s.symbol} (${s.shares} shares)`}
            </div>
            <div className={valueStyle}>{`${value}`}</div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={styleClasses.details}>
            <div>{`Share price: ${price}`}</div>
            <div>{`Opening price: ${open}`}</div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
  };

  return (
    <div>
      {renderStockList(stocks)}
    </div>
  );
};