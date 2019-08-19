import React from 'react';
import { Card, Form } from 'antd'
import BaseForm from '../../components/BaseForm'
import axios from './../../axios'

export default class BikeMap extends React.Component {

    state = {}
    map = '';

    formList = [
        {
            type: 'city'
        }, {
            type: 'search_time'
        }, {
            type: 'SELECT',
            label: 'order status',
            field: 'order_status',
            placeholder: 'All',
            initialValue: '0',
            list: [{ id: '0', name: 'All' }, { id: '1', name: 'In Process' }, { id: '2', name: 'Finshed' }]
        }
    ]

    requestList = () => {
        axios.ajax({
            url: '/map/bike_list',
            data: {
                params: this.params
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    total_count: res.result.total_count
                })
                this.renderMap(res);
            }
        })
    }

    componentWillMount() {
        this.requestList();
    }

    handelFilterSubmit = (filterParams) => {
        this.params = filterParams;
        this.requestList();
    }

    renderMap = (res) => {
        let list = res.result.route_list;
        this.map = new window.BMap.Map('container');
        let gps1 = list[0].split(',');
        let startPoint = new window.BMap.Point(gps1[0], gps1[1]);
        let gps2 = list[list.length - 1].split(',');
        let endPoint = new window.BMap.Point(gps2[0], gps2[1]);
        this.map.centerAndZoom(endPoint, 11);

        let startPointIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        })
        let bikeMarkerStart = new window.BMap.Marker(startPoint, { icon: startPointIcon })
        this.map.addOverlay(bikeMarkerStart);
        let endPointIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        })
        let bikeMarkerEnd = new window.BMap.Marker(endPoint, { icon: endPointIcon })
        this.map.addOverlay(bikeMarkerEnd);

        let routeList = [];
        list.forEach((item) => {
            let p = item.split(',');
            routeList.push(new window.BMap.Point(p[0], p[1]))
        })

        let polyLine = new window.BMap.Polyline(routeList, {
            strokeColor: '#ef4136',
            strokeWeight: 2,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyLine);

        let servicePointList = [];
        let serviceList = res.result.service_list;
        serviceList.forEach((item) => {
            servicePointList.push(new window.BMap.Point(item.lon, item.lat))
        })
        let polyServiceLine = new window.BMap.Polyline(servicePointList, {
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyServiceLine);

        let bikeList = res.result.bike_list;
        let bikeIcon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        })
        bikeList.forEach((item) => {
            let p = item.split(',');
            let point = new window.BMap.Point(p[0], p[1]);
            let bikeMarker = new window.BMap.Marker(point, { icon: bikeIcon })
            this.map.addOverlay(bikeMarker);
        })
    }



    render() {
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handelFilterSubmit} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <div>Total:{this.state.total_count}</div>
                    <div id="container" style={{ height: 500 }}></div>
                </Card>
            </div>
        );
    }
}
