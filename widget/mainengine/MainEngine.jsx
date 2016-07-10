import React from 'react'
import {hashHistory, Router, Route, IndexRoute, Link, IndexLink}from 'react-router';
import {Menu, Dropdown, Table, Icon, Modal, Button, Checkbox}from 'antd';
import '../../static/css/IndexPage.less';

var style = {
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

var MainEngine = React.createClass({

    mainEngine: function (e) {
        this.setState({
            message: '当前操作为主机录入'
        });
    },
    render: function () {
        return (

            <div>
                <div className="secondMenu" id="secondMenu" style={style.secondMenu}>
                    <div className="search" style={style.search}>
                        <Button type="primary"><Link style={{color: '#ffffff'}}
                                                     to="/mainengine/search">查询</Link></Button>
                    </div>
                    <div className="search" style={style.search}>
                        <Button type="primary" onClick={this.mainEngine}><Link style={{color: '#ffffff'}}
                                                                               to={{ pathname: '/mainengine/batchmanage', query: { the: '当前操作为主机录入', oprate: '0'} }}>主机录入</Link></Button>
                    </div>
                    <div className="search" style={style.search}>
                        <Button type="primary"><Link style={{color: '#ffffff'}}
                                                     to={{ pathname: '/mainengine/batchmanage', query: { the: '当前操作为修改主机' , oprate: '1'} }}>修改主机名</Link></Button>
                    </div>
                </div>
                <br/>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    },
});

export default MainEngine