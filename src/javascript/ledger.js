export default class Ledger extends React.Component {
  render() {
    return (
      <section>
        <h1>{this.props.name}</h1>
        {this.props.transactions}
      </section>
    );
  }
}

class Transaction extends React.Component {
  render() {
    return (
      <section className="transaction">
        <ul>
          {this.props.splits}
        </ul>
        <p>{this.props.description}</p>
      </section>
    )
  }
}

class Split extends React.Component {
  render() {
    return (
      <li>
        <span className="account">{this.props.account}</span>
        <span className="debit">{this.props.debit}</span>
        <span className="credit">{this.props.credit}</span>
      </li>
    )
  }
}
