import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './style.scss'

const Menus = ({ menu }) => {

    const [btnShow, setBtnShow] = useState(null); // 按钮
    const imageFiles = require.context('./img', false, /\.png$/) // 获取菜单图标集合
    useEffect(() => {
        const { pathname } = window.location
        const pathParams = pathname.split('$')
        setBtnShow(pathParams.at(-1))
    }, [])
    // 扫描图片文件获取图片对象
    const imageContext = (key) => {
        let baseImg = ''
        imageFiles.keys().forEach((v) => {
        	const img = v.replace('./', '').replace('.png', '')
        	if (img === key) {
        		baseImg = imageFiles(v).default
        	}
        })
        return baseImg
    }
    // 动态改变菜单样式
    const menuStyle = (key, activeKey) => {
        const backImg = imageContext(key === activeKey ? `${key}.active` : key)
        return {
            backgroundImage: `url(${backImg})`,
            backgroundPosition: 'center 12px',
            color: key === activeKey ? '#058b88' : '#333'
        }
    }
    return (
        <div className="menu-nav" >
            {
                menu?.map((val, i) => {
                    console.log(val,i);
                    const urlKey = val.url?.split('$').at(-1)
                    return (
                        <Link to={val.url} key={i}>
                            <div
                                key={val.url}
                                style={menuStyle(urlKey, btnShow)}
                                onClick={() => setBtnShow(urlKey)}>
                                {val.functionName}
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default Menus