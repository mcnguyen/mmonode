import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SpaceNode from './SpaceNode'

export default class App extends Component {
  render () {
    return (
      <div><SpaceNode /></div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
