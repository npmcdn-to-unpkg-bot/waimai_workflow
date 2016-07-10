import React from 'react'
import {Form,Input,Button,Table,Row,Col,Steps,Icon,message   } from 'antd'
import Modal from 'modal.jsx'
const FormItem = Form.Item;
const Step = Steps.Step;
import reqwest from 'reqwest'
import Utils from '../../static/js/utils/utils.js'

import getErrorMsg from 'errno.js'

var Info = React.createClass({
	getInitialState:function(){
		return {
			isShowKey : false
		}
	},

	componentWillReceiveProps:function(){	
		this.render();
	},
	render:function(){
		const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };

	    var info = this.props.basicInfo
		return (
			<div className="info clearfix">
				<Col span='12'>
					<Row><Col span="23" className="title"><h2>基本信息</h2></Col></Row>
					<Col span="12" >
						<Row className="item">
							<Col span="7" className='right'>ID：</Col>
							<Col span="17">{info.orderId}</Col>
						</Row>
						<Row className="item">
							<Col span="7" className='right'>类型：</Col>
							<Col span="17">{info.orderType==0 ? "上线单" : '回滚单'}</Col>
							
						</Row>
						<Row className="item">
							<Col span="7" className='right'>创建者：</Col>
							<Col span="17">{info.orderCreateUserName==""?"暂无":info.orderCreateUserName}</Col>
							
						</Row>
						<Row className="item">
							<Col span="7" className='right'>状态：</Col>
							<Col span="17">{this.getStatus(info.orderStatus)}</Col>
						
						</Row>
						<Row className="item">
							<Col span="7" className='right'>结束时间：</Col>
							<Col span="17">{info.orderEndTime==0?'暂无' : Utils.dateFormat(new Date(info.orderEndTime*1000),'yyyy-MM-dd hh:mm:ss')}</Col>
						</Row>
						<Row className="item">
							<Col span="7" className='right'>前置命令：</Col>
							<Col span="17">{info.hookBefore==''?'暂无':info.hookBefore}</Col>	
						</Row>
					</Col>
					<Col span='12'>
						<Row className="item">
							<Col span="7" className='right'>名称：</Col>
							<Col span="17">{info.orderName}</Col>
						</Row>
						<Row className="item">
							<Col span="7" className='right'>上线内容：</Col>
							<Col span="17">{info.orderContentType==0?"代码上线":"配置文件上线"}</Col>
						</Row>
						<Row className="item">
							<Col span="7" className='right'>执行者：</Col>
							<Col span="17">{info.orderOperationUserName==""?"暂无":info.orderOperationUserName}</Col>
						</Row>
					
						<Row className="item">
							<Col span="7" className='right'>创建时间：</Col>
							<Col span="17">{Utils.dateFormat(new Date(info.orderCreateTime*1000),'yyyy-MM-dd hh:mm:ss')}</Col>
						</Row>
						<Row className="item">
							<Col span="7" className='right'>后置命令：</Col>
							<Col span="17">{info.hookAfter==''?'暂无':info.hookAfter}</Col>
						</Row>
					</Col>

				</Col>
				<Col span='12'>
					<Row style={{marginLeft:'20px'}}><Col span="23" className="title"><h2>模块信息</h2></Col></Row>
					<Col span="12" className="padding_right partline">
							<Row className="item">
								<Col span="7" className='right'>模块名称：</Col>
								<Col span="17">{info.moduleName}</Col>
							</Row>
							<Row className="item">
								<Col span="7" className='right'>路径：</Col>
								<Col span="17">{info.modulePath}</Col>
							</Row>
							<Row className="item">
								<Col span="7" className='right'>稳定版本：</Col>
								<Col span="17">{info.lastVersion==''?'暂无':info.lastVersion}</Col>
							</Row>
							<Row className="item">
								<Col span="8" className='right'>待上线版本：</Col>
								<Col span="16">{info.moduleVersion==''?'暂无':info.moduleVersion}</Col>
							</Row>
							<Row className="item">
								<Col span="7" className='right'>BNS列表：</Col>
								<Col span="17">{this.getBns(info)}</Col>
							</Row>

							<Row className='item'>
								{(info.lastVersion=='0.0.0.0'||info.lastVersion=='')?<Button type="primary" size="large" onClick={this.openKey}>解锁</Button> :''}
							</Row>
					</Col>
				</Col>
			</div>
		)
	},

	openKey:function(){
		var me = this;
		var orderId = this.props.orderId;
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
					me.setState({
						isShowKey : false
					})
					message.success('解锁成功',3)
				}else{
					message.error('解锁失败  '+getErrorMsg(result.errno),4)
				}
			}
		});
	},

	getBns:function(info){
		if(!info.bnsInfo){
			return
		}
		var bns = info.bnsInfo;
		var array = [];
		bns.map(function(i,k){
			array.push(<Col key={k}>{i}</Col>)
		});

		return array
	},

	getStatus:function(sta){
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
});

