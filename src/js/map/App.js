/* eslint-disable */
import React from 'react';
import * as Cesium from 'cesium'

import '../../css/App.css';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.init()
  }

  init() {
    const viewer = new Cesium.Viewer("cesiumContainer", {
      animation: false, //是否创建动画小器件，左下角仪表
      baseLayerPicker: false, //是否显示图层选择器
      geocoder: false, //是否显示geocoder小器件，右上角查询按钮
      // homeButton: false, //是否显示Home按钮
      infoBox: false, //是否显示信息框
      sceneModePicker: false, //是否显示3D/2D选择器
      selectionIndicator: false, //是否显示选取指示器组件
      timeline: false, //是否显示时间轴
      sceneMode: Cesium.SceneMode.SCENE3D, //设定3维地图的默认场景模式:Cesium.SceneMode.SCENE2D、Cesium.SceneMode.SCENE3D、Cesium.SceneMode.MORPHING
      navigationHelpButton: false, //是否显示右上角的帮助按钮
      scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
      navigationInstructionsInitiallyVisible: true,
      // showRenderLoopErrors: false, //是否显示渲染错误
      // orderIndependentTranslucency: false,    //设置背景透明
      // fullscreenButton: false, //是否显示全屏按钮
      imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
        // url: 'http://192.168.1.86:8989/Bejingmap/',
        // enablePickFeatures: false,
      }),
    });
    viewer._cesiumWidget._creditContainer.style.display = "none";
    viewer.camera.setView({
      // fromDegrees()方法，将经纬度和高程转换为世界坐标
      destination: Cesium.Cartesian3.fromDegrees(106.26667, 39.46667, 2000000.0),
      orientation: {
        heading: 0,
        // 视角
        pitch: -0.5686521559334161,
        roll: 0.0,
      }
    });
    // viewer.dataSources.add(
    //   (Cesium.GeoJsonDataSource.load("/public/china.json", {
    //     stroke: Cesium.Color.BLUE,
    //     fill: Cesium.Color.fromAlpha(Cesium.Color.RED, 0.4),
    //     strokeWidth: 3,
    //     markerSymbol: "?",
    //   }))
    // );
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(116.637, 39.966, 100000),
      oridntation: {
        heading: Cesium.Math.toRadians(0.0),
        putch: Cesium.Math.toRadians(0.0),
        roll: 0.0
      }
    });
    let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(event => {
      // 屏幕坐标转为空间坐标
      let cartesian = viewer.camera.pickEllipsoid(event.position, viewer.scene.globe.ellipsoid);
      if (cartesian == undefined) {
        console.log('没有获取到坐标')
      } else {
        // 空间坐标转世界坐标(弧度)
        let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        // 弧度转为角度（经纬度）
        let lon = Cesium.Math.toDegrees(cartographic.longitude);  // 经度值
        let lat = Cesium.Math.toDegrees(cartographic.latitude);   // 纬度值

        console.log('经纬度是：', { x: lon, y: lat });
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }

  render() {
    return (
      <div id="cesiumContainer"/>
    );
  }
}

export default App;
/* eslint-enable */
