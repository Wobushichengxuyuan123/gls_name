/* eslint-disable */
import React from 'react';
import App from './map/App';
import { Layout, Icon } from 'antd';
import MenuTop from './header/MenuTop';
import datajson from './router';
import Menus from './header/menu';
const { Content, Sider } = Layout;
class IndexRouter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}
	UNSAFE_componentWillMount() { }
	componentDidMount() { }
	menuChange = (data) => {
		console.log(data);
	}
	render() {
		const old = () => {
			return <Layout>
				<MenuTop
					change={this.menuChange()}
					data={datajson}
					userName={'1'}
				/>
				<Layout>
					<Sider width={60} style={{ background: '#fff', zIndex: '9' }} >
						{/* <Menus
						//  menu={defaultKey}
						/> */}
					</Sider>
					{/* 控制菜单显示 */}
					{/* <div className={openFlag ? 'closeBtn' : 'openBtn'} onClick={_ => setOpenFlag(!openFlag)}><Icon type={openFlag ? 'left' : 'right'} /></div> */}
					<Layout>
						<Content style={{ padding: 0, margin: 0, minHeight: 280, }}>
							<App />
						</Content>
					</Layout>
				</Layout>
			</Layout>
		}
		return old();
	}
};
export default IndexRouter;
/* eslint-enable */