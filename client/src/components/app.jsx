class App extends React.Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.submit = this.submit.bind(this);
    this.submitOwesLoans = this.submitOwesLoans.bind(this);
    // console.log(this.props);
    this.state = {
      signedIn: false,
      curr: (<SpendingList list={props.data} submit={this.submit}/>),
      data: this.props.data,
      transactions: [],
      debts: []
    };
  }

  loadTrans(data) {
    console.log(data.transaction);
    this.setState({
      transactions: data.transaction
    });

    this.setState({
      curr: (<SpendingList list={this.state.transactions} submit={this.submit} />)
    });
  }

  loadDebts(data) {
    console.log(data);
    this.setState({
      debts: data.debt
    });

    this.setState({
      curr: (<OwesList list={this.state.debts} submitOwesLoans={this.submitOwesLoans}/>)
    });
  }

  componentDidMount() {
    this.props.getReq({url: 'transactions'}, this.loadTrans.bind(this));
    // this.props.getReq({url: 'debts'}, this.loadDebts.bind(this));
    console.log(this.state.transactions);
  }

  click(e) {
    console.log(e.target.innerHTML);
    if (e.target.innerHTML === 'Transactions') {
      this.setState({
        curr: (<SpendingList list={this.state.transactions} submit={this.submit} />)
      });
    } else if (e.target.innerHTML === 'Owes/Debts') {
      this.props.getReq({url: 'debts'}, this.loadDebts.bind(this));
      // this.setState({
      //   curr: (<OwesList list={this.state.debts} submitOwesLoans={this.submitOwesLoans}/>)
      // });
    }
  }

  submit(e) {
    e.preventDefault();

    var spendingData = {
      category: e.target.children[1].children[0].children[e.target.children[1].children[0].selectedIndex].value,
      title: e.target.children[2].children[0].value,
      amount: '$' + e.target.children[3].children[1].value,
      url: 'transactions'
    };

    console.log(spendingData);

    postReq(spendingData);

    // this.state.data.push(spendingData);
    this.props.getReq({url: 'transactions'}, this.loadTrans.bind(this));

    if (this.state.curr.type.name === 'SpendingList') {
      this.setState({
        curr: (<SpendingList list={this.state.transactions} submit={this.submit} />)
      });
    } else {
      this.setState({
        curr: (<OwesList list={this.state.debts} submitOwesLoans={this.submitOwesLoans}/>)
      });
    }
  }

  submitOwesLoans(e) {
    e.preventDefault();
    var owesLoansData = {
      person: e.target.children[1].children[0].value,
      type: e.target.children[2].children[0].value,
      amount: '$' + e.target.children[3].children[1].value,
      url: 'debts'
    };

    console.log(owesLoansData);

    postReq(owesLoansData);

    this.props.getReq({url: 'debts'}, this.loadTrans.bind(this));
  }

  render() {
    return (
      <div id="wrapper" className="app">
      <div id='sidebar-wrapper'>
      <Sidebar click={this.click}/>
      </div>
      <div id='page-content-wrapper'>
      <h1 className='appTitle'><strong>Money</strong>.io</h1>
      {this.state.curr}
      </div>
      </div>
      );
  }

}
window.App = App;