export default class BalanceSheet extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null
    };
  }

  refresh(source=this.props.source) {
    fetch(source)
      .then(result => result.json())
      .then(ob => this.setState({ data: ob }));
  }

  componentDidMount() {
    this.refresh();
  }

  componentWillReceiveProps(nextprops) {
    this.refresh(nextprops.source);
  }

  render() {
    if (this.state.data === null) {
      return (<article className="balance-sheet">
        <h1>Balance Sheet</h1>
        <p>Loading... Thank you for your patience.</p>
      </article>);
    }
    return (
      <article className="balance-sheet">
        <h1>Balance Sheet</h1>
        <Pane type="assets" data={this.state.data.assets} />
        <Pane type="liabilities" data={this.state.data.liabilitiesandequity} />
      </article>
    );
  }
}

function pack$(rows, section, title=true) {
  var totalClass = "total";
  if (title) {
    totalClass = "small-total";
    rows.push(<tr className="chief">
      <td colSpan="2">{section.heading}</td>
    </tr>);
  }
  for (var subs of section.subsections) {
    pack$(rows, subs);
  }
  for (var ent of section.entries) {
    rows.push(<Entry label={ent.name} data={ent.value} />);
  }
  var totalLabel = "Total " + section.heading;
  rows.push(
    <Entry type={totalClass} label={totalLabel} data={section.total} />);
}

class Pane extends React.Component {
  render() {
    var data = this.props.data;
    var entries = [];
    pack$(entries, data, false);

    return (
      <section className={this.props.type}>
        <h1>{data.heading}</h1>
        <table>
          <tbody>
            {entries}
          </tbody>
        </table>
      </section>
    );
  }
}

class Entry extends React.Component {
  render() {
    return (
      <tr className={this.props.type}>
        <td>{this.props.label}</td>
        <td>{this.props.data.join(", ")}</td>
      </tr>
    );
  }
}
