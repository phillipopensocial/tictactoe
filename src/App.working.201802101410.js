import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
//import TictactoeContract from '../build/contracts/Tictactoe.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      account: 0,    //Add to track the account
      board: -1     //Add to track Tictactoe board
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    this.setState({board:0})

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
   // const tictactoe = contract(TictactoeContract)       //add by phillip

    this.setState({board:1})

    simpleStorage.setProvider(this.state.web3.currentProvider)
    //tictactoe.setProvier(this.state.web3.currentProvider)  //add by phillip

    this.setState({board:2})

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance
   // var tictactoeInstance
   // var aboard

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {

      /*
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance
        this.setState({account: accounts[0]})   //get the account number it the React state
        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
      */

     simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance
        this.setState({board:3})

        this.setState({account: accounts[0]})   //get the account number it the React state
          // Stores a given value, 5 by default.
          //return simpleStorageInstance.set(5, {from: accounts[0]})
        this.setState({board:4})

        return simpleStorageInstance.getBoardSize({from: accounts[0]} )

      }).then((result) => {
        console.log(result)
        // Get the value from the contract to prove it worked.
        this.setState({board:5})
        return this.setState({board: result.c[0]})
      })
      
      /*
      //Get board status
      tictactoe.deployed().then((instance) => {
        tictactoeInstance = instance
        return tictactoeInstance.getBoardSize( {from: accounts[0]})
      }).then((result) => {
        return this.setState({board: aboard})
      })
      */

    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Welcome to TicTacToe!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <p>The stored value is: {this.state.storageValue}</p>
              <p>Account: {this.state.account}</p>
              <p>Board: {this.state.board}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
