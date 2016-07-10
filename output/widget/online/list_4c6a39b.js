define('ops:widget/online/list.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
  	value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('ops:components/react/react.js');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require('ops:components/antd/lib/index.js');
  
  var _reqwest = require('reqwest');
  
  var _reqwest2 = _interopRequireDefault(_reqwest);
  
  var _reactRouter = require('ops:components/react-router/lib/index.js');
  
  var _staticJsUtilsUtilsJs = require('ops:static/js/utils/utils.js');
  
  var _staticJsUtilsUtilsJs2 = _interopRequireDefault(_staticJsUtilsUtilsJs);
  
  var _errnoJs = require('ops:widget/online/errno.js');
  
  var _errnoJs2 = _interopRequireDefault(_errnoJs);
  
  var ReactDom = require('ops:components/react-dom/react-dom.js');
  var Option = _antd.Select.Option;
  
  var Filter = _react2['default'].createClass({
  	displayName: 'Filter',
  
  	componentWillReceiveProps: function componentWillReceiveProps() {
  		this.props.requestData(this.requestData());
  	},
  
  	componentDidMount: function componentDidMount() {
  		this.props.requestData(this.requestData());
  	},
  
  	getInitialState: function getInitialState() {
  		var today = new Date().getTime();
  		return {
  			show: {
  				showDate: false,
  				showSelect: false,
  				showExecute: false,
  				showAll: false,
  				showCreate: false,
  				showStatus: false
  			},
  			starttime: today,
  			endtime: today,
  			choose: "showAll",
  			select: 'all',
  			status: 'all',
  			mine: 'mine'
  		};
  	},
  
  	requestData: function requestData() {
  		var search = this.props.search;
  		var me = this;
  		var name = me.refs.man.refs.input.value;
  		var data = {};
  		var choose = this.state.choose;
  		if (choose == 'showSelect') {
  			data.type = this.state.select;
  		} else if (choose == 'showCreate') {
  			data.type = 'createUser';
  			data.username = name;
  		} else if (choose == 'showExecute') {
  			data.type = 'operationUser';
  			data.username = name;
  		} else if (choose == 'showDate') {
  			data.type = "time";
  			data['time_section'] = this.state.starttime + "," + this.state.endtime;
  		} else if (choose == "showStatus") {
  			data.type = 'menuStatus';
  			if (this.state.status == 'all') {
  				data.type = 'all';
  			} else {
  				data.status = this.state.status;
  			}
  		} else if (choose == "showAll") {
  			data.type = 'all';
  		} else {
  			data.type = this.state.select;
  		}
  		return data;
  	},
  	render: function render() {
  		var _this = this;
  
  		var show = this.state.show;
  
  		var disabledDate = function disabledDate(current) {
  			return current && current.getTime() > Date.now();
  		};
  		return _react2['default'].createElement(
  			'div',
  			{ className: 'list' },
  			_react2['default'].createElement(
  				_antd.Row,
  				null,
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '24' },
  					_react2['default'].createElement(
  						_antd.Col,
  						{ span: '3' },
  						_react2['default'].createElement(
  							_antd.Button,
  							{ type: 'ghost', onClick: function () {
  									_this.request('mine');
  								} },
  							'本人订单'
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Col,
  						{ span: '3' },
  						_react2['default'].createElement(
  							_antd.Select,
  							{ defaultValue: 'showAll', onSelect: this.chooseSelect, style: { width: 120 } },
  							_react2['default'].createElement(
  								Option,
  								{ value: 'showAll' },
  								'全部'
  							),
  							_react2['default'].createElement(
  								Option,
  								{ value: 'showCreate' },
  								'创建者'
  							),
  							_react2['default'].createElement(
  								Option,
  								{ value: 'showExecute' },
  								'执行者'
  							),
  							_react2['default'].createElement(
  								Option,
  								{ value: 'showDate' },
  								'时间段'
  							),
  							_react2['default'].createElement(
  								Option,
  								{ value: 'showSelect' },
  								'类型'
  							),
  							_react2['default'].createElement(
  								Option,
  								{ value: 'showStatus' },
  								'状态'
  							)
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Col,
  						{ span: '5', className: show.showCreate || show.showExecute ? "show" : "hidden" },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '22' },
  							_react2['default'].createElement(_antd.Input, { id: 'defaultInput', placeholder: 'eg:(xxx_iwm)', ref: 'man' })
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Col,
  						{ span: '5', className: show.showSelect ? "show" : "hidden" },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '22' },
  							_react2['default'].createElement(
  								_antd.Select,
  								{ defaultValue: 'all', style: { width: 120 }, onChange: this.onSelectChange },
  								_react2['default'].createElement(
  									Option,
  									{ value: 'all' },
  									'全部'
  								),
  								_react2['default'].createElement(
  									Option,
  									{ value: 'online' },
  									'上线单'
  								),
  								_react2['default'].createElement(
  									Option,
  									{ value: 'rollback' },
  									'回滚单'
  								)
  							)
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Col,
  						{ span: '5', className: show.showStatus ? "show" : "hidden" },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '22' },
  							_react2['default'].createElement(
  								_antd.Select,
  								{ defaultValue: 'all', style: { width: 120 }, onChange: this.onStatusChange },
  								_react2['default'].createElement(
  									Option,
  									{ value: 'all' },
  									'全部'
  								),
  								_react2['default'].createElement(
  									Option,
  									{ value: '0' },
  									'新建'
  								),
  								_react2['default'].createElement(
  									Option,
  									{ value: '1' },
  									'等待执行'
  								),
  								_react2['default'].createElement(
  									Option,
  									{ value: '2' },
  									'发送任务失败'
  								),
  								_react2['default'].createElement(
  									Option,
  									{ value: '3' },
  									'等待继续执行'
  								),
  								_react2['default'].createElement(
  									Option,
  									{ value: '4' },
  									'执行完成'
  								),
  								_react2['default'].createElement(
  									Option,
  									{ value: '5' },
  									'执行失败'
  								),
  								_react2['default'].createElement(
  									Option,
  									{ value: '6' },
  									'已删除'
  								),
  								_react2['default'].createElement(
  									Option,
  									{ value: '7' },
  									'已终止'
  								)
  							)
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Col,
  						{ span: '8', className: show.showDate ? "show" : "hidden" },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '12' },
  							_react2['default'].createElement(_antd.DatePicker, { onChange: this.getStartTime, disabledDate: disabledDate })
  						),
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '12' },
  							_react2['default'].createElement(_antd.DatePicker, { onChange: this.getEndTime, disabledDate: disabledDate })
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Col,
  						{ span: '4' },
  						_react2['default'].createElement(
  							_antd.Button,
  							{ type: 'primary', onClick: this.request },
  							'查询'
  						)
  					)
  				)
  			)
  		);
  	},
  
  	onSelectChange: function onSelectChange(value) {
  		this.setState({
  			select: value
  		});
  	},
  
  	onStatusChange: function onStatusChange(value) {
  		this.setState({
  			status: value
  		});
  	},
  
  	request: function request(type) {
  		if (type == 'mine') {
  			this.props.request(type);
  		} else {
  			this.props.requestData(this.requestData());
  			this.props.request();
  		}
  	},
  
  	getStartTime: function getStartTime(Datevalue) {
  		this.setState({
  			starttime: Math.round(Datevalue.getTime() / 1000) - 24 * 60 * 60 - 1
  		});
  	},
  
  	getEndTime: function getEndTime(Datevalue) {
  		this.setState({
  			endtime: Math.round(Datevalue.getTime() / 1000)
  		});
  	},
  
  	chooseSelect: function chooseSelect(value) {
  		var show = this.state.show;
  		for (var key in show) {
  			if (key == value) {
  				show[key] = true;
  			} else {
  				show[key] = false;
  			}
  		}
  		this.setState({
  			choose: value
  		});
  
  		this.setState({
  			show: {
  				showDate: show.showDate,
  				showSelect: show.showSelect,
  				showExecute: show.showExecute,
  				showAll: show.showAll,
  				showCreate: show.showCreate,
  				showStatus: show.showStatus
  			}
  		});
  	}
  });
  
  var List = _react2['default'].createClass({
  	displayName: 'List',
  
  	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
  		var me = this;
  
  		me.setState({
  			uuapUserName: nextProps.userName
  		});
  
  		if (location.hash.indexOf('orderId') >= 0) {
  			var orderId = parseInt(location.hash.split('?')[1].split("&")[0].split("=")[1], 10);
  			this.props.changeActivityTab();
  			this.enterDetail(orderId);
  		} else {
  			var orderId = '';
  		}
  
  		me.request("mine", nextProps.userName);
  	},
  	getInitialState: function getInitialState() {
  		return {
  			result: {},
  			requestData: {},
  			uuapUserName: ""
  		};
  	},
  
  	componentDidMount: function componentDidMount() {
  		if (location.hash.indexOf('orderId') >= 0) {
  			var orderId = parseInt(location.hash.split('?')[1].split("&")[0].split("=")[1], 10);
  			this.props.changeActivityTab();
  			this.enterDetail(orderId);
  		} else {
  			var orderId = '';
  		}
  
  		this.request("mine");
  	},
  
  	request: function request(type, uuapUserName) {
  		if (!uuapUserName && !this.state.uuapUserName) {
  			return;
  		}
  		var me = this;
  		(0, _reqwest2['default'])({
  			type: 'JSON',
  			url: '/v1/order/list',
  			headers: {
  				'UUAP-USERNAME': uuapUserName || me.state.uuapUserName
  			},
  			data: type == 'mine' ? { type: 'mine' } : me.Data
  		}).then(function (res) {
  			if (res.status == 200) {
  				var result = JSON.parse(res.response);
  				if (result.errno == 0) {
  					me.setState({
  						result: result
  					});
  				}
  			}
  		});
  	},
  
  	render: function render() {
  		var result = this.state.result && this.state.result.data || [];
  		var columns = this.columns();
  
  		var pagination = {
  			total: result.length,
  			showSizeChanger: true
  		};
  
  		return _react2['default'].createElement(
  			'div',
  			null,
  			_react2['default'].createElement(Filter, { requestData: this.requestData, activeKey: this.props.activeKey, request: this.request }),
  			_react2['default'].createElement(_antd.Table, { columns: columns, dataSource: result, pagination: pagination })
  		);
  	},
  
  	columns: function columns() {
  		var me = this;
  		var columns = [{
  			title: 'ID',
  			dataIndex: 'orderId',
  			render: function render(text, record) {
  				if (text) {
  					return _react2['default'].createElement(
  						'a',
  						{ onClick: function () {
  								me.enterDetail(record.orderId);
  							} },
  						text
  					);
  				} else {
  					return "-";
  				}
  			}
  		}, {
  			title: '名称',
  			dataIndex: 'orderName'
  
  		}, {
  			title: '创建者',
  			dataIndex: 'userName',
  			render: function render(text, record) {
  				return record.userName && record.userName != 'null' ? record.userName : "-";
  			}
  		}, {
  			title: '执行者',
  			dataIndex: 'operationUserName',
  			render: function render(text, record) {
  				return record.operationUserName == "" || record.operationUserName == 'null' ? "-" : record.operationUserName;
  			}
  		}, {
  			title: '创建时间',
  			dataIndex: 'createTime',
  			render: function render(text, record) {
  				return record.createTime == 0 ? '-' : _staticJsUtilsUtilsJs2['default'].dateFormat(new Date(record.createTime * 1000), 'yyyy-MM-dd hh:mm:ss');
  			}
  		}, {
  			title: '完成时间',
  			dataIndex: 'endTime',
  			render: function render(text, record) {
  				return record.endTime == 0 ? '-' : _staticJsUtilsUtilsJs2['default'].dateFormat(new Date(record.endTime * 1000), 'yyyy-MM-dd hh:mm:ss');
  			}
  		}, {
  			title: '上线时间',
  			dataIndex: 'startTime',
  			render: function render(text, record) {
  				return record.startTime == 0 ? '-' : _staticJsUtilsUtilsJs2['default'].dateFormat(new Date(record.startTime * 1000), 'yyyy-MM-dd hh:mm:ss');
  			}
  		}, {
  			title: '状态',
  			dataIndex: 'status',
  			render: function render(text, record) {
  				var sta = record.status;
  				switch (sta) {
  					case 0:
  						sta = '新建';
  						break;
  					case 1:
  						sta = '等待执行';
  						break;
  					case 2:
  						sta = '发送任务失败';
  						break;
  					case 3:
  						sta = '等待继续执行';
  						break;
  					case 4:
  						sta = '执行完成';
  						break;
  					case 5:
  						sta = '已删除';
  						break;
  					case 6:
  						sta = '失败';
  						break;
  					case 7:
  						sta = '已终止';
  						break;
  					default:
  						sta = '-';
  						break;
  				}
  				return sta;
  			}
  		}, {
  			title: '类型',
  			dataIndex: 'orderType',
  			render: function render(text) {
  				if (text == 0) {
  					return '上线单';
  				} else {
  					return '回滚单';
  				}
  			}
  		}, {
  			title: '操作',
  			dataIndex: 'address',
  			render: function render(text, record) {
  				var del = record.status == 0 && record.contentType != 1 ? false : true;
  
  				var roll = record.contentType != 1 ? false : true;
  				return _react2['default'].createElement(
  					'div',
  					null,
  					_react2['default'].createElement(
  						_antd.Button,
  						{ type: 'primary', size: 'small', onClick: function () {
  								me.deleteOrder(record.orderId);
  							}, disabled: del },
  						'删除'
  					),
  					_react2['default'].createElement(
  						_antd.Button,
  						{ type: 'primary', size: 'small', onClick: function () {
  								me.forceFinish(record.orderId, record.status);
  							}, disabled: roll },
  						'回滚'
  					),
  					_react2['default'].createElement(
  						_antd.Button,
  						{ type: 'primary', size: 'small', onClick: function () {
  								me.enterDetail(record.orderId);
  							} },
  						'详情'
  					)
  				);
  			}
  		}];
  
  		return columns;
  	},
  	enterDetail: function enterDetail(id) {
  		window.isOnce = false;
  		this.props.showDetail(true);
  		location.hash = 'online/detail?orderId=' + id;
  		this.props.changeActivityTab();
  		location.reload();
  	},
  
  	forceFinish: function forceFinish(orderId, status) {
  		var me = this;
  
  		if (status == 3 || status == 4) {
  			me.rollback(orderId);
  			return;
  		}
  
  		(0, _reqwest2['default'])({
  			type: 'JSON',
  			url: '/v1/order/forceFinish',
  			headers: {
  				'UUAP-USERNAME': me.props.userName
  			},
  			data: { "orderId": orderId }
  		}).then(function (res) {
  			if (res.status == 200) {
  				var result = JSON.parse(res.response);
  				if (result.errno == 0) {
  					me.rollback(orderId);
  				} else {
  					_antd.message.error('回滚单创建失败  ' + (0, _errnoJs2['default'])(result.errno), 4);
  				}
  			}
  		});
  	},
  
  	rollback: function rollback(orderId) {
  		var result = this.state.result;
  		var newObj = result.data.filter(function (obj) {
  			return obj.orderId == orderId;
  		});
  		var me = this;
  		var data = {
  			OrderName: newObj[0].orderName,
  			OrderType: 1,
  			ModuleName: newObj[0].moduleName,
  			ModuleVersion: newObj[0].moduleLastVersion,
  			HookBefore: newObj[0].hookBefore,
  			HookAfter: newObj[0].hookAfter
  		};
  
  		(0, _reqwest2['default'])({
  			type: 'JSON',
  			url: '/v1/order/commit',
  			method: 'post',
  			headers: {
  				'UUAP-USERNAME': me.props.userName
  			},
  			data: JSON.stringify({ "data": data })
  		}).then(function (res) {
  			if (res.status == 200) {
  				var result = JSON.parse(res.response);
  				if (result.errno == 0) {
  					_antd.message.success('回滚单创建完成', 3);
  					//me.request();
  					me.props.showDetail(true);
  					location.hash = 'online/detail?orderId=' + result.data.Id;
  					me.props.changeActivityTab();
  				} else {
  					_antd.message.error('回滚单创建失败  ' + (0, _errnoJs2['default'])(result.errno), 4);
  				}
  			}
  		});
  	},
  
  	deleteOrder: function deleteOrder(id) {
  		var me = this;
  		(0, _reqwest2['default'])({
  			type: 'JSON',
  			url: '/v1/order/delete',
  			headers: {
  				'UUAP-USERNAME': me.props.userName
  			},
  			method: 'post',
  			data: JSON.stringify({ "data": { "orderId": id } })
  		}).then(function (res) {
  			if (res.status == 200) {
  				var result = JSON.parse(res.response);
  				if (result.errno == 0) {
  					_antd.message.success('删除成功', 3);
  					me.request();
  				} else {
  					_antd.message.error('删除失败  ' + (0, _errnoJs2['default'])(result.errno), 4);
  				}
  				me.setState({
  					choose: 'mine'
  				});
  				me.request();
  			}
  		});
  	},
  
  	requestData: function requestData(_requestData) {
  		this.Data = _requestData;
  	}
  });
  exports['default'] = List;
  module.exports = exports['default'];

});
