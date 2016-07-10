define('ops:widget/online/detail.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
  	value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('ops:components/react/react.js');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require('ops:components/antd/lib/index.js');
  
  var _modalJsx = require('ops:widget/online/modal.jsx');
  
  var _modalJsx2 = _interopRequireDefault(_modalJsx);
  
  var _reqwest = require('reqwest');
  
  var _reqwest2 = _interopRequireDefault(_reqwest);
  
  var _staticJsUtilsUtilsJs = require('ops:static/js/utils/utils.js');
  
  var _staticJsUtilsUtilsJs2 = _interopRequireDefault(_staticJsUtilsUtilsJs);
  
  var _errnoJs = require('ops:widget/online/errno.js');
  
  var _errnoJs2 = _interopRequireDefault(_errnoJs);
  
  var FormItem = _antd.Form.Item;
  var Step = _antd.Steps.Step;
  
  var Info = _react2['default'].createClass({
  	displayName: 'Info',
  
  	getInitialState: function getInitialState() {
  		return {
  			isShowKey: false
  		};
  	},
  
  	componentWillReceiveProps: function componentWillReceiveProps() {
  		this.render();
  	},
  	render: function render() {
  		var formItemLayout = {
  			labelCol: { span: 6 },
  			wrapperCol: { span: 14 }
  		};
  
  		var info = this.props.basicInfo;
  		return _react2['default'].createElement(
  			'div',
  			{ className: 'info clearfix' },
  			_react2['default'].createElement(
  				_antd.Col,
  				{ span: '12' },
  				_react2['default'].createElement(
  					_antd.Row,
  					null,
  					_react2['default'].createElement(
  						_antd.Col,
  						{ span: '23', className: 'title' },
  						_react2['default'].createElement(
  							'h2',
  							null,
  							'基本信息'
  						)
  					)
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '12' },
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'item' },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '7', className: 'right' },
  							'ID：'
  						),
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '17' },
  							info.orderId
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'item' },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '7', className: 'right' },
  							'类型：'
  						),
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '17' },
  							info.orderType == 0 ? "上线单" : '回滚单'
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'item' },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '7', className: 'right' },
  							'创建者：'
  						),
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '17' },
  							info.orderCreateUserName == "" ? "暂无" : info.orderCreateUserName
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'item' },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '7', className: 'right' },
  							'状态：'
  						),
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '17' },
  							this.getStatus(info.orderStatus)
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'item' },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '7', className: 'right' },
  							'结束时间：'
  						),
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '17' },
  							info.orderEndTime == 0 ? '暂无' : _staticJsUtilsUtilsJs2['default'].dateFormat(new Date(info.orderEndTime * 1000), 'yyyy-MM-dd hh:mm:ss')
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'item' },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '7', className: 'right' },
  							'前置命令：'
  						),
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '17' },
  							info.hookBefore == '' ? '暂无' : info.hookBefore
  						)
  					)
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '12' },
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'item' },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '7', className: 'right' },
  							'名称：'
  						),
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '17' },
  							info.orderName
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'item' },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '7', className: 'right' },
  							'上线内容：'
  						),
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '17' },
  							info.orderContentType == 0 ? "代码上线" : "配置文件上线"
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'item' },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '7', className: 'right' },
  							'执行者：'
  						),
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '17' },
  							info.orderOperationUserName == "" ? "暂无" : info.orderOperationUserName
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'item' },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '7', className: 'right' },
  							'创建时间：'
  						),
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '17' },
  							_staticJsUtilsUtilsJs2['default'].dateFormat(new Date(info.orderCreateTime * 1000), 'yyyy-MM-dd hh:mm:ss')
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'item' },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '7', className: 'right' },
  							'后置命令：'
  						),
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '17' },
  							info.hookAfter == '' ? '暂无' : info.hookAfter
  						)
  					)
  				)
  			),
  			_react2['default'].createElement(
  				_antd.Col,
  				{ span: '12' },
  				_react2['default'].createElement(
  					_antd.Row,
  					{ style: { marginLeft: '20px' } },
  					_react2['default'].createElement(
  						_antd.Col,
  						{ span: '23', className: 'title' },
  						_react2['default'].createElement(
  							'h2',
  							null,
  							'模块信息'
  						)
  					)
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '12', className: 'padding_right partline' },
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'item' },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '7', className: 'right' },
  							'模块名称：'
  						),
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '17' },
  							info.moduleName
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'item' },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '7', className: 'right' },
  							'路径：'
  						),
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '17' },
  							info.modulePath
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'item' },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '7', className: 'right' },
  							'稳定版本：'
  						),
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '17' },
  							info.lastVersion == '' ? '暂无' : info.lastVersion
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'item' },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '8', className: 'right' },
  							'待上线版本：'
  						),
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '16' },
  							info.moduleVersion == '' ? '暂无' : info.moduleVersion
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'item' },
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '7', className: 'right' },
  							'BNS列表：'
  						),
  						_react2['default'].createElement(
  							_antd.Col,
  							{ span: '17' },
  							this.getBns(info)
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'item' },
  						info.lastVersion == '0.0.0.0' || info.lastVersion == '' ? _react2['default'].createElement(
  							_antd.Button,
  							{ type: 'primary', size: 'large', onClick: this.openKey },
  							'解锁'
  						) : ''
  					)
  				)
  			)
  		);
  	},
  
  	openKey: function openKey() {
  		var me = this;
  		var orderId = this.props.orderId;
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
  					me.setState({
  						isShowKey: false
  					});
  					_antd.message.success('解锁成功', 3);
  				} else {
  					_antd.message.error('解锁失败  ' + (0, _errnoJs2['default'])(result.errno), 4);
  				}
  			}
  		});
  	},
  
  	getBns: function getBns(info) {
  		if (!info.bnsInfo) {
  			return;
  		}
  		var bns = info.bnsInfo;
  		var array = [];
  		bns.map(function (i, k) {
  			array.push(_react2['default'].createElement(
  				_antd.Col,
  				{ key: k },
  				i
  			));
  		});
  
  		return array;
  	},
  
  	getStatus: function getStatus(sta) {
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
  });
  
  var Online = _react2['default'].createClass({
  	displayName: 'Online',
  
  	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
  		if (location.hash.indexOf('orderId') >= 0) {
  			var orderId = parseInt(location.hash.split('?')[1].split("&")[0].split("=")[1], 10);
  		} else {
  			var orderId = '';
  		}
  
  		this.checkStatus('mirror', orderId);
  	},
  
  	getInitialState: function getInitialState() {
  		return {
  			isShowDetail: false,
  			onlineState: {
  				start: [0, ''], //状态，失败原因
  				mirror: [0, ''],
  				stop: [0, ''],
  				all: [0, '']
  			},
  			step: '', //当前步骤key  start,mirror,stop,all
  			stepNum: 0, //当前步骤
  			mirrorInfo: {},
  			stopInfo: {},
  			allInfo: {},
  			modalInfo: {}
  		};
  	},
  
  	changeNext: function changeNext(type) {
  		if (type == 'mirror') {
  			this.changeStep('stop');
  		} else if (type == 'stop') {
  			this.changeStep('all');
  		} else if (type == 'all') {
  			this.setState({
  				stepNum: 4
  			});
  		}
  	},
  
  	changePre: function changePre(type) {
  		if (window.isOnce) {
  			return;
  		}
  		if (type == 'mirror' || type == 'start') {
  			this.changeStep('start');
  			window.isOnce = true;
  		} else if (type == 'stop') {
  			this.changeStep('mirror');
  			window.isOnce = true;
  		} else if (type == 'all') {
  			this.changeStep('stop');
  			window.isOnce = true;
  		}
  	},
  
  	checkStatus: function checkStatus(type, orderId) {
  		var me = this;
  		//var step = this.state.step;
  
  		me.orderId = orderId;
  		if (!orderId && !me.props.userName) {
  			return;
  		}
  
  		(0, _reqwest2['default'])({
  			type: 'JSON',
  			url: '/v1/order/pauseStatus',
  			headers: {
  				'UUAP-USERNAME': me.props.userName
  			},
  			data: { "orderId": orderId, 'type': type }
  		}).then(function (res) {
  			if (res.status == 200) {
  				var result = JSON.parse(res.response);
  				//存储详情机器信息
  				if (result.errno == 0) {
  					me.saveInfo(type, result);
  					me.onChangeModalInfo(result.data.data);
  					if (type == 'mirror') {
  
  						me.checkStatus('stop', me.orderId);
  					} else if (type == 'stop') {
  						me.checkStatus('all', me.orderId);
  					}
  
  					if (result.data.result != 'DOING') {
  						if (result.data.result == 'SUCCESS') {
  							if (type == 'mirror') {
  								me.showSuccess('start');
  							}
  
  							me.showSuccess(type);
  							me.changeNext(type);
  						} else if (result.data.result == 'WAITING') {
  							if (type == 'mirror') {
  								me.showWait('start');
  								me.changePre('start');
  							}
  							me.showWait(type);
  							me.changePre(type);
  						} else if (result.data.result == 'FAIL') {
  							if (type == 'mirror') {
  								me.showSuccess('start');
  							}
  							me.showFail(type, result.errno);
  						}
  					}
  				} else {
  					if (type == 'mirror') {
  						me.showSuccess('start');
  					}
  					me.showFail(type, result.errno);
  				}
  			}
  		});
  	},
  
  	saveInfo: function saveInfo(type, result) {
  		var me = this;
  		if (type == 'mirror') {
  			me.setState({
  				mirrorInfo: result.data.data
  			});
  		} else if (type == 'stop') {
  			me.setState({
  				stopInfo: result.data.data
  			});
  		} else if (type == 'all') {
  			me.setState({
  				allInfo: result.data.data
  			});
  		}
  	},
  
  	render: function render() {
  		var _this = this;
  
  		var onlineState = this.state.onlineState;
  		var isStart = this.state.stepNum == 0 ? false : true;
  		var isMirrorReDo = this.state.stepNum == 1 ? false : true;
  		var isStopGo = this.state.stepNum == 2 ? false : true;
  		var isAllGo = this.state.stepNum == 3 ? false : true;
  		var isShowReDo = this.props.basicInfo.orderStatus == 4 || this.props.basicInfo.orderStatus == 5 ? true : false;
  		var steps = [{
  			title: '任务提交' }, {
  			title: 'mirror' }, {
  			title: '暂停点' }, {
  			title: '全量' }].map(function (s, i) {
  			return _react2['default'].createElement(Step, { key: i, title: s.title, description: s.description });
  		});
  		return _react2['default'].createElement(
  			'div',
  			{ className: this.props.className + " online" },
  			_react2['default'].createElement(
  				_antd.Row,
  				{ className: 'head' },
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '6' },
  					'上线步骤'
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '6' },
  					'状态'
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '6' },
  					'操作'
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '6' },
  					'原因'
  				)
  			),
  			_react2['default'].createElement(
  				_antd.Row,
  				{ className: 'grid' },
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '6', className: 'pad' },
  					_react2['default'].createElement(
  						_antd.Steps,
  						{ direction: 'vertical', current: this.state.stepNum },
  						steps
  					)
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '6' },
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'content' },
  						this.onState(onlineState.start)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'content' },
  						this.onState(onlineState.mirror)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'content' },
  						this.onState(onlineState.stop)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'content' },
  						this.onState(onlineState.all)
  					)
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '6' },
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'content' },
  						_react2['default'].createElement(
  							_antd.Button,
  							{ ref: 'start', disabled: isStart, type: 'primary', size: 'small', onClick: function () {
  									_this.onStart('start');
  								} },
  							'上线'
  						),
  						_react2['default'].createElement(
  							_antd.Button,
  							{ type: 'primary', size: 'small', onClick: function () {
  									_this.onStart('start');
  								}, disabled: isShowReDo },
  							'重做'
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'content' },
  						_react2['default'].createElement(
  							_antd.Button,
  							{ type: 'primary', size: 'small', value: '1', onClick: function () {
  									_this.onShowDetail(_this.state.mirrorInfo);
  								} },
  							'详情'
  						),
  						_react2['default'].createElement(
  							_antd.Button,
  							{ type: 'primary', size: 'small', onClick: function () {
  									_this.onContinue('mirror');
  								}, disabled: isShowReDo },
  							'重做'
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'content' },
  						_react2['default'].createElement(
  							_antd.Button,
  							{ type: 'primary', size: 'small', value: '1', onClick: function () {
  									_this.onShowDetail(_this.state.stopInfo);
  								} },
  							'详情'
  						),
  						_react2['default'].createElement(
  							_antd.Button,
  							{ ref: 'stop', disabled: isStopGo, type: 'primary', size: 'small', onClick: function () {
  									_this.onContinue('stop');
  								} },
  							'继续'
  						),
  						_react2['default'].createElement(
  							_antd.Button,
  							{ type: 'primary', size: 'small', onClick: function () {
  									_this.onContinue('stop');
  								}, disabled: isShowReDo },
  							'重做'
  						)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'content' },
  						_react2['default'].createElement(
  							_antd.Button,
  							{ type: 'primary', size: 'small', value: '1', onClick: function () {
  									_this.onShowDetail(_this.state.allInfo);
  								} },
  							'详情'
  						),
  						_react2['default'].createElement(
  							_antd.Button,
  							{ ref: 'all', disabled: isAllGo, type: 'primary', size: 'small', onClick: function () {
  									_this.onContinue('all');
  								} },
  							'继续'
  						),
  						_react2['default'].createElement(
  							_antd.Button,
  							{ type: 'primary', size: 'small', onClick: function () {
  									_this.onContinue('all');
  								}, disabled: isShowReDo },
  							'重做'
  						)
  					)
  				),
  				_react2['default'].createElement(
  					_antd.Col,
  					{ span: '6' },
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'content' },
  						this.onErrorMsg(onlineState.start)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'content' },
  						this.onErrorMsg(onlineState.mirror)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'content' },
  						this.onErrorMsg(onlineState.stop)
  					),
  					_react2['default'].createElement(
  						_antd.Row,
  						{ className: 'content' },
  						this.onErrorMsg(onlineState.all)
  					)
  				)
  			),
  			_react2['default'].createElement(_modalJsx2['default'], { isShow: this.state.isShowDetail, changeState: this.changeState, modalInfo: this.state.modalInfo })
  		);
  	},
  
  	onState: function onState(onlineState) {
  		var selectState = onlineState[0];
  		var state = ['待开始', _react2['default'].createElement(_antd.Icon, { type: 'loading' }), '成功', '失败'];
  		return state[selectState];
  	},
  
  	onErrorMsg: function onErrorMsg(onlineState) {
  		var errno = onlineState[1];
  		if (errno != 0) {
  			return (0, _errnoJs2['default'])(errno);
  		} else {
  			return '';
  		}
  	},
  
  	changeStep: function changeStep(step) {
  		var me = this;
  		switch (step) {
  			case 'start':
  				me.setState({
  					step: 'start',
  					stepNum: 0
  				});
  				break;
  			case 'mirror':
  				me.setState({
  					step: 'mirror',
  					stepNum: 1
  				});
  				break;
  			case 'stop':
  				me.setState({
  					step: 'stop',
  					stepNum: 2
  				});
  				break;
  			case 'all':
  				me.setState({
  					step: 'all',
  					stepNum: 3
  				});
  				break;
  			case 'end':
  				me.setState({
  					step: 'end',
  					stepNum: 4
  				});
  		}
  	},
  
  	lunxunRequest: function lunxunRequest(type) {
  		var me = this;
  		var orderId = this.props.orderId;
  		//console.log(me.props.userName)
  		(0, _reqwest2['default'])({
  			type: 'JSON',
  			url: '/v1/order/pauseStatus',
  			headers: {
  				'UUAP-USERNAME': me.props.userName
  			},
  			data: { "orderId": orderId, 'type': type }
  		}).then(function (res) {
  			if (res.status == 200) {
  				var result = JSON.parse(res.response);
  				if (result.errno == 0) {
  					me.setState({
  						lunxunInfo: result.data.data
  					});
  
  					me.saveInfo(type, result);
  					me.onChangeModalInfo(result.data.data);
  					if (result.data.result != 'DOING') {
  						if (result.data.result == 'SUCCESS') {
  							me.showSuccess(type);
  							me.changeNext(type);
  						} else if (result.data.result == 'WAITING') {
  							me.showWait(type);
  						} else {
  							me.showFail(type, result.errno);
  						}
  						clearInterval(window.interval);
  					}
  				} else {
  					clearInterval(window.interval);
  					me.showFail(type, result.errno);
  				}
  			}
  		});
  	},
  
  	lunXun: function lunXun(type) {
  		var me = this;
  		this.changeStep(type);
  		this.showLoading(type);
  		this.changeNext(type);
  		window.interval = setInterval(function () {
  			me.lunxunRequest(type);
  		}, 10000);
  	},
  
  	onContinue: function onContinue(type, id) {
  		var me = this;
  		//var step = this.state.onlineState[0];
  		var orderId = this.props.orderId;
  		me.showLoading(type);
  		(0, _reqwest2['default'])({
  			type: 'JSON',
  			url: '/v1/order/continue',
  			headers: {
  				'UUAP-USERNAME': me.props.userName
  			},
  			data: { "orderId": orderId, 'type': type }
  		}).then(function (res) {
  			if (res.status == 200) {
  				var result = JSON.parse(res.response);
  				if (result.errno == 0) {
  					me.lunXun(type);
  				} else {
  					me.showFail(type, result.errno);
  				}
  			} else {
  				me.showFail(type, result.errno);
  			}
  		});
  	},
  
  	onStart: function onStart(type, id) {
  		var me = this;
  		this.changeStep(type);
  		//var step = this.state.step;
  		this.showLoading(type);
  		(0, _reqwest2['default'])({
  			type: 'JSON',
  			url: '/v1/order/start',
  			method: 'post',
  			headers: {
  				'UUAP-USERNAME': me.props.userName
  			},
  			data: JSON.stringify({ "data": { "orderId": me.props.orderId } })
  		}).then(function (res) {
  			if (res.status == 200) {
  				var result = JSON.parse(res.response);
  				if (result.errno == 0) {
  					me.showSuccess(type);
  					me.changeStep('mirror');
  					me.lunXun('mirror');
  				} else if (result.errno == 429) {
  					me.showFail(type, 'no');
  					_antd.message.error(result.data + '上线单正在对' + me.props.basicInfo.moduleName + '模块上线', 4);
  				} else if (result.errno == 432) {
  					me.showFail(type, 'no');
  					_antd.message.error('不在' + result.data + '上线时间范围内', 4);
  				} else {
  					me.showFail(type, result.errno);
  				}
  			} else {
  				me.showFail(type, result.errno);
  			}
  		});
  	},
  
  	showFail: function showFail(type, num) {
  		this.changeStep(type);
  		var state = this.state.onlineState;
  		var step = this.state.step; //step : first,mirror...
  		state[type][0] = 3;
  		state[type][1] = num;
  
  		this.setOnlineState(state);
  	},
  
  	setOnlineState: function setOnlineState(state) {
  		this.setState({
  			onlineState: state
  		});
  	},
  
  	showWait: function showWait(type) {
  		//var step = this.state.step;
  
  		var state = this.state.onlineState;
  
  		state[type][0] = 0;
  		state[type][1] = 'no';
  
  		this.setOnlineState(state);
  	},
  
  	showSuccess: function showSuccess(type) {
  		this.changeStep(type);
  		var step = this.state.step;
  		var state = this.state.onlineState;
  
  		state[type][0] = 2;
  		state[type][1] = 'no';
  
  		this.setOnlineState(state);
  	},
  
  	showLoading: function showLoading(type) {
  		this.changeStep(type);
  		var state = this.state.onlineState;
  		var step = this.state.step;
  
  		state[type][0] = 1;
  		state[type][1] = 'no';
  
  		this.setOnlineState(state);
  	},
  
  	onShowDetail: function onShowDetail(info) {
  		this.setState({
  			isShowDetail: true,
  			modalInfo: info
  		});
  	},
  
  	onChangeModalInfo: function onChangeModalInfo(info) {
  		this.setState({
  			modalInfo: info
  		});
  	},
  
  	changeState: function changeState(sta) {
  		this.setState({
  			isShowDetail: sta
  		});
  	}
  
  });
  
  var Detail = _react2['default'].createClass({
  	displayName: 'Detail',
  
  	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
  		var me = this;
  		me.setState({
  			uuapUserName: nextProps.userName
  		});
  
  		if (location.hash.indexOf('orderId') >= 0) {
  			var orderId = parseInt(location.hash.split('?')[1].split("&")[0].split("=")[1], 10);
  		} else {
  			var orderId = '';
  		}
  		this.request(orderId, nextProps.userName);
  	},
  
  	getInitialState: function getInitialState() {
  		if (location.hash.indexOf('orderId') >= 0) {
  			var orderId = parseInt(location.hash.split('?')[1].split("&")[0].split("=")[1], 10);
  		} else {
  			var orderId = '';
  		}
  
  		return {
  			info: {},
  			orderId: orderId,
  			uuapUserName: ""
  		};
  	},
  
  	componentWillMount: function componentWillMount() {
  		location.reload();
  		this.request();
  	},
  
  	request: function request(orderId, uuapUserName) {
  		var me = this;
  		if (!uuapUserName && !this.state.uuapUserName) {
  			return;
  		}
  		var orderId = orderId || this.state.orderId;
  		(0, _reqwest2['default'])({
  			type: 'JSON',
  			url: '/v1/order/detail',
  			headers: {
  				'UUAP-USERNAME': uuapUserName || me.state.uuapUserName
  			},
  			data: { orderId: orderId }
  		}).then(function (res) {
  			if (res.status == 200) {
  				var result = JSON.parse(res.response);
  				if (result.errno == 0) {
  					me.setState({
  						info: result.data,
  						orderId: orderId
  					});
  				}
  			}
  		});
  	},
  
  	render: function render() {
  		var orderId = this.state.orderId;
  		var basicInfo = this.state.info;
  		return _react2['default'].createElement(
  			'div',
  			{ className: 'detail' },
  			_react2['default'].createElement(Info, { orderId: orderId, basicInfo: basicInfo, userName: this.state.uuapUserName }),
  			_react2['default'].createElement(Online, { orderId: orderId, basicInfo: basicInfo, userName: this.state.uuapUserName, className: basicInfo.orderStatus == 5 ? 'hidden' : 'show' })
  		);
  	},
  
  	showModal: function showModal() {}
  });
  
  exports['default'] = Detail;
  module.exports = exports['default'];

});
