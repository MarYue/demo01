import React, {Component, Fragment} from 'react'
import './style.css'

class Xiaojj extends Component {
  // js的构造函数。在构造函数中定义数据，数据驱动页面变化
  constructor(props) { 
    super(props) // 调用父类的构造函数，固定写法
    this.state = {
      inputValue: '', // input中的值
      list: ['头部按摩', '精油刮痧'] // 服务列表
    }
  }
  render() {
    return (
      // 组件只能有一个根节点，所以需要在外层有一个包裹。
      // 有时候不能有这个包裹（比如flex布局），可以引入 Fragment, 把最外层的包裹标签换成Fragment，查看element 就会发现没有外层的包裹元素了
      <Fragment>
      {/* 用 {} 来标注数据，进行数据绑定 */}
      {/* 绑定响应事件 onChange */}
        <div>
          <label htmlFor="add" className="label">添加服务：</label>
          <input className="input" id="add" value={this.state.inputValue} onChange={this.inputChange.bind(this)}/>
          <button className="button" onClick={this.addList.bind(this)}>增加服务</button>
        </div>
        <ul className="list">
          {/* <li>头部按摩</li>
          <li>精油刮痧</li> */}
          {/* 动态管理数据 */}
          {
            this.state.list.map((item, idx) => {
              return (
                <li 
                  key={idx} 
                  onClick={this.deleteItem.bind(this, idx)}
                >{item}</li>
              )
            })
          }
        </ul>
      </Fragment>
    )
  }
  inputChange(e) {
    // console.log(e.target.value)
    // this.state.inputValue = e.target.value // 这样不对：1.this指向不对,要在JSX部分用bind绑定this 2.要使用this.setState来改变值
    this.setState({
      inputValue: e.target.value
    })
  }
  // 增加服务按钮响应
  addList() {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    })
  }
  // 删除已有项
  deleteItem(idx) {
    // this.state.list.splice(idx, 1) // 虽然这样也管用，但是在后期性能优化上有很多麻烦，不要这样操作
    let list = this.state.list
    list.splice(idx, 1)
    this.setState({
      list: list
    })
  }
}
export default Xiaojj