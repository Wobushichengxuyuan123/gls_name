import React from 'react'
import { Icon, Menu, Dropdown } from 'antd'
import powerStation from './img/powerStation.svg'
import './style.scss'

class MenuTop extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (JSON.stringify(props.data) !== JSON.stringify(state.data)) {
            return {
                data: props.data
            }
        }
        return null
    }
    componentDidMount() {}
    chooseMenu(data) {
        console.log(data);
        // for (var i = 0; i < document.getElementById('parentID').childNodes.length; i++) {
        //     document.getElementById('parentID').childNodes[i].style.background = '#009789'
        //     document.getElementById('parentID').childNodes[i].style.color = '#fff'
        // }
        // document.getElementById(data.url).style.background = '#387b73'
        // document.getElementById(data.id).style.color = '#2caba2'
        this.props.change(data.children)
    }
    clickCancelHander() {
        const { protocol, host } = window.location
        sessionStorage.clear()
        window.location.href = window.LOGINPATH + '?pathUrl=' + protocol + '//' + host
    }
    render() {
        const imageFiles = require.context('./img', false, /\.svg$/) // 获取菜单图标集合
        const imageContext = (key) => {
            let baseImg = ''
            imageFiles.keys().forEach((v) => {
                const img = v.replace('./', '').replace('.svg', '')
                if (img === key) {
                    // baseImg = imageFiles(v).default
                }
            })
            return baseImg
        }
        const list = this.state.data.map((item, index) => {
            const backImg = imageContext(item.url)
            return (
                <li
                    onClick={this.chooseMenu.bind(this, item)}
                    id={item.url}
                    className="menuTopNav_li"
                    key={item.id + index}
                >
                    <div className="li_boxs">
                        <div className="li_box">
                            <img src={backImg} alt={item.functionName} />
                            {/* {item ? item.functionName : null} */}
                        </div>
                    </div>
                </li>
            )
        })

        const menu = (
            <Menu>
                <Menu.Item key="userRightMenu">
                    <Icon type="logout" />
                    <span onClick={this.clickCancelHander.bind(this)}>注销登录</span>
                </Menu.Item>
            </Menu>
        )
        return (
            <div className='menuTop'>
                <div className="dateBox">
                    {/* <img src={powerStation} alt="标题" /> */}
                    管控中心
                </div>
                <ul id="parentID">{list}</ul>
                <div className="user_info">
                    <Dropdown overlay={menu} trigger={['click']}>
                        <span style={{ cursor: 'pointer' }}>
                            <Icon type="user" />
                            {this.props.userName }
                            <Icon type="down" />
                        </span>
                    </Dropdown>
                </div>
            </div>
        )
    }
}
export default MenuTop
