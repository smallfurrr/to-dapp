import React, { Component } from 'react'
import Torus from '@toruslabs/torus-embed'
import Web3 from 'web3'
import web3Obj from './helper'
import './App.css'

const torus = new Torus();
torus.init()

class App extends Component {

    state = {
      account: '',
      balance: ''
    }
  
    componentDidMount() {
      const isTorus = sessionStorage.getItem('pageUsingTorus')
  
      if (isTorus) {
        web3Obj.initialize().then(() => {
          this.setStateInfo()
        })
      }
    }
  
    setStateInfo = () => {
      web3Obj.web3.eth.getAccounts().then(accounts => {
        this.setState({ account: accounts[0] })
        web3Obj.web3.eth.getBalance(accounts[0]).then(balance => {
          this.setState({ balance: balance })
        })
      })
    }
  
    enableTorus = async () => {
      try {
        await web3Obj.initialize()
        this.setStateInfo()
      } catch (error) {
        console.error(error)
      }
    }
  
    render() {
      return (
        <div className="App">
          <div>
            <button onClick={this.enableTorus}>Start using Torus</button>
          </div>
          <div>
            {/* <button onClick={this.enableTorus}>Enable Torus</button> */}
            <div>Account: {this.state.account}</div>
            <div>Balance: {this.state.balance}</div>
          </div>
        </div>
      )
    }
  }

export default App;