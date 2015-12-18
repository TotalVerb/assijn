import BalanceSheet from "./balancesheet";
import Ledger from "./ledger";

class Assijn extends React.Component {
  constructor() {
    super();
    this.state = { currency: "USD" };
  }

  changeCurrency(cur) {
    this.setState({ currency: cur });
  }

  render() {
    var bs_source = "/bs/" + this.state.currency;
    return (
      <main>
        <h1>Assijn</h1>
        <h2>Currency</h2>
        <CurrencySelector onChange={this.changeCurrency.bind(this)} />
        <BalanceSheet source={bs_source} />
        <Ledger name="General Ledger" transactions={[]} />
      </main>
    );
  }
}

class CurrencySelector extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: "USD"
    };
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ currency: value });
    this.props.onChange(value);
  }

  render() {
    var value = this.state.currency;
    return (
      <select value={value} onChange={this.handleChange.bind(this)}>
        <option value="USD">US Dollar</option>
        <option value="EUR">Euro</option>
        <option value="CAD">Canadian Dollar</option>
      </select>);
  }
}

ReactDOM.render(<Assijn />, document.getElementById('app'));