var Online = React.createClass({

	componentWillReceiveProps:function(nextProps){
		if(location.hash.indexOf('orderId')>=0){
			var orderId = parseInt( location.hash.split('?')[1].split("&")[0].split("=")[1],10);
		}else{
			var orderId = ''
		}
		
		this.checkStatus('mirror',orderId);

	},

	getInitialState:function(){
		return {
			isShowDetail : false,
			onlineState : {
				start : [0,''],//状态，失败原因
				mirror : [0,''],
				stop : [0,''],
				all : [0,'']
			},
			step: '',//当前步骤key  start,mirror,stop,all
			stepNum : 0,//当前步骤
			mirrorInfo : {},
			stopInfo:{},
			allInfo:{},
			modalInfo:{}
		}	
	},

	changeNext:function(type){
		if(type=='mirror'){
			this.changeStep('stop');
		}else if(type=='stop'){
			this.changeStep('all');
		}else if(type=='all'){
			this.setState({
				stepNum : 4
			})
		}
	},

	changePre:function(type){
		if(window.isOnce){
			return;
		}
		if(type=='mirror'||type=='start'){
			this.changeStep('start');
			window.isOnce = true;
		}else if(type=='stop'){
			this.changeStep('mirror');
			window.isOnce = true;
		}else if(type=='all'){
			this.changeStep('stop');
			window.isOnce = true;
		}
	},

	checkStatus : function(type,orderId){
		var me = this;
		//var step = this.state.step;

		me.orderId = orderId;
		if(!orderId && !me.props.userName){
			return
		}

		reqwest({
			type:'JSON',
			url:'/v1/order/pauseStatus',
			headers:{
				'UUAP-USERNAME':me.props.userName
			},
			data: {"orderId":orderId,'type':type}
		}).then(function(res){
			if(res.status==200){
				var result = JSON.parse(res.response);
				//存储详情机器信息
				if(result.errno==0){
					me.saveInfo(type,result);
					me.onChangeModalInfo(result.data.data)	
					if(type=='mirror'){

						me.checkStatus('stop',me.orderId);
					}else if(type=='stop'){
						me.checkStatus('all',me.orderId)
					}

					if(result.data.result!='DOING'){
						if(result.data.result=='SUCCESS'){
							if(type=='mirror'){
								me.showSuccess('start');
							}

							me.showSuccess(type);
							me.changeNext(type);
						}else if(result.data.result=='WAITING'){
							if(type=='mirror'){
								me.showWait('start');
								me.changePre('start');
							}
							me.showWait(type);
							me.changePre(type);
						}else if(result.data.result=='FAIL'){
							if(type=='mirror'){
								me.showSuccess('start');
							}
							me.showFail(type,result.errno);
						}
					}
				}else{
					if(type=='mirror'){
						me.showSuccess('start');
					}
					me.showFail(type,result.errno);
				}		

					
			}
		})
	},

	saveInfo : function(type,result){
		var me = this;
		if(type=='mirror'){
			me.setState({
				mirrorInfo : result.data.data
			})
		}else if(type=='stop'){
			me.setState({
				stopInfo : result.data.data
			})
		}else if(type=='all'){
			me.setState({
				allInfo : result.data.data
			})
		}
	},

	render:function(){

		var onlineState = this.state.onlineState;
		var isStart = this.state.stepNum==0?false:true;
		var isMirrorReDo = this.state.stepNum==1 ? false : true;
		var isStopGo  = this.state.stepNum ==2? false : true;
		var isAllGo = this.state.stepNum == 3 ? false : true;
		var isShowReDo = (this.props.basicInfo.orderStatus==4 ||this.props.basicInfo.orderStatus==5) ? true : false
		const steps = [{
		  title: '任务提交'}, { 
		  title: 'mirror'}, {
		  title: '暂停点'}, {
		  title: '全量'}].map(function(s, i){return <Step key={i} title={s.title} description={s.description} />});
		return (
			<div className={this.props.className+" online"}>
				<Row className="head">
					<Col span="6">上线步骤</Col>
					<Col span="6">状态</Col>
					<Col span="6">操作</Col>
					<Col span="6">原因</Col>
				</Row>
				<Row className="grid">
					<Col span="6" className="pad">
						<Steps direction="vertical" current={this.state.stepNum}>{steps}</Steps>
					</Col>
					<Col span="6">
						<Row className="content">
							{this.onState(onlineState.start)}
						</Row>
						<Row className="content">{this.onState(onlineState.mirror)}</Row>
						<Row className="content">{this.onState(onlineState.stop)}</Row>
						<Row className="content">{this.onState(onlineState.all)}</Row>
					</Col>
					<Col span="6">
						<Row className="content">
				  			<Button ref='start' disabled={isStart} type="primary" size="small" onClick={()=>{this.onStart('start')}}>上线</Button>
				  			<Button type="primary" size="small" onClick={()=>{this.onStart('start')}} disabled={isShowReDo}>重做</Button>
			  			</Row>
						<Row className="content">
							<Button type="primary" size="small" value='1' onClick={()=>{this.onShowDetail(this.state.mirrorInfo)}}>详情</Button>
				  			<Button type="primary" size="small" onClick={()=>{this.onContinue('mirror')}} disabled={isShowReDo}>重做</Button>
						</Row>
						<Row className="content">
							<Button type="primary" size="small" value='1' onClick={()=>{this.onShowDetail(this.state.stopInfo)}}>详情</Button>
							<Button ref="stop"  disabled={isStopGo} type="primary" size="small" onClick={()=>{this.onContinue('stop')}}>继续</Button>
				  			<Button type="primary" size="small" onClick={()=>{this.onContinue('stop')}} disabled={isShowReDo}>重做</Button>
						</Row>
						<Row className="content">
							<Button type="primary" size="small" value='1' onClick={()=>{this.onShowDetail(this.state.allInfo)}}>详情</Button>
							<Button ref = 'all'  disabled={isAllGo} type="primary" size="small" onClick={()=>{this.onContinue('all')}}>继续</Button>
				  			<Button type="primary" size="small" onClick={()=>{this.onContinue('all')}} disabled={isShowReDo}>重做</Button>
						</Row>
					</Col>
					<Col span="6">
						<Row className="content">
							{this.onErrorMsg(onlineState.start)}
						</Row>
						<Row className="content">{this.onErrorMsg(onlineState.mirror)}</Row>
						<Row className="content">{this.onErrorMsg(onlineState.stop)}</Row>
						<Row className="content">{this.onErrorMsg(onlineState.all)}</Row>
					</Col>
				</Row>

				<Modal isShow={this.state.isShowDetail} changeState ={this.changeState} modalInfo={this.state.modalInfo}/>
			</div>
		)
	},

	onState : function(onlineState){
		var selectState = onlineState[0];
		var state = ['待开始',<Icon type="loading"/>,'成功','失败'];
		return state[selectState]
	},

	onErrorMsg:function(onlineState){
		var errno =onlineState[1];
		if(errno!=0){
			return getErrorMsg(errno);
		}else{
			return ''
		}
	},

	changeStep : function(step){
		var me = this;
		switch(step){
			case 'start':
				me.setState({
					step : 'start',
					stepNum : 0
				})
				break;
			case 'mirror':
				me.setState({
					step : 'mirror',
					stepNum : 1
				})
				break;
			case 'stop':
				me.setState({
					step : 'stop',
					stepNum : 2
				})
				break;
			case 'all':
				me.setState({
					step : 'all',
					stepNum : 3
				})
				break;
			case 'end':
				me.setState({
					step :'end',
					stepNum : 4
				})
		}
	},

	lunxunRequest : function(type){
		var me = this;
		var orderId = this.props.orderId;
		//console.log(me.props.userName)
		reqwest({
			type:'JSON',
			url:'/v1/order/pauseStatus',
			headers:{
				'UUAP-USERNAME':me.props.userName
			},
			data: {"orderId":orderId,'type':type}
		}).then(function(res){
			if(res.status==200){
				var result = JSON.parse(res.response);
				if(result.errno==0){
					me.setState({
						lunxunInfo : result.data.data
					});

					me.saveInfo(type,result);
					me.onChangeModalInfo(result.data.data)
					if(result.data.result!='DOING'){
						if(result.data.result=='SUCCESS'){
							me.showSuccess(type);
							me.changeNext(type);
						}else if(result.data.result=='WAITING'){
							me.showWait(type);
						}else{	
							me.showFail(type,result.errno);
						}
						clearInterval(window.interval);
					}
				}else{
					clearInterval(window.interval);
					me.showFail(type,result.errno);
				}
			}
		})
	},


	lunXun:function(type){
		var me = this;
		this.changeStep(type);
		this.showLoading(type);
		this.changeNext(type);
		window.interval = setInterval(function(){
			me.lunxunRequest(type);
		},10000);
	},

	onContinue : function(type,id){
		var me = this;
		//var step = this.state.onlineState[0];
		var orderId =this.props.orderId;
		me.showLoading(type);
		reqwest({
			type:'JSON',
			url:'/v1/order/continue',
			headers:{
				'UUAP-USERNAME':me.props.userName
			},
			data : {"orderId":orderId,'type':type}
		}).then(function(res){
			if(res.status==200){	
				var result = JSON.parse(res.response);
				if(result.errno==0){
					me.lunXun(type)
				}else{
					me.showFail(type,result.errno)
				}		
			}else{
				me.showFail(type,result.errno);
			}
		})
	},

	onStart:function(type,id){
		var me = this;
		this.changeStep(type);
		//var step = this.state.step;
		this.showLoading(type);
		reqwest({
			type:'JSON',
			url:'/v1/order/start',
			method:'post',
			headers:{
				'UUAP-USERNAME':me.props.userName
			},
			data : JSON.stringify({"data":{"orderId":me.props.orderId}})
		}).then(function(res){
			if(res.status==200){
				var result = JSON.parse(res.response);
				if(result.errno==0){
					me.showSuccess(type);
					me.changeStep('mirror');
					me.lunXun('mirror');
				}else if(result.errno==429){
					me.showFail(type,'no');
					message.error( result.data+'上线单正在对'+me.props.basicInfo.moduleName+'模块上线',4);
				}else if(result.errno==432){
					me.showFail(type,'no');
					message.error('不在'+result.data+'上线时间范围内',4);
				}else{
					me.showFail(type,result.errno);
				}
			}else{
				me.showFail(type,result.errno);
			}
		});
	},

	showFail:function(type,num){
		this.changeStep(type);
		var state = this.state.onlineState;
		var step = this.state.step;//step : first,mirror...
		state[type][0] = 3
		state[type][1] = num;

		this.setOnlineState(state);
	},

	setOnlineState:function(state){
		this.setState({
			onlineState : state
		})
	},

	showWait:function(type){
		//var step = this.state.step;

		var state = this.state.onlineState;

		state[type][0] = 0
		state[type][1] = 'no'

		this.setOnlineState(state);
	},

	showSuccess : function(type){
		this.changeStep(type);
		var step = this.state.step;
		var state = this.state.onlineState;

		state[type][0] = 2;
		state[type][1] = 'no';

		this.setOnlineState(state);
	},

	showLoading : function(type){
		this.changeStep(type);
		var state = this.state.onlineState;
		var step = this.state.step;

		state[type][0] = 1;
		state[type][1] = 'no';

		this.setOnlineState(state);
	},

	onShowDetail:function(info){
		this.setState({
			isShowDetail : true,
			modalInfo : info
		})
	},

	onChangeModalInfo:function(info){
		this.setState({
			modalInfo : info
		})
	},

	changeState:function(sta){
		this.setState({
			isShowDetail: sta
		})
	}

})

