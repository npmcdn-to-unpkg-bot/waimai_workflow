import React from 'react'
import { render } from 'react-dom';
import {Router,Route,Link} from 'react-router'
import reqwest from 'reqwest'
import Utils from '../../static/js/utils/utils.js'


import { Table, Icon, Button, Modal, Form, Select, Input, Row, Col, message} from 'antd'

const Option = Select.Option;
var style={
		cenlin:{
			textAlign: 'center',
			lineHeight: '28px'
		}

	};
const inforColumns = [{
	  title: 'ID',
	  dataIndex: 'id',
	  key: 'id'
	}, {
	  title: 'Type',
	  dataIndex: 'type',
	  key: 'type',
	}, {
	  title: 'Name',
	  dataIndex: 'name',
	  key: 'name',
	}, {
		title: 'Group Type',
		dataIndex: 'groupType',
		key: 'groupType'
	}, {
		title: 'Users',
		dataIndex: 'users',
		key: 'users'
	}, {
	  title: 'Operation',
	  key: 'operation',
	  render: (text, record) => (
	    <span>
	      <a href="javascript:;" style={{paddingRight: '10px'}}><Icon type="edit" /></a>
	      <span className="ant-divider"></span>
	      <a href="javascript:;" style={{paddingLeft: '10px'}}><Icon type="delete" /></a>
	      
	    </span>
	  ),
	}];


const relaColumns = [{
	  title: 'ID',
	  dataIndex: 'id',
	  key: 'id'
	}, {
	  title: '当前StateID',
	  dataIndex: 'curstateid',
	  key: 'curstateid',
	}, {
	  title: '下一跳StateID',
	  dataIndex: 'nextstateid',
	  key: 'nextstateid',
	}, {
		title: '操作',
		dataIndex: 'action',
		key: 'action'
	}, {
		title: '活动',
		dataIndex: 'activities',
		key: 'activities'
	}, {
	  title: 'Operation',
	  key: 'operation',
	  render: (text, record) => (
	    <span>
	      <a href="javascript:;" style={{paddingRight: '10px'}}><Icon type="edit" /></a>
	      <span className="ant-divider"></span>
	      <a href="javascript:;" style={{paddingLeft: '10px'}}><Icon type="delete" /></a>
	      
	    </span>
	  ),
	}];


var StateInfor = React.createClass({
	getInitialState() {
		return {
			domInfor: {
				key: '',
				id: '',
				type: '',
				name: '',
				groupType: '',
				users: ''
			},
			newInfor: {
				id: '',
				type: '',
				name: '',
				group: {
					type: '',
					auditors: []
				}

			}

		}

	},
	handleChange(name,event) {
		if(name=="type"){
			this.state.newInfor.type = event;
			this.state.domInfor.type = event;
		}else if(name=="groupType"){
			this.state.newInfor.group.type = event;
			this.state.domInfor.groupType = event;
		}
	},
	addUser() {
		if(this.refs.user.refs.input.value){
			var me = this;
			this.state.newInfor.group.auditors.push(this.refs.user.refs.input.value);
			this.state.newInfor.group.auditors.map(function(res){
				me.state.domInfor.users = res+',';
			});
			this.state.domInfor.users = this.state.domInfor.users.substr(0,this.state.domInfor.users.length-1);
			this.refs.user.refs.input.value = "";
			this.forceUpdate();
		}else{
			message.error('用户名不能为空');
		}
	},

	render : function(){
		return(
			<div className="ps5-1">
          		<Row>
                  <Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>类型：</Col>
                  <Col span={'18'}>
                      <Select placeholder="请选择" style={{width: '80%'}} onChange={this.handleChange.bind(this,'groupType')}>
                            {this.props.inforType.map(function(res,index){
					            return <Option key={index} value={res.type}>{res.type}</Option>

                            })}
                      </Select>
                  </Col>
                </Row>
                <div style={{height: '10px'}}></div>
                <Row>
                  <Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>名称：</Col>
                  <Col span={'18'} style={{width: '60%'}}><Input ref="name"></Input></Col>
                </Row>
                <div style={{height: '10px'}}></div>
                <Row>
                  <Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>审批组类型：</Col>
                  <Col span={'18'} style={{width: '75%'}}>
                        <Select placeholder="请选择" style={{width: '80%'}} onChange={this.handleChange.bind(this,'groupType')}>
                        	{this.props.inforGroupType.map(function(res,index){
                        		return <Option key={index} value={res.type}>{res.type}</Option>
                        	})}
                        </Select>
                      	
                  </Col>
                </Row>
                <div style={{height: '10px'}}></div>
                <Row>
                  <Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>审批人：</Col>
                  <Col span={'14'} style={{width: '50%'}}>
                  	<Input ref="user"></Input>
                  </Col>
                  <Col span={'4'}><Button onClick={this.addUser} style={{marginLeft: '15px'}}>增加</Button></Col>
                </Row>
                <div style={{height: '10px'}}></div>
	          	
	          	<Row>
	          		<Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>审批人组：</Col>
	          		<Col span={'18'} style={{width: '60%'}}>
      					{this.state.newInfor.group.auditors.map(function(res,index){
      						return <Button key={index}>{res}</Button>	
      					})}
	          		</Col>
	          	</Row>
          	

        	</div>

		)
		
	}

});

