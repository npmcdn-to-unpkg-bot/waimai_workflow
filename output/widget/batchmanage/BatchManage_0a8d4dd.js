define('ops:widget/batchmanage/BatchManage.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('ops:components/react/react.js');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = require('ops:components/react-dom/react-dom.js');
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _reactRouter = require('ops:components/react-router/lib/index.js');
  
  var _antd = require('ops:components/antd/lib/index.js');
  
  var _staticJsUtilsAjaxJs = require('ops:static/js/utils/ajax.js');
  
  var _staticJsUtilsAjaxJs2 = _interopRequireDefault(_staticJsUtilsAjaxJs);
  
  '';
  
  var style = {
      submit: {
          marginTop: '70px',
          marginLeft: '60px'
      },
      input: {
          width: '500px',
          height: '200px',
          outline: 'none',
          borderRadius: '5px'
      },
      submitBtn: {
          marginTop: '10px',
          marginLeft: '60px'
      },
      message: {
          width: '500px'
      },
      table: {
          marginLeft: '55px',
          marginTop: '50px'
      }
  };
  var BatchManage = _react2['default'].createClass({
      displayName: 'BatchManage',
  
      contextTypes: {
          router: _react2['default'].PropTypes.object
      },
      getInitialState: function getInitialState() {
          return {
              message: '当前无操作',
              visible: false,
              dataInput: [],
              listShow: false,
              tableData: []
          };
      },
      submit: function submit(e) {
          var value = this.refs.test.value;
          var arr = value.split('\n');
          var url = this.props.location.query.oprate === '1' ? '/cmdb/batch/nodename/' : '/cmdb/batch/nodes/';
          var that = this;
          (0, _staticJsUtilsAjaxJs2['default'])({
              headers: {
                  'content-type': 'application/json'
              }
          }).get(url + encodeURIComponent(arr)).then(function (res) {
              that.setState({
                  dataInput: res.items,
                  visible: true,
                  listShow: true
              });
          });
      },
      deleteTableData: function deleteTableData(index) {
          var tableData = this.state.tableData;
  
          tableData.splice(index, 1);
          this.setState({
              tableData: tableData
          });
      },
      handleOk: function handleOk() {
          this.setState({
              visible: false,
              hide: 'hide',
              table: ''
          });
          var that = this;
          var successSubmit = [];
          var url = this.props.location.query.oprate === '1' ? '/cmdb/batch/nodename/' : '/cmdb/batch/nodes/';
          var data = {
              kind: "Batch",
              items: this.state.dataInput
          };
          data = { "kind": "Batch", "items": ["1.1.1.1:virtual", "1.1.1.2:physical"] };
          (0, _staticJsUtilsAjaxJs2['default'])({
              headers: {
                  'content-type': 'application/json'
                  // 'application/x-www-form-urlencoded'
              }
          }).post(url, JSON.stringify(data)).then(function (res) {
              that.setState({
                  tableData: res.items.map(function (item, index) {
                      return that.props.location.query.oprate === '1' ? {
                          oldName: item.oldName,
                          newName: item.newName,
                          key: index,
                          msg: item.msg
                      } : {
                          ip: item.ip,
                          id: item.id,
                          key: index,
                          check: _react2['default'].createElement(_antd.Icon, { type: 'cross-circle-o', onClick: that.deleteTableData.bind(this, index) })
                      };
                  })
              });
          });
      },
      handleCancel: function handleCancel(e) {
          this.setState({
              visible: false
          });
      },
      'delete': function _delete(index) {
          var dataInput = this.state.dataInput;
  
          dataInput.splice(index, 1);
          this.setState({
              dataInput: dataInput
          });
      },
      render: function render() {
          var _this = this;
  
          var mainEngineColumns = [{
              title: '名称',
              dataIndex: 'ip'
          }, {
              title: '类型',
              dataIndex: 'type'
          }, {
              title: '操作',
              dataIndex: 'check'
          }];
  
          var checkColumns = [{
              title: '修改前名称',
              dataIndex: 'oldName'
          }, {
              title: '修改后名称',
              dataIndex: 'newName'
          }, {
              title: '状态',
              dataIndex: 'msg'
          }];
  
          var columns = this.props.location.query.oprate === '1' ? checkColumns : mainEngineColumns;
  
          var data = this.state.dataInput.map(function (item, index) {
              return _react2['default'].createElement(
                  'p',
                  { key: index },
                  item.msg,
                  ' ',
                  _react2['default'].createElement(_antd.Icon, { type: 'cross-circle-o', onClick: _this['delete'].bind(_this, index) })
              );
          });
          var listShow = this.state.listShow;
  
          return _react2['default'].createElement(
              'div',
              null,
              _react2['default'].createElement(
                  'div',
                  { style: style.submit },
                  _react2['default'].createElement(
                      'div',
                      { className: 'message', style: style.message },
                      _react2['default'].createElement(_antd.Alert, { message: this.props.location.query.the, type: 'info' })
                  ),
                  _react2['default'].createElement('textarea', { type: 'text', style: style.input, ref: 'test' })
              ),
              _react2['default'].createElement(
                  'div',
                  { className: 'submitBtn', style: style.submitBtn },
                  _react2['default'].createElement(
                      _antd.Button,
                      { type: 'primary', onClick: this.submit },
                      '提交数据'
                  ),
                  _react2['default'].createElement(
                      'div',
                      { id: 'popwin' },
                      _react2['default'].createElement(
                          _antd.Modal,
                          { title: '第一个 Modal', visible: this.state.visible,
                              footer: [_react2['default'].createElement(
                                  _antd.Button,
                                  { key: 'back', type: 'ghost', size: 'large', onClick: this.handleCancel },
                                  '返 回'
                              ), _react2['default'].createElement(
                                  _antd.Button,
                                  { key: 'submit', type: 'primary', size: 'large', onClick: this.handleOk },
                                  '提交'
                              )] },
                          data
                      )
                  )
              ),
              _react2['default'].createElement(
                  'div',
                  { style: style.table },
                  columns.length ? _react2['default'].createElement(_antd.Table, { columns: columns, dataSource: this.state.tableData }) : null
              )
          );
      }
  });
  
  exports['default'] = BatchManage;
  module.exports = exports['default'];

});
