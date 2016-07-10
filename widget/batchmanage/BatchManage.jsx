import React from 'react'
import ReactDOM,{render}from 'react-dom';
import {hashHistory, Router, Route, IndexRoute, Link}from 'react-router';
import {Menu, Dropdown,Button, Table, Icon,  Alert,Modal}from 'antd';
import ajax from '../../static/js/utils/ajax.js';
import '../../static/css/BatchManage.less';
var style = {
    submit: {
        marginTop: '70px',
        marginLeft: '60px',
    },
    input: {
        width: '500px',
        height: '200px',
        outline: 'none',
        borderRadius: '5px',
    },
    submitBtn: {
        marginTop: '10px',
        marginLeft: '60px'
    },
    message: {
        width: '500px',
    },
    table: {
        marginLeft: '55px',
        marginTop: '50px',
    },
}
var BatchManage = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    getInitialState: function () {
        return {
            message: '当前无操作',
            visible: false,
            dataInput: [],
            listShow: false,
            tableData: [],
        }
    },
    submit: function (e) {
        var value = this.refs.test.value;
        var arr = value.split('\n');
        var url = this.props.location.query.oprate === '1' ? '/cmdb/batch/nodename/' : '/cmdb/batch/nodes/';
        var that = this;
        ajax({
            headers: {
                'content-type': 'application/json'
            }
        })
            .get(url + encodeURIComponent(arr))
            .then(function (res) {
                that.setState({
                    dataInput: res.items,
                    visible: true,
                    listShow: true
                });
            });
    },
    deleteTableData: function (index) {
        var {tableData}=this.state;
        tableData.splice(index, 1);
        this.setState({
            tableData
        })
    },
    handleOk() {
        this.setState({
            visible: false,
            hide: 'hide',
            table: '',
        });
        var that = this;
        var successSubmit = [];
        var url = this.props.location.query.oprate === '1' ? '/cmdb/batch/nodename/' : '/cmdb/batch/nodes/';
        var data = {
            kind: "Batch",
            items: this.state.dataInput,
        }
        data = {"kind": "Batch", "items": ["1.1.1.1:virtual", "1.1.1.2:physical"]};
        ajax({
            headers: {
                'content-type': 'application/json'
                // 'application/x-www-form-urlencoded'
            }
        }).post(url, JSON.stringify(data))
            .then(function (res) {
                that.setState({
                    tableData: res.items.map(function (item, index) {
                        return that.props.location.query.oprate === '1'
                            ?
                        {
                            oldName: item.oldName,
                            newName: item.newName,
                            key: index,
                            msg: item.msg,
                        } :
                        {
                            ip: item.ip,
                            id: item.id,
                            key: index,
                            check: <Icon type="cross-circle-o" onClick={that.deleteTableData.bind(this, index)}/>
                        }
                    }),
                });
            });
    },
    handleCancel(e) {
        this.setState({
            visible: false
        });
    },
    delete(index){
        var {dataInput}=this.state;
        dataInput.splice(index, 1);
        this.setState({
            dataInput
        })
    },
    render: function () {

        const mainEngineColumns = [{
            title: '名称',
            dataIndex: 'ip'
        }, {
            title: '类型',
            dataIndex: 'type'
        }, {
            title: '操作',
            dataIndex: 'check'
        }];

        const checkColumns = [{
            title: '修改前名称',
            dataIndex: 'oldName'
        }, {
            title: '修改后名称',
            dataIndex: 'newName'
        }, {
            title: '状态',
            dataIndex: 'msg'
        }];

        const columns = this.props.location.query.oprate === '1' ? checkColumns : mainEngineColumns;

        const data = this.state.dataInput.map((item, index)=> {
            return (
                <p key={index}>{item.msg} <Icon type="cross-circle-o" onClick={this.delete.bind(this, index)}/></p>
            );
        });
        var {listShow}=this.state;
        return (
            <div>
                <div style={style.submit}>
                    <div className="message" style={style.message}>
                        <Alert message={this.props.location.query.the} type="info"/>
                    </div>
                    <textarea type='text' style={style.input} ref="test"></textarea>
                </div>

                <div className="submitBtn" style={style.submitBtn}>
                    <Button type="primary" onClick={this.submit}>提交数据</Button>
                    <div id="popwin">
                        <Modal title="第一个 Modal" visible={this.state.visible}
                               footer={[
				            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>,
				            <Button key="submit" type="primary" size="large" onClick={this.handleOk}>提交</Button>
				          ]}>
                            {data}
                        </Modal>
                    </div>
                </div>

                <div style={style.table}>
                    {columns.length ? <Table columns={columns} dataSource={this.state.tableData}/> : null}
                </div>
            </div>
        );
    },
});

export default BatchManage