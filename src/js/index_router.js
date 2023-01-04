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
			openFlag: true,
			defaultKey: datajson[0].children
		};
	}
	UNSAFE_componentWillMount() { }
	componentDidMount() { }
	menuChange = (data) => {
		this.setState({
			defaultKey: data
		})
		console.log(data);
	}
	render() {
		const { openFlag, defaultKey } = this.state
		const old = () => {
			return <Layout>
				<MenuTop
					change={this}
					data={datajson}
					userName={'测试人员'}
				/>
				<Layout>
					<Sider width={60} style={{ background: '#fff', zIndex: '9', display: openFlag ? 'block' : 'none' }} >
						<Menus
							menu={defaultKey}
						/>
					</Sider>
					{/* 控制菜单显示 */}
					<div className={openFlag ? 'closeBtn' : 'openBtn'} onClick={() => { this.setState({ openFlag: !openFlag }) }}><Icon type={openFlag ? 'left' : 'right'} /></div>
					<Content className={openFlag ? 'left' : 'right'} style={{ padding: 0, margin: 0, minHeight: 280, }}>
						<App>
							
						</App>
					</Content>

				</Layout>
			</Layout>
		}
		return old();
	}
};
export default IndexRouter;
/* eslint-enable */