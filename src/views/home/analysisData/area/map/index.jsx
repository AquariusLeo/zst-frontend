import { useEffect } from 'react';
import { Scene } from '@antv/l7';
import { CountryLayer } from '@antv/l7-district';
import { Mapbox } from '@antv/l7-maps';
const colors = ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'];

const Map = props => {
  useEffect(() => {
    const scene = new Scene({
      id: 'map',
      map: new Mapbox({
        center: [116.2825, 39.9],
        pitch: 0,
        style: 'blank',
        zoom: 5,
        minZoom: 0,
        maxZoom: 10,
      }),
      logoVisible: false,
    });
    scene.on('loaded', () => {
      new CountryLayer(scene, {
        data: props.provinceMap,
        joinBy: ['NAME_CHN', 'name'],
        depth: 1,
        provinceStroke: '#fff',
        cityStroke: '#EBCCB4',
        cityStrokeWidth: 1,
        fill: {
          color: {
            field: 'value',
            values: colors,
          },
        },
        popup: {
          enable: true,
          Html: props => {
            return `<span>${props.NAME_CHN}</span>
            <span>${props.value}</span>`;
          },
        },
      });
    });
    return () => {
      scene.destroy();
    };
  }, [props, props.provinceMap]);

  return (
    <div
      id="map"
      style={{
        minHeight: '400px',
        justifyContent: 'center',
        position: 'relative',
        margin: '40px 0',
      }}
    ></div>
  );
};

export default Map;

// const ProvinceData = [
//   {
//     name: '云南省',
//     value: 17881.12,
//   },
//   {
//     name: '黑龙江省',
//     value: 16361.62,
//   },
//   {
//     name: '贵州省',
//     value: 14806.45,
//   },
//   {
//     name: '北京市',
//     value: 30319.98,
//   },
//   {
//     name: '河北省',
//     value: 36010.27,
//   },
//   {
//     name: '山西省',
//     value: 16818.11,
//   },
//   {
//     name: '吉林省',
//     value: 15074,
//   },
//   {
//     name: '宁夏回族自治区',
//     value: 3705.18,
//   },
//   {
//     name: '辽宁省',
//     value: 25315.35,
//   },
//   {
//     name: '海南省',
//     value: 4832.05,
//   },
//   {
//     name: '内蒙古自治区',
//     value: 17289.22,
//   },
//   {
//     name: '天津市',
//     value: 18809.64,
//   },
//   {
//     name: '新疆维吾尔自治区',
//     value: 12199.08,
//   },
//   {
//     name: '上海市',
//     value: 32679.87,
//   },
//   {
//     name: '陕西省',
//     value: 24438.32,
//   },
//   {
//     name: '甘肃省',
//     value: 8246.07,
//   },
//   {
//     name: '安徽省',
//     value: 30006.82,
//   },
//   {
//     name: '香港特别行政区',
//     value: 0,
//   },
//   {
//     name: '广东省',
//     value: 97277.77,
//   },
//   {
//     name: '河南省',
//     value: 48055.86,
//   },
//   {
//     name: '湖南省',
//     value: 36425.78,
//   },
//   {
//     name: '江西省',
//     value: 21984.78,
//   },
//   {
//     name: '四川省',
//     value: 40678.13,
//   },
//   {
//     name: '广西壮族自治区',
//     value: 20353.51,
//   },
//   {
//     name: '江苏省',
//     value: 92595.4,
//   },
//   {
//     name: '澳门特别行政区',
//     value: null,
//   },
//   {
//     name: '浙江省',
//     value: 56197.15,
//   },
//   {
//     name: '山东省',
//     value: 76469.67,
//   },
//   {
//     name: '青海省',
//     value: 2865.23,
//   },
//   {
//     name: '重庆市',
//     value: 20363.19,
//   },
//   {
//     name: '福建省',
//     value: 35804.04,
//   },
//   {
//     name: '湖北省',
//     value: 39366.55,
//   },
//   {
//     name: '西藏自治区',
//     value: 1477.63,
//   },
//   {
//     name: '台湾省',
//     value: null,
//   },
// ];
