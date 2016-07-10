import React from 'react'
import { render } from 'react-dom';
import {Router,Route,Link} from 'react-router'
import reqwest from 'reqwest'
import Utils from '../../static/js/utils/utils.js'



import { Table, Icon, Button, Modal, Form, Select, Input, Row, Col, message} from 'antd'

const Option = Select.Option;



var ProceStart = React.createClass({
	getInitialState() {
	    return {
	      ModalInfor: 'State信息',
	      ModalRelation: 'State流转关系',
	      inforLoading: false,
	      relaLoading: false,
	      visibleInfor: false,
	      visibleRelation: false,
	      n: 0,
	      infors: [],
	      newInfor: {
	      	id: "",
	      	type: "",
	      	name: "",
	      	group: {
	      		type: "",
	      		auditors: ""
	      	}
	      },
	      domInfor: {},
	      inforTypes: [{
			      	id: 1,
			      	name: '哈哈'
			      }, {
			      	id: 2,
			      	name: '黑哦'
			      }, {
			      	id: 3,
			      	name: '吼吼'
			      }],
		  relaTypes: [{
			      	id: 1,
			      	name: '哈哈'
			      }, {
			      	id: 2,
			      	name: '黑哦'
			      }, {
			      	id: 3,
			      	name: '吼吼'
			      }],
		  stateInfor: [{
					  key: '1',
					  id: '1',
					  type: 32,
					  name: '开始',
					  groupType: 'OR',
					  user: 'Tom'
					}],
	      stateRelation: [{
						  key: '1',
						  id: '1',
						  now_id: '1',
						  next_id: '2',
						  operate: 'Approve',
						  activity: 'Email'
						}]

	    };
	},
	showInfor() {
	    this.setState({
	      visibleInfor: true,
	      inforKey: Date.now()
	    });

	 //    reqwest({
		// 	type:'JSON',
		// 	url:'/hestia/order/commit',
		// 	method:'post',
		// 	headers:{
		// 		'HESTIA-USERNAME':me.props.userName
		// 	},
		// 	data :JSON.stringify({"data":data})
		// }).then(function(res){
		// 	if(res.status==200){
		// 		var result = JSON.parse(res.response);
		// 		if(result.errno==0){
		// 			message.success('回滚单创建完成');
		// 			//me.request();
		// 			me.props.showDetail(true)
		// 			location.hash='online/detail?orderId='+result.data.Id;
		// 			me.props.changeActivityTab();
		// 		}else{
		// 			message.error('回滚单创建失败  '+getErrorMsg(result.errno));
		// 		}
		// 	}
		// });






	},
	showRelation() {
		this.setState({
			visibleRelation: true,
			relationKey: Date.now()
		});
	},
	handleInforOk() {
	    this.setState({
	      visibleInfor: false
		});
	},
	handleRelaOk() {
		this.setState({
			visibleRelation: false
		});
	},
	handleInforCancel() {
	    console.log('点击了取消');
	    this.setState({
	      visibleInfor: false,
	    });
	},
	handleRelaCancel() {
		this.setState({
			visibleRelation: false
		});
	},
	inforAdding() {
		this.setState({
			inforLoading: true
		});
	},
	relaAdding() {
		this.setState({
			relaLoading: true
		});
	},
	handleChange(name,event) {
		if(name=="type"){
			this.state.newInfor.type = event;
			this.state.domInfor.type = event;
		}else if(name=="name"){
			this.state.newInfor.name = event.target.value;
			this.state.domInfor.name = event.target.value;

		}else if(name=="groupType"){
			this.state.newInfor.group.type = event;
			this.state.domInfor.type = event;

		}else if(name=="user"){
			this.state.newInfor.group.auditors = event.target.value;
			this.state.domInfor.user = event.target.value;

		}
		event.target.value="";
		console.log(this.state.domInfor);
	},
	saveInfor() {
		this.state.infors.push(this.state.newInfor);
		this.state.stateInfor.push(this.state.domInfor);
		var arr=this.state.stateInfor;
		console.log(this.state.infors);
		this.setState({
			domInfor: arr
		});
	},

	render: function(){

		const state1 = [{
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
			dataIndex: 'user',
			key: 'user'
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

		const state2 = [{
		  title: 'ID',
		  dataIndex: 'id',
		  key: 'id'
		}, {
		  title: '当前StateID',
		  dataIndex: 'now_id',
		  key: 'noe_id',
		}, {
		  title: '下一跳StateID',
		  dataIndex: 'next_id',
		  key: 'nexy_id',
		}, {
			title: '操作',
			dataIndex: 'operate',
			key: 'operate'
		}, {
			title: '活动',
			dataIndex: 'activity',
			key: 'activity'
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

		
		
		return (
			<div className="proce-start">
					<div className="ps-1">
						<span>新 建 自 定 义 流 程 模 板</span>
					</div><br/>

					<div className="ps-2">
						<span style={{color: '#f00', fontSize: '20px'}}>*</span>流程名称：<input type="text" placeholder="建议命名规则：产品(系统)名称 + 流程关键字 + 操作描述" />(限20字，且名称不能重复)
					</div><br/>

					<div className="ps-3">
						<dl>
							<dt><span style={{color: '#f00', fontSize: '20px'}}>*</span>申请内容：</dt>
							<dd id="ps3-t"><textarea></textarea></dd>
						</dl>
					</div><br/>

					<div className="ps-4">URL：<input type="text"/></div><br /><br />

					<div className="ps-5">
						<span>State节点：</span>
						<Table columns={state1} dataSource={this.state.stateInfor} pagination={false} />
						<Button type="primary" onClick={this.showInfor}>新增一行</Button>
						
							<Modal title="State信息"
					          visible={this.state.visibleInfor}
					          key={this.state.inforKey}
					          onCancel={this.handleInforCancel}
					          footer={[
					          	<Button key="add" loading={this.state.inforLoading} htmlType="submit" onClick={this.saveInfor}>保存并新增一行</Button>,
					          	<Button key="save" onClick={this.handleInforOk}>保存并完成</Button>,
					            <Button key="back" type="ghost" onClick={this.handleInforCancel}>取消</Button>,
					            
					            
					          ]}
					        >
					          <div className="ps5-1">
					          		<Row>
			                          <Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>类型：</Col>
			                          <Col span={'18'}>
			                              <Select placeholder="请选择" style={{width: '80%'}} onChange={this.handleChange.bind(this,'type')}>
					                            {this.state.inforTypes.map(function(result) {
					                              return <Option key={result.id} value={result.name}>{result.name}</Option>
					                          })}
				                          </Select>
			                          </Col>
			                        </Row>
			                        <div style={{height: '10px'}}></div>
			                        <Row>
			                          <Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>名称：</Col>
			                          <Col span={'18'} style={{width: '60%'}}><Input onChange={this.handleChange.bind(this,'name')}></Input></Col>
			                        </Row>
			                        <div style={{height: '10px'}}></div>
			                        <Row>
			                          <Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>审批组类型：</Col>
			                          <Col span={'18'} style={{width: '75%'}}>
				                            <Select placeholder="请选择" style={{width: '80%'}} onChange={this.handleChange.bind(this,'groupType')}>
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
			                          <Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>审批人：</Col>
			                          <Col span={'14'} style={{width: '50%'}}>
			                          	<Input onChange={this.handleChange.bind(this,'user')}></Input>
			                          </Col>
			                          <Col span={'4'}><Button style={{marginLeft: '15px'}}>增加</Button></Col>
			                        </Row>
			                        <div style={{height: '10px'}}></div>
						          	
						          	<Row>
						          		<Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>审批人组：</Col>
						          		<Col span={'18'} style={{width: '60%'}}>
				          					<Input type="textarea"/>
						          		</Col>
						          	</Row>
					          	

					          </div>
					          
					        </Modal>
					        
					</div><br /><br />

					<div className="ps-6">
						<span>State关系：</span>
						<Table columns={state2} dataSource={this.state.stateRelation} pagination={false} />
						<Button type="primary" onClick={this.showRelation}>新增一行</Button>

						<Modal title="State关系"
				          visible={this.state.visibleRelation}
				          key={this.state.relationKey}
				          onCancel={this.handleRelaCancel}
				          footer={[
				          	<Button key="add" loading={this.state.relaLoading} onClick={this.relaAdding}>保存并新增一行</Button>,
				          	<Button key="save" onClick={this.handleRelaOk}>保存并完成</Button>,
				            <Button key="back" type="ghost" onClick={this.handleRelaCancel}>取消</Button>,
				            
				            
				          ]}
				        >
				          <div className="ps5-1">
				          	<Row>
				          		<Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>类型：</Col>
				          		<Col span={'18'}>
				          		  <Select placeholder="请选择" style={{width: '80%'}}>
						            {this.state.relaTypes.map(function(result) {
						            	return <Option key={result.id}>{result.name}</Option>
							        })}
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
				          
				        </Modal>
						
					</div><br /><br /><br />

					<div className="ps-7">
						<Button>提交</Button><Button>取消</Button>
					</div>



				
			</div>
			
		)
	}
});



export default ProceStart