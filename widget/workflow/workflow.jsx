import React from 'react'
import { render } from 'react-dom';
import {Router,Route,Link} from 'react-router'
import reqwest from 'reqwest'
import { Tabs } from 'antd';
import 'workflow.less';
import ProceStart from 'procedureStart.jsx';
import OwnProce from 'ownProce.jsx';
import DefineProce from 'defineProce';
import PendingProce from 'pendingProce';

const TabPane = Tabs.TabPane;

var WorkFlow = React.createClass({


	componentDidMount:function(){
		this.changeActivityTab();
	},
	
	getInitialState:function(){
		return {
			activeKey : '1'
 		}
	},

	changeActivityTab : function(){
		var hash = location.hash;
		if(hash.indexOf('proceStart')>=0){
			this.setState({
				activeKey : '0'
			})
		}else if(hash.indexOf('ownProce')>=0){
			this.setState({
				activeKey : '1'
			})
		}else if(hash.indexOf('pendingProce')>=0){
			this.setState({
				activeKey : '2'
			})
		}else if(hash.indexOf('defineProce')>=0){
			this.setState({
				activeKey : '3'
			})
		}
	},

	render: function(){
		return (
			<div className="container">
				<Tabs type="card" onTabClick={this.tabClick} defaultActiveKey='0' activeKey={this.state.activeKey}>
					<TabPane tab="流程发起" key="0" >
						<ProceStart></ProceStart>
				    </TabPane>
				    <TabPane tab="我的流程" key="1">
				    	<OwnProce></OwnProce>
				    </TabPane>
				    <TabPane tab="待处理流程" key="2" >
				    	<PendingProce></PendingProce>
				    </TabPane>
				    <TabPane tab="自定义流程管理" key="3" >
				    	<DefineProce></DefineProce>
				    </TabPane>
				</Tabs>
			</div>
			
			)
	},


	tabClick:function(key){
		// console.log(key);
		
		if(key=='0'){
			location.hash="workflow/proceStart"
		}else if(key=='1'){
			location.hash="workflow/ownProce"
		}else if(key=='2'){
			location.hash="workflow/pendingProce"

		}else if(key=='3'){
			location.hash="workflow/defineProce"

		}else{
			location.hash='workflow/ownProce'
		}

		this.changeActivityTab()
	}
});

export default WorkFlow