var Detail = React.createClass({
	
	componentWillReceiveProps:function(nextProps){	
		var me = this;
		me.setState({
			uuapUserName:nextProps.userName
		});

		if(location.hash.indexOf('orderId')>=0){
			var orderId = parseInt( location.hash.split('?')[1].split("&")[0].split("=")[1],10);
		}else{
			var orderId = ''
		}
		this.request(orderId,nextProps.userName);
	},

	getInitialState:function(){
		if(location.hash.indexOf('orderId')>=0){
			var orderId = parseInt( location.hash.split('?')[1].split("&")[0].split("=")[1],10);
		}else{
			var orderId = ''
		}

		return {
			info :{},
			orderId : orderId,
			uuapUserName :""
		}
	},
	
	componentWillMount:function(){
		location.reload();
		this.request();
	},

	request:function(orderId,uuapUserName){
		var me = this;
		if(!uuapUserName && !this.state.uuapUserName){
			return;
		}
		var orderId = orderId ||  this.state.orderId
		reqwest({
			type:'JSON',
			url:'/v1/order/detail',
			headers:{
				'UUAP-USERNAME':uuapUserName || me.state.uuapUserName
			},
			data:{orderId:orderId}
		}).then(function(res){
			if(res.status==200){
				var result = JSON.parse(res.response);
				if(result.errno==0){
					me.setState({
						info : result.data,
						orderId : orderId
					})
				}
			}
		})
	},

	render:function(){
		var orderId = this.state.orderId;
		var basicInfo = this.state.info;
		return (
			<div className="detail">
				<Info orderId ={orderId} basicInfo = {basicInfo} userName={this.state.uuapUserName}/>
				<Online  orderId={orderId} basicInfo ={basicInfo}  userName={this.state.uuapUserName} className={basicInfo.orderStatus==5?'hidden':'show'}/>
			</div>
		)
	},

	showModal : function(){

	}
})

export default Detail