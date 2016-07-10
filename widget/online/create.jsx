import React from 'react'
import {Form,Input,Button,Table,Row,Col,Steps ,message} from 'antd'
import reqwest from 'reqwest'
import getErrorMsg from 'errno.js'
const FormItem = Form.Item;
const Step = Steps.Step;
var CreateForm = React.createClass({
	componentWillReceiveProps:function(){
		this.render();
		this.refs.moduleName.refs.input.value="";
		this.refs.moduleVersion.refs.input.value = "";
	},

	getInitialState:function(){
		return {
			isReRender : this.props.isReRender
		}
	},
	render:function(){
		const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 16 },
	    };

		return (
			<div className={this.props.isShow?"show":"hidden"}>
				<Form horizontal>
			        <FormItem label="模块名称" {...formItemLayout} required>
			          <Input ref="moduleName" />
			        </FormItem>
			        <FormItem label="模块版本" {...formItemLayout} required>
			          <Input ref="moduleVersion" />
			        </FormItem>
			        <FormItem wrapperCol={{ span: 10, offset: 6 }} style={{ marginTop: 24 }}>
			        	<Button type="primary" onClick={this.addModule} htmlType="submit">添加</Button>
			        </FormItem>
		      	</Form>
		      	
		     </div>
		)
	},
	addModule:function(){
	var me = this;
	var modulename =  me.refs.moduleName.refs.input.value.trim();
	var moduleversion = me.refs.moduleVersion.refs.input.value.trim();

	if(modulename =='' || moduleversion==''){
		message.error('模块名称和版本不能为空',4);
		return;
	}
		reqwest({
			type:'JSON',
			url:'/v1/order/moduleInfo',
			headers:{
				'UUAP-USERNAME':me.props.userName
			},
			data : {modulename:modulename}
		}).then(function(res){
			if(res.status==200){
				var result = JSON.parse(res.response);
				if(result.errno==0){
					me.props.onGetModuleInfo(result.data);
					me.props.onGetVersion(moduleversion)
					me.props.onNextStep(1);
					me.props.onChangeShow(false,true,true);
				}else{
					message.error('该模块不存在  '+getErrorMsg(result.errno),4);
				}
				
			}
		})
	}
});

var CreateForm = Form.create()(CreateForm);

var CreateTable = React.createClass({
	render:function(){
		var me = this;
		const columns = [{
		  title: '模块名称',
		  dataIndex: 'module_name',
		  key: 'module_name'
		}, {
		  title: '创建人',
		  dataIndex: 'creator_name',
		  key: 'creator_name'
		}, {
		  title: '模块描述',
		  dataIndex: 'module_des',
		  key: 'module_des'
		},
		{
		  title: 'BNS列表',
		  dataIndex: 'bns_server_name',
		  key: 'bns_server_name'
		}, {
		  title: '路径',
		  dataIndex: 'deploy_dir',
		  key: 'deploy_dir'
		}];

		return (
			<div className={this.props.isShow?"show":"hidden"}>
				<Table columns={columns} dataSource={this.props.moduleInfo} />
			</div>
		)
	}

});

