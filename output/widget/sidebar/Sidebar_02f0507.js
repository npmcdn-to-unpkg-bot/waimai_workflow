define('ops:widget/sidebar/Sidebar.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
  
  var _react = require('ops:components/react/react.js');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require('ops:components/antd/lib/index.js');
  
  var _staticJsUtilsJsonpJs = require('ops:static/js/utils/jsonp.js');
  
  var _staticJsUtilsJsonpJs2 = _interopRequireDefault(_staticJsUtilsJsonpJs);
  
  var TreeNode = _antd.Tree.TreeNode;
  
  function setTreeData(tree, pos, data) {
      var curPos = pos.shift();
      if (pos.length === 0) {
          tree[curPos].children = data;
          for (var i = 0; i < tree[curPos].children.length; i++) {
              if (tree[curPos].children[i].type == 'serviceUnit') {
                  tree[curPos].children[i].isLeaf = true;
              }
          }
          console.log('1', tree[curPos].children);
      } else {
          tree[curPos].children = setTreeData(tree[curPos].children, pos, data);
          for (var i = 0; i < tree[curPos].children.length; i++) {
              if (tree[curPos].children[i].type == 'serviceUnit') {
                  tree[curPos].children[i].isLeaf = true;
              }
          }
          console.log('2', tree[curPos].children);
      }
      return tree;
  }
  var Sidebar = _react2['default'].createClass({
      displayName: 'Sidebar',
  
      getInitialState: function getInitialState() {
          return {
              treeData: []
          };
      },
      componentDidMount: function componentDidMount() {
          var _this = this;
  
          var self = this;
          setTimeout(function () {
              (0, _staticJsUtilsJsonpJs2['default'])(_this.props.url, function (err, res) {
                  self.setState({
                      treeData: Object.keys(res).map(function (v) {
                          return res[v];
                      })
                  });
              });
          }, 100);
      },
      onLoadData: function onLoadData(treeNode) {
          var _this2 = this;
  
          // console.log(treeNode);
          var pos = treeNode.props.eventKey.split('-').slice(1);
          var self = this;
          return new Promise(function (resolve) {
              var treeData = [].concat(_toConsumableArray(_this2.state.treeData));
              (0, _staticJsUtilsJsonpJs2['default'])('http://noah.baidu.com/service-tree/v1/node/' + treeNode.props.id + '/children', function (err, res) {
                  self.setState({
                      treeData: setTreeData(treeData, pos, Object.keys(res).map(function (v) {
                          return res[v];
                      }))
                  });
                  resolve();
              });
          });
      },
      render: function render() {
          var loop = function loop(data, level) {
              return data.map(function (item, index) {
                  // console.log(data, level)
                  var newLevel = level + '-' + index;
                  if (item.children) {
                      return _react2['default'].createElement(
                          TreeNode,
                          { title: item.name, key: newLevel,
                              id: item.id },
                          loop(item.children, newLevel)
                      );
                  }
                  return _react2['default'].createElement(TreeNode, { title: item.name, key: newLevel, id: item.id, isLeaf: item.isLeaf,
                      disabled: item.key === '0-0-0' });
              });
          };
          var treeNodes = loop(this.state.treeData, '0');
          return(
              /*<Tree loadData={this.onLoadData}> onSelect={this.onSelect}*/
              _react2['default'].createElement(
                  _antd.Tree,
                  { loadData: this.onLoadData },
                  treeNodes
              )
          );
      }
  });
  
  exports['default'] = Sidebar;
  module.exports = exports['default'];

});