var StateRela = React.createClass({
	render : function(){
		return(
			<div className="ps5-1">
	          	<Row>
	          		<Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>类型：</Col>
	          		<Col span={'18'}>
	          		  <Select placeholder="请选择" style={{width: '80%'}}>
			            
			          </Select>
	          		</Col>
	          	</Row>
	          	<div style={{height: '10px'}}></div>
	          	<Row>
	          		<Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>名称：</Col>
	          		<Col span={'18'} style={{width: '60%'}}><Input></Input></Col>
	          	</Row>
	          	<div style={{height: '10px'}}></div>
	          	<Row>
	          		<Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>用户组类型：</Col>
	          		<Col span={'18'} style={{width: '75%'}}>
	          			<Select placeholder="请选择" style={{width: '80%'}}>
				            <Option value="china">中国</Option>
				            <Option value="use">美国</Option>
				            <Option value="japan">日本</Option>
				            <Option value="korean">韩国</Option>
				            <Option value="Thailand">泰国</Option>
				        </Select>
	          		</Col>
	          	</Row>
	          	<div style={{height: '10px'}}></div>
	          	<Row>
	          		<Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>用户：</Col>
	          		<Col span={'14'} style={{width: '50%'}}>
	          			<Input></Input>
	          		</Col>
	          		<Col span={'4'}><Button style={{marginLeft: '15px'}}>提交</Button></Col>
	          	</Row>
	          	<div style={{height: '10px'}}></div>
	          	<Row>
	          		<Col span={'6'}>&nbsp;</Col>
	          		<Col span={'18'} style={{width: '60%'}}>
	          			<Input type="textarea"/>
	          		</Col>
	          	</Row>
	          	

	          	  
	        </div>

		)
	}
});

