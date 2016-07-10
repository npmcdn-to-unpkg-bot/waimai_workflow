import React from 'react'
import {Tag,Select,Row, Col,Input,Button,DatePicker,Table ,message } from 'antd';
import reqwest from 'reqwest'
import {Router,Route,Link} from 'react-router'
var ReactDom = require('react-dom');
const Option = Select.Option;
import Utils from '../../static/js/utils/utils.js'
import getErrorMsg from 'errno.js'

var Filter = React.createClass({

	componentWillReceiveProps:function(){	
		this.props.requestData(this.requestData());
	},

	componentDidMount:function(){
		this.props.requestData(this.requestData());
	},

	getInitialState:function(){
		var today = new Date().getTime();
		return {
			show:{
				showDate : false,
				showSelect :false,
				showExecute : false,
				showAll :false,
				showCreate:false,
				showStatus : false
			},
			starttime: today,
			endtime:today,
			choose : "showAll",
			select : 'all',
			status : 'all',
			mine :'mine'
		}
	},

	requestData:function(){
		var search = this.props.search;
		var me = this;
		var name = me.refs.man.refs.input.value;
		var data = {}
		var choose = this.state.choose
		if(choose=='showSelect'){
			data.type = this.state.select
		}else if(choose=='showCreate'){
			data.type = 'createUser'
			data.username = name
		}else if(choose=='showExecute'){
			data.type = 'operationUser'
			data.username = name;
		}else if(choose =='showDate'){
			data.type="time";
			data['time_section'] = this.state.starttime+","+this.state.endtime
		}else if(choose =="showStatus"){
			data.type='menuStatus'
			if(this.state.status=='all'){
				data.type='all'
			}else{
				data.status = this.state.status
			}
		}else if(choose=="showAll"){
			data.type='all'
		}else{
			data.type = this.state.select
		}
		return data;
	},
	render:function(){
		var show = this.state.show;

		const disabledDate = function (current) {
		  return current && current.getTime() > Date.now();
		};
		return (
			<div className="list">
				<Row>
					<Col span="24">

						<Col span="3"><Button type="ghost" onClick={()=>{this.request('mine')}}>本人订单</Button></Col>
						<Col span="3">
							<Select defaultValue="showAll" onSelect={this.chooseSelect} style={{ width: 120 }}>
						      <Option value="showAll">全部</Option>
						      <Option value="showCreate">创建者</Option>
						      <Option value="showExecute">执行者</Option>
						      <Option value="showDate">时间段</Option>
						      <Option value="showSelect">类型</Option>
						      <Option value="showStatus">状态</Option>
						    </Select>
					    </Col>
					    <Col span="5" className={show.showCreate || show.showExecute ? "show":"hidden"}>
					    	<Col span="22">
					    	<Input id="defaultInput" placeholder="eg:(xxx_iwm)" ref="man"/>
					    	</Col>
					    </Col>
					    <Col span="5" className={show.showSelect? "show":"hidden"}>
					    	<Col span="22">
					    	<Select defaultValue="all" style={{ width: 120 }} onChange={this.onSelectChange}>
					    		<Option value="all">全部</Option>
					    		<Option value="online">上线单</Option>
						      	<Option value="rollback">回滚单</Option>
						    </Select>
					    	</Col>
					    </Col>
					    <Col span="5" className={show.showStatus? "show":"hidden"}>
					    	<Col span="22">
					    	<Select defaultValue="all" style={{ width: 120 }} onChange={this.onStatusChange}>
					    		<Option value="all">全部</Option>
					    		<Option value="0">新建</Option>
						      	<Option value="1">等待执行</Option>
						      	<Option value="2">发送任务失败</Option>
						      	<Option value="3">等待继续执行</Option>
						      	<Option value="4">执行完成</Option>
						      	<Option value="5">执行失败</Option>
						      	<Option value="6">已删除</Option>
						      	<Option value="7">已终止</Option>
						    </Select>
					    	</Col>
					    </Col>
					    <Col span="8" className={show.showDate? "show":"hidden"}>
					    	<Col span="12"><DatePicker  onChange={this.getStartTime} disabledDate={disabledDate}/></Col>
					    	<Col span="12"><DatePicker onChange={this.getEndTime} disabledDate={disabledDate}/></Col>
					    </Col>
					    <Col span="4">
					    	 <Button type="primary" onClick={this.request}>查询</Button>
					    </Col>
				    </Col>
			    </Row>
			</div>
		)
	},

	onSelectChange:function(value){
		this.setState({
			select : value
		})
	},

	onStatusChange : function(value){
		this.setState({
			status : value
		})
	},

	request:function(type){
		if(type=='mine'){
			this.props.request(type);
		}else{
			this.props.requestData(this.requestData());
			this.props.request();
		}
	
	},

	getStartTime:function(Datevalue){
		this.setState({
			starttime: Math.round(Datevalue.getTime()/1000)-24*60*60-1
		})
	},

	getEndTime:function(Datevalue){
		this.setState({
			endtime: Math.round(Datevalue.getTime()/1000)
		})
	},

	chooseSelect:function(value){
		var show = this.state.show;
		for(var key in show){
			if(key==value){
				show[key] = true
			}else{
				show[key] = false
			}
		}
		this.setState({
			choose:value
		})

		this.setState({
			show:{
				showDate : show.showDate,
				showSelect :show.showSelect,
				showExecute : show.showExecute,
				showAll :show.showAll,
				showCreate:show.showCreate,
				showStatus : show.showStatus
			}
		})
	}
});


