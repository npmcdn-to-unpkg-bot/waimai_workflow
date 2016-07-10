define('ops:widget/search/Search.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('ops:components/react/react.js');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRouter = require('ops:components/react-router/lib/index.js');
  
  var _antd = require('ops:components/antd/lib/index.js');
  
  var _staticJsUtilsAjaxJs = require('ops:static/js/utils/ajax.js');
  
  var _staticJsUtilsAjaxJs2 = _interopRequireDefault(_staticJsUtilsAjaxJs);
  
  var style = {
      topMenu: {
          position: 'relative',
          width: '70%',
          height: '50px',
          marginTop: '100px',
          marginLeft: '50px'
      },
      dropBtn: {
          marginLeft: '10px',
          float: 'left'
      },
  
      batchManage: {
          position: 'absolute',
          right: 0
      },
      table: {
          marginLeft: '55px',
          marginTop: '10px'
      },
      input: {
          borderRadius: '5px',
          marginTop: '2px',
          outline: 'none',
          height: '25px'
      },
      secondMenu: {
          marginLeft: '50px',
          marginTop: '20px'
      },
      search: {
          float: 'left',
          marginLeft: '10px'
      },
      secondMenu: {
          position: 'absolute',
          width: '100%',
          top: '0px',
          left: '0',
          borderBottom: '1px solid #ccc',
          paddingTop: '20px',
          paddingBottom: '20px',
          paddingLeft: '50px',
          backgroundColor: '#ffffff',
          zIndex: 1
      }
  };
  
  var search = _react2['default'].createClass({
      displayName: 'search',
  
      getInitialState: function getInitialState() {
          return {
              visible: false,
              sourceData: [],
              arr: ['ID', '主机名', 'IP', '机器ID', '系统UUID', '内核版本', '操作系统', 'CPU核数', 'CPU类型', 'CPU物理核', 'GCC版本', '虚拟化', '内存型号', '内存大小', '磁盘型号', '磁盘大小'].map(function (v, i) {
                  return {
                      name: v,
                      checked: i < 5
                  };
              })
          };
      },
      componentWillMount: function componentWillMount() {
          var that = this;
          (0, _staticJsUtilsAjaxJs2['default'])({
              headers: {
                  'content-type': 'application/json'
              }
          }).get('/cmdb/batch/nodes?nodeid=1111').then(function (res) {
              that.setState({
                  sourceData: res.items.map(function (item, index) {
                      return {
                          key: index,
                          'ID': item.externalID,
                          '主机名': item.hostname,
                          'IP': item.ip,
                          '机器ID': item.nodeInfo.machineID,
                          '系统UUID': item.nodeInfo.systemUUID,
                          '内核版本': item.nodeInfo.kernelVersion,
                          '操作系统': item.nodeInfo.osImage,
                          'CPU核数': item.nodeInfo.cpuCore,
                          'CPU类型': item.nodeInfo.cpuModel,
                          'CPU物理核': item.nodeInfo.cpuPhysical,
                          'GCC版本': item.nodeInfo.gccVersion,
                          '虚拟化': item.nodeInfo.virtualization,
                          '内存型号': item.nodeInfo.memModel,
                          '内存大小': item.nodeInfo.memSize,
                          '磁盘型号': item.nodeInfo.diskModel,
                          '磁盘大小': item.nodeInfo.diskSize
                      };
                  })
              });
          });
      },
      showModal: function showModal(e) {
          this.setState({
              visible: true
          });
      },
      handleOk: function handleOk() {
          this.setState({
              visible: false
          });
      },
      handleCancel: function handleCancel() {
          this.setState({
              visible: false
          });
      },
      onChange: function onChange(index, e) {
          var arr = this.state.arr;
  
          arr[index].checked = e.target.checked;
          this.setState({
              arr: arr
          });
      },
  
      render: function render() {
          var _this = this;
  
          var arr = this.state.arr;
          var sourceData = this.state.sourceData;
  
          var menu = _react2['default'].createElement(
              _antd.Menu,
              { onClick: this.handleMenuClick },
              _react2['default'].createElement(
                  _antd.Menu.Item,
                  { key: '1' },
                  _react2['default'].createElement(
                      _reactRouter.Link,
                      { to: '/mainengine' },
                      '主机管理'
                  )
              ),
              _react2['default'].createElement(
                  _antd.Menu.Item,
                  { key: '2' },
                  '第二个菜单项'
              ),
              _react2['default'].createElement(
                  _antd.Menu.Item,
                  { key: '3' },
                  '第三个菜单项'
              )
          );
  
          var columns = arr.filter(function (v) {
              return v.checked;
          }).map(function (item, index) {
              return {
                  title: item.name,
                  dataIndex: item.name
              };
          });
  
          var pagination = {
              total: this.state.sourceData.length,
              current: 1,
              showSizeChanger: true
          };
          var a = 2;
          return _react2['default'].createElement(
              'div',
              null,
              _react2['default'].createElement(
                  'div',
                  { className: 'topMenu', style: style.topMenu },
                  _react2['default'].createElement(
                      'div',
                      { style: style.dropBtn },
                      _react2['default'].createElement(
                          _antd.Button,
                          { type: 'primary' },
                          '查找'
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { style: style.dropBtn },
                      _react2['default'].createElement('input', { style: style.input, type: 'text' })
                  ),
                  _react2['default'].createElement(
                      'div',
                      { style: style.dropBtn },
                      _react2['default'].createElement(
                          _antd.Button,
                          { type: 'primary', onClick: this.showModal },
                          '设置字段'
                      ),
                      _react2['default'].createElement(
                          _antd.Modal,
                          { title: '设置显示字段名称', visible: this.state.visible,
                              onOk: this.handleOk, onCancel: this.handleCancel,
                              okText: 'OK', cancelText: 'Cancel' },
                          arr.map(function (v, i) {
                              return _react2['default'].createElement(
                                  'label',
                                  { key: i },
                                  _react2['default'].createElement(_antd.Checkbox, { defaultChecked: v.checked, onChange: _this.onChange.bind(_this, i) }),
                                  v.name
                              );
                          })
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { style: style.dropBtn },
                      _react2['default'].createElement(
                          _antd.Button,
                          { type: 'primary' },
                          '高级查询'
                      )
                  )
              ),
              _react2['default'].createElement(
                  'div',
                  { style: style.table },
                  columns.length ? _react2['default'].createElement(_antd.Table, { columns: columns, dataSource: this.state.sourceData, pagination: pagination }) : null
              )
          );
      }
  });
  
  exports['default'] = search;
  module.exports = exports['default'];

});
