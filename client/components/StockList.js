import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

export default ({ stocks }) => {
  const renderStockList = stocks => {
    return stocks.map(s => {
      const price = s.price ? `$${s.price}` : 'N/A'; 

      return (
        <ExpansionPanel key={s.symbol}>
          <ExpansionPanelSummary>
            {`${s.symbol} - ${s.shares} Shares (${price})`}
          </ExpansionPanelSummary>
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