import React, { Component } from 'react'
import PropTypes from 'prop-types' // 用propTypes对父组件传来的值进行校验

class XiaojjItem extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  render() {  
    console.log(' child - render ')
    return ( 
      // 子组件用this.props.xxx的形式接受父组件的传值
      // 可以在这里绑定this【this.handleClick.bind(this)】，但是在构造函数中绑定的性能高一些，尤其是在一些高级组件中
      <div onClick={this.handleClick}>{this.props.name}为你做-{this.props.content}</div>
      // 子组件不能操作父组件里的数据，需要借助一个父组件的方法
     );
  }
  // componentWillReceiveProps 子组件接收到父组件传来的参数，父组件render函数重新被执行，这个生命周期就会被执行
  // 这个组件第一次存在于dom中，函数不会被执行；如果已经存在于dom中，才会被执行
  componentWillReceiveProps() {
    console.log('child --- componentWillReceiveProps')
  }

  // 生命周期 componentWillUnmount 在组件去除时执行。组件在页面中删除时执行
  componentWillUnmount() {
    console.log('child --- componentWillUnmount')
  }

  // 生命周期函数的一个应用（渲染性能优化），子组件频繁无用渲染render，可以在shouldComponentUpdate中进行限制
  shouldComponentUpdate(nextProps, nextState) {
    // 有两个参数：1.nextProps-变化后的属性；2.nextState-变化后的状态
    if(nextProps.content !== this.props.content) {
      return true
    } else {
      return false
    }
  }
  handleClick() { 
    // console.log(this.props.index)
    // 子组件调用父组件传递的方法
    this.props.deleteItem(this.props.index)
  }
}

// 子组件添加类型验证
XiaojjItem.propTypes = {
  content: PropTypes.string,
  index: PropTypes.number,
  deleteItem: PropTypes.func,
  // name: PropTypes.string.isRequired // isRequired 关键字，说明这个值是必传的，不传就报错
}
// 也可以添加默认值 defaultProps
XiaojjItem.defaultProps = {
  name: '孙大腚'
}
 
export default XiaojjItem;