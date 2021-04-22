import React, {Component} from 'react'; // ES6 解构赋值。也可以写成 import React from 'react'; const Component = React.Component

class App extends Component {
  render() {
    return (
      <ul className="myList">
        <li>{ false ? '嘿嘿' : '想粗去玩'}</li>
        <li>I want to play!</li>
      </ul>
    )
  }
}

export default App