import React from 'react';
import {Affix,Menu,Carousel,Icon } from 'antd'
import { hashHistory, Router, Route, IndexRoute, Link, IndexLink,IndexRedirect} from 'react-router';
import 'home.less';
const SubMenu = Menu.SubMenu;
import reqwest from 'reqwest'


var Header = React.createClass({

	getInitialState: function () {
        return {
            userName : ''
        }
    },

    componentDidMount: function () {
         this.responseHeader();
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


	render : function(){
		var height = '50%';
		var right = 'right'
		var bgColor = '#51789f';
		
		
		return(
			<div>
			<div className="header">
				<div className='logo'><a href="/index.html"><img src="img/logo.png" /></a></div>
				<div className="menu">
					<Menu  mode="horizontal" style={{background:bgColor}}>
				        <Menu.Item key="mail" style={{float:right}}><Link to='/mainengine/batchmanage'>DashBoard</Link></Menu.Item>
				        <Menu.Item key="app"  style={{float:right}}  ><Link to='/online/list'>上线系统</Link></Menu.Item>
                        <Menu.Item key="workflow" style={{float:right}}> <Link to='/workflow/proceStart'>Workflow</Link></Menu.Item>
				    </Menu>
				</div>
				<div className="user-info">
                     <Menu mode="horizontal" style={{background:bgColor,color:'#fff'}} >
                        <SubMenu style={{float:right}} title={<span><Icon type="setting" />{this.state.userName}</span>} key="k">
                            <Menu.Item key="1">个人信息</Menu.Item>
                            <Menu.Item key="4"><a href='/logout'>退出</a></Menu.Item>
                        </SubMenu>
                     </Menu>
                </div>
			</div>
			<div id="lala">
				{this.props.children}
			</div>
			</div>
		)
	}
});  				


export default Header