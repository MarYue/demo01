import React, {Component, Fragment} from 'react'
import XiaojjItem from './XiaojjItem'
import Boss from './Boss'
// import axios from 'axios'
import './style.css'

class Xiaojj extends Component {
  // js的构造函数。在构造函数中定义数据，数据驱动页面变化。不算生命周期函数
  constructor(props) { 
    super(props) // 调用父类的构造函数，固定写法
    this.state = {
      inputValue: '', // input中的值
      list: ['头部按摩', '精油刮痧'] // 服务列表
    }
  }
  // 生命周期 Mounting 阶段（挂载阶段）：componentWillMount  componentDidMount  render
  // 在组件即将被挂载到页面的时刻执行（只在页面刷新时执行一次）
  componentWillMount() {
    console.log('componentWillMount---组件将要挂载到页面的时刻')
  }
  // 组件挂载完成的时刻（只在页面刷新时执行一次）
  // 页面有数据请求的话，推荐写在这里
  componentDidMount() {
    console.log('componentDidMount---组件挂载完成的时刻')
    // axios.post('https://web-api.juejin.im/v3/web/wbbr/bgeda').then(res => {
    //   console.log('数据获取成功：' + JSON.stringify(res))
    // }).catch(err => {
    //   console.log('axios 数据获取失败: ' + err)
    // })
  }

  // 组件挂载中（只要有state和props的变化就会执行）
  render() {
    console.log('render---组件挂载中')
    return (
      // 组件只能有一个根节点，所以需要在外层有一个包裹。
      // 有时候不能有这个包裹（比如flex布局），可以引入 Fragment, 把最外层的包裹标签换成Fragment，查看element 就会发现没有外层的包裹元素了
      <Fragment>
      {/* 用 {} 来标注数据，进行数据绑定 */}
      {/* 绑定响应事件 onChange */}
        <div>
          <label htmlFor="add" className="label">添加😍服务：</label>
          <input className="input" 
            id="add" 
            value={this.state.inputValue} 
            onChange={this.inputChange.bind(this)}
            // ref 关键字- 语义化。
            ref={(input) => {this.input = input}}
          />
          <button className="button" onClick={this.addList.bind(this)}>增加服务😍</button>
        </div>
        <ul className="list" ref={(ul)=>{this.ul = ul}}>
          {/* <li>头部按摩</li>
          <li>精油刮痧</li> */}
          {/* 动态管理数据 */}
          {
            this.state.list.map((item, idx) => {
              return (
                /* <li 
                  key={idx} 
                  onClick={this.deleteItem.bind(this, idx)}
                  // 想在框里输入一个<h1>标签并进行渲染，可以使用dangeroulySetInnerHTML属性
                  dangerouslySetInnerHTML={{__html:item}}
                ></li> */

                /* 父组件向子组件传值，靠属性的形式传递。子组件用this.props.xxx的形式接受 */
                <XiaojjItem 
                  key={idx + item} 
                  // 父组件向子组件传值
                  content={item} 
                  index={idx}
                  // name='孙大腚' // 子组件中设置了默认值，这里注释掉了
                  // 父组件将方法传递给子组件，子组件中直接调用
                  deleteItem={this.deleteItem.bind(this)}
                />
              )
            })
          }
        </ul>
        <Boss />
      </Fragment>
    )
  }

  // 生命周期 Updation 阶段（组件发生改变的更新阶段，一个是props属性改变，一个是state状态改变）：shouldComponentUpdate  componentWillUpdate  componentDidUpdate componentWillReceiveProps
  // shouldComponentUpdate 在组件更新之前自动被执行
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate---组件发生改变前执行')
    // 要求必须有个布尔型返回值，true 同意组件更新，false 反对组件更新
    return true
  }
  // componentWillUpdate 在组件更新前、shouldComponentUpdate之后被执行，但如果shouldComponentUpdate返回false就不执行
  componentWillUpdate() {
    console.log('componentWillUpdate---组件更新前，shouldComponentUpdate函数之后执行')
  }
  // componentDidUpdate 在组件更新之后执行，是组件更新的最后一个环节
  componentDidUpdate() {
    console.log('componentDidUpdate---组件更新之后执行')
  }
  // componentWillReceiveProps 顶层组件中不会被执行，因为没有接收任何props。在子组件中可以看到被执行

  inputChange(e) {
    // console.log(e.target.value)
    // this.state.inputValue = e.target.value // 这样不对：1.this指向不对,要在JSX部分用bind绑定this 2.要使用this.setState来改变值
    this.setState({
      // inputValue: e.target.value // 使用ref语义化之前
      inputValue: this.input.value
      // 用ref 语义化使代码变得优雅，单通常不建议这样做，因为react是数据驱动的，用ref容易有坑。见下面addList中
    })
  }
  // 增加服务按钮响应
  addList() {
    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ''
    // })
    // 这样写会发现数量比实际少1，因为setState是个异步函数，虚拟Dom还没渲染的时候，console就执行了。
    // console.log(this.ul.querySelectorAll('div').length)

    // setState提供了一个回调函数，下面这样写数量就正常了
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    }, () => {
      console.log(this.ul.querySelectorAll('div').length)
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