var List = React.createClass({

	componentWillReceiveProps:function(nextProps){	
		var me=this;

		me.setState({
			uuapUserName:nextProps.userName
		})

		if(location.hash.indexOf('orderId')>=0){
			var orderId = parseInt( location.hash.split('?')[1].split("&")[0].split("=")[1],10);
			this.props.changeActivityTab();
			this.enterDetail(orderId);

		}else{
			var orderId = ''
		}
		
		
		me.request("mine",nextProps.userName)
		
		
	},
	getInitialState:function(){
		return {
			result : {},
			requestData :{},
			uuapUserName:""
		}
	},

	componentDidMount:function(){
		if(location.hash.indexOf('orderId')>=0){
			var orderId = parseInt( location.hash.split('?')[1].split("&")[0].split("=")[1],10);
			this.props.changeActivityTab();
			this.enterDetail(orderId);
		}else{
			var orderId = ''
		}
		
		this.request("mine");
	},

	request:function(type,uuapUserName){
		if(!uuapUserName && !this.state.uuapUserName){
			return;
		}
		var me = this;
		reqwest({
			type:'JSON',
			url:'/v1/order/list',
			headers:{
				'UUAP-USERNAME':uuapUserName || me.state.uuapUserName
			},
			data : type=='mine'? {type:'mine'} :me.Data
		}).then(function(res){
			if(res.status==200){
				var result = JSON.parse(res.response);
				if(result.errno==0){
					me.setState({
						result : result
					})
				}
			}
		});
	},

	render : function(){
		var result = (this.state.result && this.state.result.data)||[];
		var columns = this.columns();

		const pagination = {
		  total: result.length,
		  showSizeChanger: true
		};

		return (
			<div>
				<Filter requestData={this.requestData} activeKey={this.props.activeKey} request={this.request}/>
				<Table columns={columns} dataSource={result} pagination={pagination} />
			</div>
		)
	},

	columns:function(){
		var me = this;
		const columns = [{
			  	title: 'ID',
			  	dataIndex: 'orderId',
				  	render(text,record) {
				  	if(text){
				  		return <a onClick={()=>{me.enterDetail(record.orderId)}}>{text}</a>;
				  	}else{
	 					return "-";
				  	}	
			  	}
			}, {
			  title: '名称',
			  dataIndex: 'orderName'
		
			}, {
			  title: '创建者',
			  dataIndex: 'userName',
			  render(text,record){
			  	return  record.userName && record.userName!='null' ? record.userName : "-" 
			  }
			}, {
			  title: '执行者',
			  dataIndex: 'operationUserName',
			  render(text,record){
			  	return  record.operationUserName=="" || record.operationUserName=='null'? "-":record.operationUserName
			  }
			}, {
			  title: '创建时间',
			  dataIndex: 'createTime',
			  render(text, record){
			  	return record.createTime==0?'-' : Utils.dateFormat(new Date(record.createTime*1000),'yyyy-MM-dd hh:mm:ss')
			  }
			},  {
			  title: '完成时间',
			  dataIndex: 'endTime',
  			  render(text, record){
			  	return record.endTime==0 ?'-' : Utils.dateFormat(new Date(record.endTime*1000),'yyyy-MM-dd hh:mm:ss')
			  }
			},{
			  title: '上线时间',
			  dataIndex: 'startTime',
			   render(text, record){
			  	return record.startTime==0 ?'-' : Utils.dateFormat(new Date(record.startTime*1000),'yyyy-MM-dd hh:mm:ss')
			  }
			}, {
			  title: '状态',
			  dataIndex: 'status',
			  render(text,record){
			  	var sta = record.status;
			  	switch(sta){
			  		case 0:
			  			sta = '新建'
			  			break;
			  		case 1:
			  			sta = '等待执行'
			  			break;
			  		case 2:
			  			sta = '发送任务失败'
			  			break;
			  		case 3:
			  			sta = '等待继续执行'
			  			break;
			  		case 4:
			  			sta = '执行完成'
			  			break;
			  		case 5:
			  			sta = '已删除'
			  			break;
			  		case 6:
			  			sta = '失败'
			  			break;
			  		case 7:
			  			sta = '已终止'
			  			break;
			  		default:
			  			sta = '-'
			  			break;
			  	}
			  	return sta;
			  }
			},{
				title: '类型',
			  	dataIndex: 'orderType',
			  	render(text){
			  		if(text==0){
			  			return '上线单'
			  		}else{
			  			return '回滚单'
			  		}
			  	}
			}, {
			  title: '操作',
			  dataIndex: 'address',
			  render(text, record){
			  var del = (record.status==0 && record.contentType!=1) ? false:true;

			  var roll = record.contentType!=1 ? false : true;
			  	return (<div><Button type="primary"  size="small" onClick={()=>{me.deleteOrder(record.orderId)}} disabled={del}>删除</Button>
			  	<Button type="primary" size="small" onClick={()=>{me.forceFinish(record.orderId,record.status)}} disabled={roll}>回滚</Button>
			  	<Button type="primary" size="small" onClick={()=>{me.enterDetail(record.orderId)}}>详情</Button>
			  	</div>)
			  }
		}];

		return columns;
	},
	enterDetail:function(id){
		window.isOnce = false;
		this.props.showDetail(true);
		location.hash='online/detail?orderId='+id
		this.props.changeActivityTab();
		location.reload();
	},

	forceFinish:function(orderId,status){
		var me = this;

		if(status==3||status==4){
			me.rollback(orderId);
			return
		}

		reqwest({
			type:'JSON',
			url:'/v1/order/forceFinish',
			headers:{
				'UUAP-USERNAME':me.props.userName
			},
			data :{"orderId":orderId}
		}).then(function(res){
			if(res.status==200){
				var result = JSON.parse(res.response);
				if(result.errno==0){
					me.rollback(orderId)
				}else{
					message.error('回滚单创建失败  '+getErrorMsg(result.errno),4);
				}
			}
		});
	},

	rollback:function(orderId){
		var result = this.state.result;
		var newObj = result.data.filter(function(obj){
			return obj.orderId == orderId
		});
		var me = this;
		var data = {
			OrderName : newObj[0].orderName,
			OrderType : 1,
			ModuleName : newObj[0].moduleName,
			ModuleVersion : newObj[0].moduleLastVersion,
			HookBefore:newObj[0].hookBefore,
			HookAfter : newObj[0].hookAfter
		};
		
		reqwest({
			type:'JSON',
			url:'/v1/order/commit',
			method:'post',
			headers:{
				'UUAP-USERNAME':me.props.userName
			},
			data :JSON.stringify({"data":data})
		}).then(function(res){
			if(res.status==200){
				var result = JSON.parse(res.response);
				if(result.errno==0){
					message.success('回滚单创建完成',3);
					//me.request();
					me.props.showDetail(true)
					location.hash='online/detail?orderId='+result.data.Id;
					me.props.changeActivityTab();
				}else{
					message.error('回滚单创建失败  '+getErrorMsg(result.errno),4);
				}
			}
		});
	},

	deleteOrder:function(id){
		var me = this;
		reqwest({
			type:'JSON',
			url:'/v1/order/delete',
			headers:{
				'UUAP-USERNAME':me.props.userName
			},
			method:'post',
			data : JSON.stringify({"data":{"orderId":id}})
		}).then(function(res){
			if(res.status==200){
				var result = JSON.parse(res.response);
				if(result.errno==0){
					message.success('删除成功',3);
					me.request();
				}else{
					message.error('删除失败  '+getErrorMsg(result.errno),4);
				}
				me.setState({
					choose : 'mine'
				});
				me.request();
			}
		})
	},

	requestData:function(requestData){
		this.Data = requestData;
	}
})
export default List