import React from 'react'
import ReactDOM from 'react-dom'
import Papaparse from 'papaparse'
require('file?name=[name].[ext]!./index.html')


class App extends React.Component {
  constructor() {
    super()
    this.state = {addresses: null}
    this.drop = this.drop.bind(this)
  }
  drop(event) {
    event.preventDefault()
    var files = event.dataTransfer.files;
    var count = files.length;
    
    Papaparse.parse(files[0], {
      //header: true,
      complete: (results) => {
        console.log(results.data)
        this.setState({addresses: results.data})
      }
    })
  }

  render() {
    var envelopes = null
    
    var items = this.state.addresses == null ? null : this.state.addresses[0].map((text) => <option key={text}>{text}</option>)
    var selection = <select>{items}</select>
                                            
    var envelopeTemplate = <Envelope
                    address1={selection}
                    address2={selection}
                    address3={selection}
                    return1="Jane Doe"
                    return2="5678 Brompton St"
                    return3="Houston, TX 77025"
                  />
    var envelopes = this.state.addresses == null ? null : this.state.addresses.map((address) => 
      <Envelope
        address1={address.Name}
        address2={address.Address}
        address3={address.City}
        return1="Return Addresss"
        return2="1234 Brompton St. Apt 567"
        return3="Houston, TX 77005"
        key={address.Name}
      /> : null
    )
    return (
      <div>
        <div
          onDrop={this.drop}
          onDragOver={(event) => event.preventDefault()}>
          {envelopeTemplate}
        </div>
        {envelopes}  
      </div>
    )
  }
}

function Envelope (props) {
  return (
    <div className="envelope">
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