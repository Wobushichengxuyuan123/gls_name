import ReactDOM from 'react-dom/client';
import IndexRouter from './index_router'
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import zhCN from 'antd/lib/locale-provider/zh_CN'
import "cesium/widgets.css";
import '../css/index.css'

// import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter>
      <IndexRouter />
    </BrowserRouter>
  </ConfigProvider>,
);

