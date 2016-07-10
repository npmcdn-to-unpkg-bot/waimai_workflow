import React from 'react';
import {hashHistory, Router, Route, IndexRoute, Link}from 'react-router';
import {Table, Menu, Dropdown, Icon, Modal, Button, Checkbox}from 'antd';
import ajax from '../../static/js/utils/ajax.js';

var style = {
    topMenu: {
        position: 'relative',
        width: '70%',
        height: '50px',
        marginTop: '100px',
        marginLeft: '50px',
    },
    dropBtn: {
        marginLeft: '10px',
        float: 'left',
    },

    batchManage: {
        position: 'absolute',
        right: 0,
    },
    table: {
        marginLeft: '55px',
        marginTop: '10px',
    },
    input: {
        borderRadius: '5px',
        marginTop: '2px',
        outline: 'none',
        height: '25px'
    },
    secondMenu: {
        marginLeft: '50px',
        marginTop: '20px'
    },
    search: {
        float: 'left',
        marginLeft: '10px',
    },
    secondMenu: {
        position: 'absolute',
        width: '100%',
        top: '0px',
        left: '0',
        borderBottom: '1px solid #ccc',
        paddingTop: '20px',
        paddingBottom: '20px',
        paddingLeft: '50px',
        backgroundColor: '#ffffff',
        zIndex: 1,
    }
};

var search = React.createClass({
    getInitialState: function () {
        return {
            visible: false,
            sourceData: [],
            arr: ['ID', '主机名', 'IP', '机器ID', '系统UUID', '内核版本', '操作系统', 'CPU核数', 'CPU类型', 'CPU物理核', 'GCC版本', '虚拟化', '内存型号', '内存大小', '磁盘型号', '磁盘大小'].map((v, i) => {
                return {
                    name: v,
                    checked: i < 5
                }
            }),
        }
    },
    componentWillMount: function () {
        var that = this;
        ajax({
            headers: {
                'content-type': 'application/json'
            }
        })
            .get('/cmdb/batch/nodes?nodeid=1111')
            .then(function (res) {
                that.setState({
                    sourceData: res.items.map(function (item, index) {
                        return {
                            key: index,
                            'ID': item.externalID,
                            '主机名': item.hostname,
                            'IP': item.ip,
                            '机器ID': item.nodeInfo.machineID,
                            '系统UUID': item.nodeInfo.systemUUID,
                            '内核版本': item.nodeInfo.kernelVersion,
                            '操作系统': item.nodeInfo.osImage,
                            'CPU核数': item.nodeInfo.cpuCore,
                            'CPU类型': item.nodeInfo.cpuModel,
                            'CPU物理核': item.nodeInfo.cpuPhysical,
                            'GCC版本': item.nodeInfo.gccVersion,
                            '虚拟化': item.nodeInfo.virtualization,
                            '内存型号': item.nodeInfo.memModel,
                            '内存大小': item.nodeInfo.memSize,
                            '磁盘型号': item.nodeInfo.diskModel,
                            '磁盘大小': item.nodeInfo.diskSize,
                        }
                    }),
                });
            });
    },
    showModal(e) {
        this.setState({
            visible: true
        });
    },
    handleOk() {
        this.setState({
            visible: false
        });
    },
    handleCancel() {
        this.setState({
            visible: false
        });
    },
    onChange: function (index, e) {
        var {
            arr
        } = this.state;
        arr[index].checked = e.target.checked;
        this.setState({
            arr: arr
        });
    },

    render: function () {
        var {
            arr
        } = this.state;
        var {
            sourceData
        } = this.state;
        var menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1"><Link to="/mainengine">主机管理</Link></Menu.Item>
                <Menu.Item key="2">第二个菜单项</Menu.Item>
                <Menu.Item key="3">第三个菜单项</Menu.Item>
            </Menu>
        );

        const columns = arr.filter((v) => {
                return v.checked
            })
            .map(function (item, index) {
                return {
                    title: item.name,
                    dataIndex: item.name
                }
            });

        const pagination = {
            total: this.state.sourceData.length,
            current: 1,
            showSizeChanger: true
        };
        var a = 2;
        return (

            <div>
                <div className="topMenu" style={style.topMenu}>
                    <div style={style.dropBtn}>
                        <Button type="primary">查找</Button>
                    </div>
                    <div style={style.dropBtn}>
                        <input style={style.input} type="text"/>
                    </div>
                    <div style={style.dropBtn}>
                        <Button type="primary" onClick={this.showModal}>设置字段</Button>
                        <Modal title="设置显示字段名称" visible={this.state.visible}
                               onOk={this.handleOk} onCancel={this.handleCancel}
                               okText="OK" cancelText="Cancel">
                            {arr.map((v, i)=> {
                                return (
                                    <label key={i}>
                                        <Checkbox defaultChecked={v.checked} onChange={this.onChange.bind(this, i)}/>
                                        {v.name}
                                    </label>
                                )
                            })}
                        </Modal>
                    </div>
                    <div style={style.dropBtn}>
                        <Button type="primary">高级查询</Button>
                    </div>
                </div>
                <div style={style.table}>
                    {columns.length ?
                        <Table columns={columns} dataSource={this.state.sourceData} pagination={pagination}/> : null}
                </div>
            </div>
        );
    }
});

export default search;