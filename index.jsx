import React from 'react'
import ReactDOM from 'react-dom'
import Papaparse from 'papaparse'
require('file?name=[name].[ext]!./index.html')


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      addresses: [],
      address1Index: -1,
      address2Index: -1,
      address3Index: -1,
      return1: 'Sender',
      return2: 'Return Address',
      return3: 'City, State Zip'
    }
    this.drop = this.drop.bind(this)
  }
  componentWillMount() {
    var update = {}
    if(localStorage.getItem('return1'))
      update.return1 = localStorage.getItem('return1')
    if(localStorage.getItem('return2'))
      update.return2 = localStorage.getItem('return2')
    if(localStorage.getItem('return3'))
      update.return3 = localStorage.getItem('return3')
    this.setState(update)
  }
  drop(event) {
    event.preventDefault()
    var files = event.dataTransfer.files;
    var count = files.length;
    
    Papaparse.parse(files[0], {
      //header: true,
      complete: (results) => {
        this.setState({ addresses: results.data })
        if(results.data[0].length>=3)
        this.setState({ address1Index: 0, address2Index: 1, address3Index: 2 })
      }
    })
  }
  render() {
    
    const options = (this.state.addresses[0] || []).map((text, i) => (<option value={i} key={i}>{text}</option>))

    const address1IndexSelection = <select value={this.state.address1Index} onChange={(e) => this.setState({address1Index: e.target.value})}>{options}</select>
    const address2IndexSelection = <select value={this.state.address2Index} onChange={(e) => this.setState({address2Index: e.target.value})}>{options}</select>
    const address3IndexSelection = <select value={this.state.address3Index} onChange={(e) => this.setState({address3Index: e.target.value})}>{options}</select>

    const envelopeTemplate = <Envelope
                    address1={address1IndexSelection}
                    address2={address2IndexSelection}
                    address3={address3IndexSelection}
                    return1={<input type="text" value={this.state.return1} onChange={(e) => { this.setState({return1: e.target.value}); localStorage.setItem('return1', e.target.value) }} />}
                    return2={<input type="text" value={this.state.return2} onChange={(e) => { this.setState({return2: e.target.value}); localStorage.setItem('return2', e.target.value) }} />}
                    return3={<input type="text" value={this.state.return3} onChange={(e) => { this.setState({return3: e.target.value}); localStorage.setItem('return3', e.target.value) }} />}
                    className="print-hide"
                  />
                                                                              
    const envelopes = this.state.addresses.map(address => {
      return {
        Name: this.state.address1Index > -1 ? address[this.state.address1Index] : null,
        Address: this.state.address2Index > -1 ? address[this.state.address2Index] : null,
        City: this.state.address3Index > -1 ? address[this.state.address3Index] : null,
       }
    })
    .map((address, i) => 
      <Envelope
        address1={address.Name}
        address2={address.Address}
        address3={address.City}
        return1={this.state.return1}
        return2={this.state.return2}
        return3={this.state.return3}
        key={i}
      /> : null
    )
    return (
      <div>
        <div
          onDrop={this.drop}
          onDragOver={(event) => event.preventDefault()}>
          {envelopeTemplate}
        </div>
        <div className="previews">
          {envelopes}  
        </div>
      </div>
    )
  }
}

function Envelope (props) {
  return (
    <div className={props.className + ' envelope'}>
      <div className="logo">
        {props.logo}
      </div>
      <div className="from">
        {props.return1}<br />
        {props.return2}<br />
        {props.return3}<br />
        {props.return4}<br />
      </div>
      <div className="to">
        {props.address1}<br />
        {props.address2}<br />
        {props.address3}<br />
        {props.address4}
      </div>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('app'))