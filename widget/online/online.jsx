import React from 'react'
import classnames from 'classnames';
import List from 'list.jsx'
import Detail from 'detail.jsx'
import Create from 'create.jsx'
import {Router,Route,Link} from 'react-router'
import reqwest from 'reqwest'
import {
	Tabs
}
from 'antd';

import 'online.less';
const TabPane = Tabs.TabPane;

var OnLine = React.createClass({
	componentDidMount:function(){
		this.changeActivityTab();
		this.responseHeader();
	},
	
	getInitialState:function(){
		return {
			activeKey : '0',
			isShowDetail : false,
			userName: ''
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

	changeActivityTab : function(){
		var hash = location.hash;
		if(hash.indexOf('create')>=0){
			this.setState({
				activeKey : '1'
			})
		}else if(hash.indexOf('list')>=0){
			this.setState({
				activeKey : '0'
			})
		}else if(hash.indexOf('back')>=0){
			this.setState({
				activeKey : '2'
			})
		}else if(hash.indexOf('detail')>=0){
			this.setState({
				activeKey : '3'
			})
		}
	},
	render: function () {
		var me = this;
		return (
			<div className="container">
				 {this.state.isShowDetail ?
				<Tabs type="card" onTabClick={this.tabClick} defaultActiveKey='1' activeKey={this.state.activeKey}>
					<TabPane tab="列表查询" key="0" >
			    		<List userName={this.state.userName} changeActivityTab={this.changeActivityTab} activeKey={this.state.activeKey} showDetail={this.showDetail}/>
				    </TabPane>
				    <TabPane tab="创建上线单" key="1">
				    	<Create  userName={this.state.userName} changeActivityTab={this.changeActivityTab} activeKey={this.state.activeKey} showDetail={this.showDetail}/>
				    </TabPane>
				    <TabPane tab="创建回滚单" key="2" >
				    	 <Create userName={this.state.userName}  changeActivityTab={this.changeActivityTab} activeKey={this.state.activeKey} showDetail={this.showDetail}/>
				    </TabPane>
				   <TabPane tab="上线/回滚单详情" key="3"  activeKey={this.state.activeKey}><Detail userName={this.state.userName} changeActivityTab={this.changeActivityTab} showDetail={this.showDetail}/></TabPane> 
				</Tabs>:
				<Tabs type="card" onTabClick={this.tabClick} defaultActiveKey='1' activeKey={this.state.activeKey}>
					<TabPane tab="列表查询" key="0" >
			    		<List userName={this.state.userName} changeActivityTab={this.changeActivityTab} activeKey={this.state.activeKey} showDetail={this.showDetail}/>
				    </TabPane>
				    <TabPane tab="创建上线单" key="1">
				    	<Create userName={this.state.userName} changeActivityTab={this.changeActivityTab} activeKey={this.state.activeKey} showDetail={this.showDetail}/>
				    </TabPane>
				    <TabPane tab="创建回滚单" key="2" >
				    	 <Create userName={this.state.userName} changeActivityTab={this.changeActivityTab} activeKey={this.state.activeKey} showDetail={this.showDetail}/>
				    </TabPane>
				</Tabs>
				} 
			</div>
		);
	},

	showDetail:function(val){
		this.setState({
			isShowDetail : val
		})
	},

	tabClick:function(key){
		
		if(key=='0'){
			location.hash="online/list"
		}else if(key=='1'){
			location.hash="online/create"
		}else if(key=='2'){
			location.hash="online/back"
		}else if(key=='3'){
			location.hash="online/detail"
		}else{
			location.hash='online/detail'
		}

		this.changeActivityTab()
	}
});

export default OnLine