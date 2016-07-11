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
	saveName(event) {
		this.state.domInfor.name = event.target.value;
		this.state.newInfor.name = event.target.value;
	},
	addUser() {
		var domUser = "";
		if(this.refs.user.refs.input.value){
			var me = this;
			this.state.newInfor.group.auditors.push(this.refs.user.refs.input.value);
			this.state.newInfor.group.auditors.map(function(res){
				domUser += res+',';
			});
			this.state.domInfor.users = domUser.substr(0,domUser.length-1);
			domUser = "";
			this.refs.user.refs.input.value = "";
			this.forceUpdate();
		}else{
			message.error('用户名不能为空');
		}
	},

	render : function(){
		return(
			<div className="ps5-1" ref={this.state.domInfor}>
          		<Row>
                  <Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>类型：</Col>
                  <Col span={'18'}>
                      <Select placeholder="请选择" style={{width: '80%'}} onChange={this.handleChange.bind(this,'type')}>
                            {this.props.inforType.map(function(res,index){
					            return <Option key={index} value={res.type}>{res.type}</Option>

                            })}
                      </Select>
                  </Col>
                </Row>
                <div style={{height: '10px'}}></div>
                <Row>
                  <Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>名称：</Col>
                  <Col span={'18'} style={{width: '60%'}}><Input ref="name" onChange={this.saveName}></Input></Col>
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
	getInitialState() {
		return {
			domRela: {
				key: '',
		        id: '',
		        curstateid: '',
		        nextstateid: '',
		        action: '',
		        activities: '',
		        users: '',
		        message: ''
			},
			newRela: {
				id: '',
		        CurStateId: '',
		        Action: '',
		        NextStateId: '',
		        Activities: [
		            {
		                type: '',
		                users: [],
		                Message: ''
		            }
		        ]
		    },
		    activities: []
		}
	},
	handleChange(name,event) {
		if(name=="nowId"){
	        this.state.newRela.CurStateId = event;
	        this.state.domRela.curstateid = event;
	    }else if(name=="nextId"){
	        this.state.newRela.NextStateId = event.target.value;
	        this.state.domRela.nextstateid = event.target.value;
	    }else if(name=="action"){
	        this.state.newRela.Action = event;
	        this.state.domRela.action = event;
	    }else if(name=="activity"){
	    	this.state.domRela.activities = event;
	    }else if(name=="message"){
	        this.state.newRela.Activities[0].Message = event.target.value;
	        this.state.domRela.message = event.target.value;
	    }

	},
	addActivity() {
		this.state.activities.push(this.state.domRela.activities);
		this.forceUpdate();
	},
	addUser() {
		if(this.refs.user.refs.input.value){
			this.state.domRela.users += this.refs.user.refs.input.value + ",";
			// this.state.domRela.users = this.state.domRela.users.substr(0,this.state.domRela.users.length-1);
			this.state.newRela.Activities[0].users.push(this.refs.user.refs.input.value); 
		}else{
			message.error('用户名不能为空');
		}
		console.log(this.state.domRela.users);
		console.log(this.state.newRela.Activities[0].users);
		this.refs.user.refs.input.value="";
		this.forceUpdate();
	},
	render : function(){
		return(
			<div className="ps5-1">
	          	<Row>
	          		<Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>当前StateID：</Col>
	          		<Col span={'18'}>
	          		  <Select placeholder="请选择" style={{width: '80%'}} onChange={this.handleChange.bind(this,'nowId')}>
			        		{this.props.startIds.map(function(res,index){
			        			return <Option key={index} value={res}>{res}</Option>
			        		})}
			          </Select>
	          		</Col>
	          	</Row>
	          	<div style={{height: '10px'}}></div>
	          	<Row>
	          		<Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>下一跳节点ID：</Col>
	          		<Col span={'18'} style={{width: '60%'}}><Input onChange={this.handleChange.bind(this,'nextId')}></Input></Col>
	          	</Row>
	          	<div style={{height: '10px'}}></div>
	          	<Row>
	          		<Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>操作：</Col>
	          		<Col span={'18'} style={{width: '75%'}}>
	          			<Select placeholder="请选择" style={{width: '80%'}} onChange={this.handleChange.bind(this,'action')}>
	          				{this.props.actionType.map(function(res,index){
	          					return <Option key={index} value={res.type}>{res.type}</Option>
	          				})}
				        </Select>
	          		</Col>
	          	</Row>
	          	<div style={{height: '10px'}}></div>
	          	<Row>
	          		<Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>活动：</Col>
	          		<Col span={'14'} style={{width: '50%'}}>
	          			<Select placeholder="请选择" style={{width: '100%'}} onChange={this.handleChange.bind(this,'activity')}>
	          				{this.props.activityType.map(function(res,index){
				            	return <Option key={index} value={res.type}>{res.type}</Option>
	          				})}
				        </Select>
	          		</Col>
	          		<Col span={'4'}><Button style={{marginLeft: '15px'}} onClick={this.addActivity}>添加</Button></Col>
	          	</Row>
	          	<div style={{height: '10px'}}></div>
	          	<Row>
	          		<Col span={'6'}>&nbsp;</Col>
	          		<Col span={'18'} style={{width: '60%'}}>
	          			{this.state.activities.map(function(res,index){
	          				return <Button key={index}>{res}</Button>
	          			})}
	          		</Col>
	          	</Row>
	          	<div style={{height: '10px'}}></div>
	          	<Row>
	          		<Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>用户：</Col>
	          		<Col span={'14'} style={{width: '50%'}}>
	          			<Input ref="user"/>
	          		</Col>
	          		<Col span={'4'}><Button style={{marginLeft: '15px'}} onClick={this.addUser}>添加</Button></Col>
	          	</Row>
	          	<div style={{height: '10px'}}></div>
	          	<Row>
	          		<Col span={'6'}>&nbsp;</Col>
	          		<Col span={'18'} style={{width: '60%'}}>
	          			{this.state.newRela.Activities[0].users.map(function(res,index){
	          				return <Button key={index}>{res}</Button>
	          			})}
	          		</Col>
	          	</Row>
	          	<div style={{height: '10px'}}></div>
	          	<Row>
	          		<Col span={'6'} style={{textAlign: 'center', lineHeight: '28px'}}>消息：</Col>
	          		<Col span={'18'} style={{width: '60%'}}>
	          			<Input type="textarea" onChange={this.handleChange.bind(this,'message')}/>
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
			actionType: [],
			activityType: [],
			startIds: [],
	      	visibleRela: false,
	      	n: 0,m: 0,
	      	states: [],
	      	transactions: [],
	      	inforData : [],
			relaData : [],
		}

	},
	showInfor() {
		var me=this;
		Promise.all([
			reqwest({
				type:'JSON',
				url:'/v1/statetype/',
				method:'get',
				headers:{
					'HESTIA-USERNAME': 'dong'
				}
			}).then(function(res){
				if(res.status==200){
					var result = JSON.parse(res.response);
					if(result.errno==0){
						return result;
					}
				}
			}),
			reqwest({
				type:'JSON',
				url:'/v1/grouptype/',
				method:'get',
				headers:{
					'HESTIA-USERNAME': 'dong'
				}
			}).then(function(res){
				if(res.status==200){
					var result = JSON.parse(res.response);
					if(result.errno==0){
						return result;
					}
				}
			})


		]).then(function(result){
			me.setState({
			  inforType: result[0].data,
			  inforGroupType: result[1].data,
		      visibleInfor: true,
		      inforKey: Date.now()
		    });
		});
		
	},
	handleInforCancel() {
	    this.setState({
	      visibleInfor: false,
	    });
	},
	showRela() {
		var me=this;
		Promise.all([
			reqwest({
				type:'JSON',
				url:'/v1/actiontype/',
				method:'get',
				headers:{
					'HESTIA-USERNAME': 'dong'
				}
			}).then(function(res){
				if(res.status==200){
					var result = JSON.parse(res.response);
					if(result.errno==0){
						return result;
					}
				}
			}),
			reqwest({
				type:'JSON',
				url:'/v1/activitytype/',
				method:'get',
				headers:{
					'HESTIA-USERNAME': 'dong'
				}
			}).then(function(res){
				if(res.status==200){
					var result = JSON.parse(res.response);
					if(result.errno==0){
						return result;
					}
				}
			}),

			new Promise(resolve => {
				var ids=[];
		        this.state.inforData.map(function(res){
		        	ids.push(res.id);
		        });
		        resolve(ids);
		    }),



		]).then(function(result){
			me.setState({
			  actionType: result[0].data,
			  activityType: result[1].data,
			  startIds: result[2],
		      visibleRela: true,
			  relationKey: Date.now()
		    });
		});

	},
	handleRelaCancel() {
		this.setState({
			visibleRela: false
		});
	},
	getInfor() {
		this.state.n = this.state.n + 1;
		this.refs.getInfor.state.domInfor.key = this.state.n;
		this.refs.getInfor.state.domInfor.id = this.state.n;
		this.refs.getInfor.state.newInfor.id = this.state.n;
		this.state.inforData.push(this.refs.getInfor.state.domInfor);
		this.state.states.push(this.refs.getInfor.state.newInfor);
		this.refs.getInfor.refs.name.refs.input.value = "";

		this.refs.getInfor.state.domInfor = {key: '',id: '',type: '',name: '',groupType: '',users: ''};
		this.refs.getInfor.state.newInfor = {id: '',type: '',name: '',group: {type: '',auditors: []}};

		this.setState({
	      inforKey: Date.now(),
	      visibleInfor: true,
	    });
	},
	editInfor(id) {
		alert(id);
	},
	delInfor(id){
		alert(id);
	},
	getRela() {

		function isClass(o){
		    if(o===null) return "Null";
		    if(o===undefined) return "Undefined";
		    return Object.prototype.toString.call(o).slice(8,-1);
		}

		function deepClone(obj){
		    var result,oClass=isClass(obj);
		        //确定result的类型
		    if(oClass==="Object"){
		        result={};
		    }else if(oClass==="Array"){
		        result=[];
		    }else{
		        return obj;
		    }
		    var key;
		    for(key in obj){
		        var copy=obj[key];
		        if(isClass(copy)=="Object"){
		            result[key]=arguments.callee(copy);//递归调用
		        }else if(isClass(copy)=="Array"){
		            result[key]=arguments.callee(copy);
		        }else{
		            result[key]=obj[key];
		        }
		    }
		    return result;
		}

		var me=this;
		
		this.refs.getRela.state.activities.map(function(res){
			me.state.m = me.state.m + 1;
			me.refs.getRela.state.domRela.key = me.state.m;
			me.refs.getRela.state.domRela.id = me.state.m;
			me.refs.getRela.state.domRela.activities = res;
			console.log(deepClone(me.refs.getRela.state.domRela));
			me.state.relaData.push(deepClone(me.refs.getRela.state.domRela));

			me.refs.getRela.state.newRela.id = me.state.m;
			me.refs.getRela.state.newRela.Activities[0].type = res;
			me.state.transactions.push(me.refs.getRela.state.newRela);
		});
		// console.log(me.state.relaData);
		console.log(this.state.transactions);

		this.refs.getRela.state.domRela = {key: '',id: '',curstateid: '',nextstateid: '',action: '',activities: '',users: '',message: ''};
		this.refs.getRela.state.newRela = {id: '',CurStateId: '',Action: '',NextStateId: '',Activities: [{type: '',users: [],Message: ''}]};

		this.setState({
	      relaKey: Date.now(),
	      visibleRela: true,
	    });

	},
	editRela(id){
		alert(id);
	},
	delRela(id){
		alert(id);
	},
	submit() {
		var obj = {
			name: this.refs.name.refs.input.value,
			content: this.refs.content.refs.input.value,
			url: this.refs.url.refs.input.value,
			states: this.state.states,
			transactions: this.state.transactions
		}
		console.log(obj);
	},
	render : function(){
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
		      <a href="javascript:;" style={{paddingRight: '10px'}} onClick={()=>this.editInfor(record.id)}><Icon type="edit"/></a>
		      <span className="ant-divider"></span>
		      <a href="javascript:;" style={{paddingLeft: '10px'}} onClick={()=>this.delInfor(record.id)}><Icon type="delete"/></a>
		      
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
			title: '用户',
			dataIndex: 'users',
			key: 'users'
		}, {
			title: '消息',
			dataIndex: 'message',
			key: 'message'
		}, {
		  title: 'Operation',
		  key: 'operation',
		  render: (text, record) => (
		    <span>
		      <a href="javascript:;" style={{paddingRight: '10px'}} onClick={()=>this.editRela(record.id)}><Icon type="edit" /></a>
		      <span className="ant-divider"></span>
		      <a href="javascript:;" style={{paddingLeft: '10px'}} onClick={()=>this.delRela(record.id)}><Icon type="delete" /></a>
		      
		    </span>
		  ),
		}];
		
		return (
			<div className="define-proce">	
				<div style={{height: '10px'}}></div>
				<Row>
			      <Col span="3" style={style.cenlin}>*流程名称：</Col>
			      <Col span="8"><Input placeholder="建议命名规则：产品(系统)名称 + 流程关键字 + 操作描述" ref="name"/></Col>
			      <Col span="13" style={{lineHeight: '40px'}}>(限20字，且名字不能重复)</Col>
			    </Row>
			    <Row>
			    	<Col span="3" style={style.cenlin}><span>*</span>申请内容：</Col>
			      <Col span="8"><Input type="textarea" style={{heght: '600px'}} ref="content"/></Col>
			    </Row>
			    <div style={{height: '10px'}}></div>
			    <Row>
			      <Col span="3" style={style.cenlin}>URL：</Col>
			      <Col span="8"><Input ref="url"/></Col>
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
			          	<Button key="add" onClick={this.getInfor}>保存并新增一行</Button>,
			          	<Button key="save" >保存并完成</Button>,
			            <Button key="back" type="ghost" onClick={this.handleInforCancel}>取消</Button>,
			            
			            
			          ]}
			        >
			        	<StateInfor ref='getInfor' inforType={this.state.inforType} inforGroupType={this.state.inforGroupType}/>
					</Modal>
			    </Row>
			    <div style={{height: '40px'}}></div>

				<Row>
				  <Col span="2" style={{textAlign: 'left',lineHeight: '28px'}}>State流转关系：</Col>
			    </Row>

				<Row>
					<Col span="24">
						<Table rowKey={record => record.id} columns={relaColumns} dataSource={this.state.relaData} pagination={false}/>
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
			          	<Button key="add" onClick={this.getRela}>保存并新增一行</Button>,
			          	<Button key="save" >保存并完成</Button>,
			            <Button key="back" type="ghost" onClick={this.handleRelaCancel}>取消</Button>,
			            
			            
			          ]}
			        >
						<StateRela ref="getRela" actionType={this.state.actionType} activityType={this.state.activityType} startIds={this.state.startIds}/>
					</Modal>
			    </Row>
			    <div style={{height: '50px'}}></div>

			    <Row>
			    	<Col span="2" offset="8"><Button onClick={this.submit}>提交</Button></Col>
			    	<Col span="2" offset="2"><Button>取消</Button></Col>
			    </Row>
				
			</div>
		)
	}
		
	
});



export default DefineProce