var CreateInput = React.createClass({
	componentWillReceiveProps:function(){
		this.render();
		this.refs.concurrency.refs.input.value = '';
		this.refs.name.refs.input.value ='';
		this.refs.before.refs.input.value ='';
		this.refs.after.refs.input.value ='';
	},

	render:function(){
		const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 16 },
	    };


		return (
			<div className={this.props.isShow?"show":"hidden"}>
			  	<Form horizontal >
			  		<FormItem label="上线单名称" {...formItemLayout} required> 	
			  		 	<Input ref="name"  />
			  		</FormItem> 
			  		<FormItem label="并发度控制" {...formItemLayout}> 	
			  		 	<Input ref="concurrency"/>
			  		</FormItem>
			  		<FormItem label="前置命令" {...formItemLayout}>
			  		 	<Input ref="before"/>
			  		</FormItem>
			  		<FormItem label="后置命令" {...formItemLayout}>
			  		 	<Input ref="after"/>
			  		</FormItem>
			  		<FormItem wrapperCol={{ span: 24, offset: 6 }} style={{ marginTop: 24 }}>
			  			<Button type="primary" onClick={this.lastStep} style={{ marginRight: 10 }}>上一步</Button>
				        <Button type="primary" onClick={()=>{this.create('justcreate')}} style={{ marginRight: 10 }} htmlType="submit">创建</Button>
				        <Button type="primary" onClick={()=>{this.create('create')}} htmlType="submit">创建并上线</Button>
				    </FormItem>
			  	</Form>
			</div>
		)
	},
	lastStep:function(){
		this.props.onNextStep(0);
		this.props.onChangeShow(true,false,false);
	},
	create:function(type){
		
		var concurrency = this.refs.concurrency.refs.input.value;
		var name = this.refs.name.refs.input.value.trim();
		var before = this.refs.before.refs.input.value;
		var after = this.refs.after.refs.input.value;
		var me = this;

		if(name==''){
			message.error('上线单名称不能为空',4)
		}
		var data = {
			OrderName : name,
			OrderType : location.hash.indexOf('back')>=0? 1:0,
			ModuleName : (me.props.moduleInfo[0].module_name).trim(),
			ModuleVersion : (me.props.moduleversion).trim(),
			OperationType: parseInt(concurrency,10),
			HookBefore: before.trim(),
			HookAfter : after.trim()
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

				if(result.errno == 0){
					message.success('创建成功',3);
					if(type=='justcreate'){
						location.hash='online/list';
					}else{
						me.props.showDetail(true)
						location.hash='online/detail?orderId='+result.data.Id
					}
					
					me.props.changeActivityTab();
					me.props.onNextStep(2);
				}else{
					message.error('创建失败  '+getErrorMsg(result.errno),4);
				}
			}
		});
	}
});

var Create = React.createClass({

	componentWillReceiveProps:function(nextProps){

		var me=this;

		me.setState({
			uuapUserName:nextProps.userName
		});
		
		if(this.props.activeKey=='1'){
			this.setState({
				isReRender : true
			});
		}else{
			this.setState({
				isReRender : false
			});
		}

	},

	getInitialState:function(){
		return {
			showModuleForm : true,
			showInputForm : false,
			showTable : false,
			currentStep : 0,
			moduleInfo :[],
			moduleversion : '',
			isReRender : false
		}
	},
	render:function(){
		const steps = [{
			  	title: '添加模块'
			}, {
			  	title: '创建上线单'
			}, {
			  	title: '准备上线'
			},{
				title:'上线中'
			},{
				title:'完成'
			}].map(function(s, i){
				return <Step key={i} title={s.title} />
			})
		return (
			<div className="create_container">
				<Row type="flex" justify="center" className="step">
					<Col span="20"><Steps current={this.state.currentStep}>{steps}</Steps></Col>
				</Row>
				<Row>
					<Col span="8">
						<CreateForm userName={this.props.userName} isReRender = {this.state.isReRender} isShow={this.state.showModuleForm} onChangeShow={this.onChangeShow} onNextStep={this.onNextStep} onGetModuleInfo={this.onGetModuleInfo} onGetVersion={this.onGetVersion}/>
						<CreateInput userName={this.props.userName} changeActivityTab={this.props.changeActivityTab} isShow = {this.state.showInputForm} onChangeShow={this.onChangeShow} moduleInfo={this.state.moduleInfo} onNextStep={this.onNextStep} moduleversion={this.state.moduleversion} showDetail={this.props.showDetail}/>
					</Col>
					<Col span="16"><CreateTable userName={this.props.userName} isShow ={this.state.showTable} onChangeShow={this.onChangeShow} moduleInfo={this.state.moduleInfo}/></Col>
				</Row>
			</div>
		)
	},

	onGetModuleInfo:function(result){
		this.setState({
			moduleInfo : result
		})
	},

	onChangeShow:function(isShowForm,isShowTable,isShowInput){
		this.setState({
			showModuleForm : isShowForm,
			showInputForm : isShowInput,
			showTable : isShowTable
		})
	},
	onNextStep:function(num){
		this.setState({
			currentStep : num
		})
	},

	onGetVersion : function(version){
		this.setState({
			moduleversion : version
		})
	}

});

export default Create