var DefineProce = React.createClass({
	getInitialState() {
		return {
			inforKey: Date.now(),
			relaKey: Date.now(),
			visibleInfor: false,
			inforType: [],
			inforGroupType: [],
	      	visibleRela: false,
	      	states: [],
	      	transactions: [],
	      	inforData : [{
				  key: '1',
				  id: '1',
				  type: 'start',
				  name: '开始',
				  groupType: 'or',
				  users: 'tom',
				}],
			relaData : [{
				key: '1',
				id: '1',
				curstateid: '1',
				nextstateid: '1',
				action: 'approve',
				activities: 'email'

			}],
		}

	},
	showInfor() {
		var me=this;
		// Promise.all([
		// 	reqwest({
		// 		type:'JSON',
		// 		url:'/v1/statetype/',
		// 		method:'get',
		// 		headers:{
		// 			'HESTIA-USERNAME': 'dong'
		// 		}
		// 	}).then(function(res){
		// 		if(res.status==200){
		// 			var result = JSON.parse(res.response);
		// 			if(result.errno==0){
		// 				return result;
		// 			}
		// 		}
		// 	}),
		// 	reqwest({
		// 		type:'JSON',
		// 		url:'/v1/grouptype/',
		// 		method:'get',
		// 		headers:{
		// 			'HESTIA-USERNAME': 'dong'
		// 		}
		// 	}).then(function(res){
		// 		if(res.status==200){
		// 			var result = JSON.parse(res.response);
		// 			if(result.errno==0){
		// 				return result;
		// 			}
		// 		}
		// 	})


		// ]).then(function(result){
		// 	me.setState({
		// 	  inforType: result[0].data,
		// 	  inforGroupType: result[1].data,
		//       visibleInfor: true,
		//       inforKey: Date.now()
		//     });
		// });
		this.setState({
	      inforType: [{type: '1'},{type: '2'}],
	      inforGroupType: [{type: '1'},{type: '2'}],
	      inforKey: Date.now(),
	      visibleInfor: true,
	    });
	    
	},
	handleInforCancel() {
	    this.setState({
	      visibleInfor: false,
	    });
	},
	showRela() {
		this.setState({
			visibleRela: true,
			relationKey: Date.now()
		});
	},
	handleRelaCancel() {
		this.setState({
			visibleRela: false
		});
	},
	

	
		
	render : function(){
		
		return (
			<div className="define-proce">	
				<div style={{height: '10px'}}></div>
				<Row>
			      <Col span="3" style={style.cenlin}>*流程名称：</Col>
			      <Col span="8"><Input placeholder="建议命名规则：产品(系统)名称 + 流程关键字 + 操作描述" /></Col>
			      <Col span="13" style={{lineHeight: '40px'}}>(限20字，且名字不能重复)</Col>
			    </Row>
			    <Row>
			    	<Col span="3" style={style.cenlin}><span>*</span>申请内容：</Col>
			      <Col span="8"><Input type="textarea" style={{heght: '600px'}}/></Col>
			    </Row>
			    <div style={{height: '10px'}}></div>
			    <Row>
			      <Col span="3" style={style	.cenlin}>URL：</Col>
			      <Col span="8"><Input /></Col>
			    </Row>
			    <div style={{height: '10px'}}></div>

			    <Row>
				  <Col span="2" style={{textAlign: 'left',lineHeight: '28px'}}>State节点：</Col>
			    </Row>
				<Row>
					<Col span="24">
						<Table columns={inforColumns} dataSource={this.state.inforData} pagination={false}/>
					</Col>
				</Row>
			    <div style={{height: '10px'}}></div>

				<Row>
			    	<Col span="2" offset="1"><Button onClick={this.showInfor}>新增一行</Button></Col>
			    	<Modal title="State信息"
			          visible={this.state.visibleInfor}
			          key={this.state.inforKey}
			          onCancel={this.handleInforCancel}
			          footer={[
			          	<Button key="add" >保存并新增一行</Button>,
			          	<Button key="save" >保存并完成</Button>,
			            <Button key="back" type="ghost" onClick={this.handleInforCancel}>取消</Button>,
			            
			            
			          ]}
			        >
			        	<StateInfor  inforType={this.state.inforType} inforGroupType={this.state.inforGroupType}/>
					</Modal>
			    </Row>
			    <div style={{height: '40px'}}></div>

				<Row>
				  <Col span="2" style={{textAlign: 'left',lineHeight: '28px'}}>State流转关系：</Col>
			    </Row>

				<Row>
					<Col span="24">
						<Table columns={relaColumns} dataSource={this.state.relaData} pagination={false}/>
					</Col>
				</Row>
			    <div style={{height: '10px'}}></div>

				<Row>
			    	<Col span="2" offset="1"><Button onClick={this.showRela}>新增一行</Button></Col>
			    	<Modal title="State流转关系"
			          visible={this.state.visibleRela}
			          key={this.state.relaKey}
			          onCancel={this.handleRelaCancel}
			          footer={[
			          	<Button key="add" >保存并新增一行</Button>,
			          	<Button key="save" >保存并完成</Button>,
			            <Button key="back" type="ghost" onClick={this.handleRelaCancel}>取消</Button>,
			            
			            
			          ]}
			        >
						<StateRela/>
					</Modal>
			    </Row>
				
			</div>
		)
	}
		
	
});



export default DefineProce