import React from 'react'
import {Modal, Button,Table} from 'antd'


var DetailModal = React.createClass({
	
	componentWillReceiveProps:function(){
			
		this.render();
	},

	render:function(){
		var isShow = this.props.isShow;
		const columns = [{
		  	title: '机器',
		  	dataIndex: 'host',
		  	key: 'host',
		}, {
		  	title: '状态',
		  	dataIndex: 'status',
		  	key: 'status',
		 	render(text,record){
		 		var href = '/v1/order/logInfo?taskId='+record.task_id+'&host='+record.host;
		 		switch(text){
		 			case 'SUCCESS':
		 				return <a href={href} target='_blank'>成功</a>;
		 				break;
		 			case 'RUNNING':
		 				return <a href={href} target='_blank'>执行中</a>;
		 				break;
		 			case 'FAIL':
		 				return <a href={href} target='_blank'>失败</a>;
		 				break;
		 			case 'UNKNOW':
		 				return <a href={href} target='_blank'>未知</a>;
		 			case 'NONEXIST':
		 				return <a href={href} target='_blank'>发布中</a>;
		 				break; 
		 		}

		 	}
		}];
		return (
			<div>
		        <Modal title="详情" visible={isShow}
		          onOk={this.hideModal} onCancel={this.hideModal}
		          okText="返回" >
		         <Table dataSource={this.props.modalInfo} columns={columns} />
		        </Modal>
	       </div>
		)
	},

	showModal:function(){
		this.props.changeState(true)
	},

	hideModal:function(){
		this.props.changeState(false)
	}

})

export default DetailModal