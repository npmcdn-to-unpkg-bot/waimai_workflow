define('ops:widget/entry/IndexPage.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('ops:components/react/react.js');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = require('ops:components/classnames/index.js');
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _reactRouter = require('ops:components/react-router/lib/index.js');
  
  var _antd = require('ops:components/antd/lib/index.js');
  
  '';
  
  var _sidebarSidebarJsx = require('ops:widget/sidebar/Sidebar.jsx');
  
  var _sidebarSidebarJsx2 = _interopRequireDefault(_sidebarSidebarJsx);
  
  var _reqwest = require('reqwest');
  
  var _reqwest2 = _interopRequireDefault(_reqwest);
  
  var SubMenu = _antd.Menu.SubMenu;
  var MenuItemGroup = _antd.Menu.ItemGroup;
  var DropdownButton = _antd.Dropdown.Button;
  
  var style = {
      userName: {
          float: 'right',
          marginLeft: '40px',
          marginRight: '40px'
      },
  
      dropBtn: {
          marginLeft: '20px',
          float: 'left'
      },
  
      content: {
          position: 'relative',
          display: '-webkit-flex',
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          marginTop: '20px'
      },
      left: {
          // position: 'absolute',
          position: 'relative',
          width: '200px',
          height: '800px',
          border: '1px solid #ccc',
          borderRadius: '5px'
      },
  
      body: {
          width: '198px',
          height: '800px',
          overflow: 'scroll'
      },
  
      right: {
          position: 'relative',
          flex: '1',
          height: '800px',
          overflow: 'hidden',
          overflowY: 'scroll',
          border: '1px solid #ccc',
          borderRadius: '5px',
          marginLeft: '20px'
      },
      fold: {},
      treeTitle: {
          marginLeft: '10px',
          marginTop: '10px'
      },
      tree: {
          position: 'absolute',
          left: '20px'
      },
      btn: {
          backgroundColor: '#ffffff',
          zIndex: '10'
      }
  };
  
  var IndexPage = _react2['default'].createClass({
      displayName: 'IndexPage',
  
      handleButtonClick: function handleButtonClick(e) {
          console.log('click button', e);
      },
  
      handleMenuClick: function handleMenuClick(e) {
          console.log('click', e.item.props.children.props.children);
          this.setState({
              name: e.item.props.children.props.children
          });
      },
  
      foldClick: function foldClick() {
          console.log(this.state.fold);
          this.setState({
              fold: this.state.fold === '' ? 'fold' : ''
          });
      },
  
      getInitialState: function getInitialState() {
          return {
              fold: '',
              name: '主机管理',
              userName: ''
          };
      },
  
      responseHeader: function responseHeader() {
          var me = this;
          (0, _reqwest2['default'])({
              type: 'HEAD',
              url: '/index.html'
  
          }).then(function (xhr) {
              var name = xhr.getResponseHeader('UUAP-USERNAME'); //UUAP-USERNAME
              me.setState({
                  userName: name
              });
          });
      },
  
      componentDidMount: function componentDidMount() {
          document.getElementById('right').addEventListener('scroll', function () {
              console.log("scroll");
              document.getElementById('secondMenu').style.top = document.getElementById('right').scrollTop + 'px';
              if (document.getElementById('right').scrollTop > 5) {
                  document.getElementById('secondMenu').style.boxShadow = '2px 2px 6px #999';
              } else {
                  document.getElementById('secondMenu').style.boxShadow = 'none';
              }
          });
          this.responseHeader();
      },
  
      render: function render() {
          var MenuDashBoard = _react2['default'].createElement(
              _antd.Menu,
              { onClick: this.handleMenuClick },
              _react2['default'].createElement(
                  _antd.Menu.Item,
                  { key: '1' },
                  _react2['default'].createElement(
                      _reactRouter.Link,
                      { to: '/dashboard' },
                      'DashBoard'
                  )
              )
          );
          var MenuResourse = _react2['default'].createElement(
              _antd.Menu,
              { onClick: this.handleMenuClick },
              _react2['default'].createElement(
                  _antd.Menu.Item,
                  { key: '1' },
                  _react2['default'].createElement(
                      _reactRouter.Link,
                      { to: '/mainengine/search' },
                      '主机管理'
                  )
              )
          );
  
          var MenuOnline = _react2['default'].createElement(
              _antd.Menu,
              { onClick: this.handleMenuClick },
              _react2['default'].createElement(
                  _antd.Menu.Item,
                  { key: '1' },
                  _react2['default'].createElement(
                      _reactRouter.Link,
                      { to: 'online/list' },
                      '上线'
                  )
              )
          );
  
          //<Menu.Item key="mainengine">
          //<Link to="/mainengine/search"><Icon type="appstore" />CMDB</Link>
          //</Menu.Item>
          return _react2['default'].createElement(
              'div',
              null,
              _react2['default'].createElement(
                  'div',
                  { className: 'content', style: style.content },
                  _react2['default'].createElement(
                      'div',
                      { className: (0, _classnames2['default'])('left', this.state.fold), style: style.left },
                      _react2['default'].createElement(
                          'div',
                          { className: 'foldTrigger', style: style.foldTrigger, onClick: this.foldClick },
                          _react2['default'].createElement(
                              'div',
                              { className: 'arrow' },
                              '>'
                          )
                      ),
                      _react2['default'].createElement(
                          'div',
                          { className: 'body', style: style.body },
                          _react2['default'].createElement(
                              'div',
                              { className: 'treeTitle', style: style.treeTitle },
                              '服务树'
                          ),
                          _react2['default'].createElement(_sidebarSidebarJsx2['default'], { className: 'rree', style: style.tree,
                              url: 'http://noah.baidu.com/service-tree/v1/node/200556136/children' })
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'right', id: 'right', style: style.right },
                      this.props.children
                  )
              )
          );
      }
  });
  
  exports['default'] = IndexPage;
  module.exports = exports['default'];

});
