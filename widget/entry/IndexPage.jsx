import React from 'react';
import classnames from 'classnames';
import {hashHistory, Router, Route, IndexRoute, Link}from 'react-router';
import {Menu, Dropdown,Icon}from 'antd';
import '../../static/css/IndexPage.less';
import Sidebar from '../sidebar/Sidebar.jsx';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const DropdownButton = Dropdown.Button;
import reqwest from 'reqwest'

var style = {
    userName:{
        float: 'right',
        marginLeft: '40px',
        marginRight: '40px'
    },

    dropBtn: {
        marginLeft: '20px',
        float: 'left',
    },

    content: {
        position: 'relative',
        display: '-webkit-flex',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: '20px',
    },
    left: {
        // position: 'absolute',
        position: 'relative',
        width: '200px',
        height: '800px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },

    body: {
        width: '198px',
        height: '800px',
        overflow: 'scroll',
    },

    right: {
        position: 'relative',
        flex: '1',
        height: '800px',
        overflow: 'hidden',
        overflowY: 'scroll',
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginLeft: '20px',
    },
    fold: {},
    treeTitle: {
        marginLeft: '10px',
        marginTop: '10px',
    },
    tree: {
        position: 'absolute',
        left: '20px',
    },
    btn: {
        backgroundColor: '#ffffff',
        zIndex: '10',
    }
}

var IndexPage = React.createClass({

    handleButtonClick: function (e) {
        console.log('click button', e);
    },

    handleMenuClick: function (e) {
        console.log('click', e.item.props.children.props.children);
        this.setState({
            name: e.item.props.children.props.children
        });
    },

    foldClick: function () {
        console.log(this.state.fold);
        this.setState({
            fold: this.state.fold === '' ? 'fold' : ''
        });
    },

    getInitialState: function () {
        return {
            fold: '',
            name: '主机管理',
            userName : ''
        }
    },

    responseHeader:function(){
        var me = this;
        reqwest({
            type:'HEAD',
            url:'/index.html',

        }).then(function(xhr){
            var name = xhr.getResponseHeader('UUAP-USERNAME');//UUAP-USERNAME
            me.setState({
                userName : name
            });
        });
    },

    componentDidMount: function () {
        document.getElementById('right').addEventListener('scroll', function () {
            console.log("scroll");
            document.getElementById('secondMenu').style.top = document.getElementById('right').scrollTop + 'px';
            if (document.getElementById('right').scrollTop > 5) {
                document.getElementById('secondMenu').style.boxShadow = '2px 2px 6px #999';
            } else {
                document.getElementById('secondMenu').style.boxShadow = 'none';
            }
        });
         this.responseHeader();
    },

    render: function () {
        var MenuDashBoard = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1"><Link to="/dashboard">DashBoard</Link></Menu.Item>
            </Menu>
        );
        var MenuResourse = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1"><Link to="/mainengine/search">主机管理</Link></Menu.Item>
            </Menu>
        );

        var MenuOnline = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1"><Link to="online/list">上线</Link></Menu.Item>
            </Menu>
        );

        //<Menu.Item key="mainengine">
            //<Link to="/mainengine/search"><Icon type="appstore" />CMDB</Link>
        //</Menu.Item>
        return (
            <div>
                <div className="content" style={style.content}>
                    <div className={classnames('left',this.state.fold)} style={style.left}>
                        <div className="foldTrigger" style={style.foldTrigger} onClick={this.foldClick}>
                            <div className="arrow">></div>
                        </div>
                        <div className="body" style={style.body}>
                            <div className="treeTitle" style={style.treeTitle}>服务树</div>
                            <Sidebar className="rree" style={style.tree}
                                  url="http://noah.baidu.com/service-tree/v1/node/200556136/children"></Sidebar>
                        </div>
                    </div>
                    <div className="right" id="right" style={style.right}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

export default IndexPage