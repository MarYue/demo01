import React, { Component } from 'react';
class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isShow: false
    }
    this.toggle = this.toggle.bind(this)
  }
  render() { 
    return ( 
      <div>
        <div className={this.state.isShow ? 'show' : 'hide'}>BOSS级人物-马甜甜</div>
        <div><button onClick={this.toggle}>召唤Boss</button></div>
      </div>
     );
  }
  toggle() {
    const isShow = this.state.isShow
    this.setState({
      isShow: !isShow
    })
  }
}
 
export default Boss;