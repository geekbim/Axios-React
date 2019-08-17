import React, { Component } from 'react'
import Blog from './Container/Blog'

class App extends Component {
  render() {
    return (
      <div>
        <center>
          <h1>BLOG</h1>
          <hr/>
          <h1>BLOG POST</h1>
          <Blog/>
        </center>
      </div>
    )
  }
}

export default App
