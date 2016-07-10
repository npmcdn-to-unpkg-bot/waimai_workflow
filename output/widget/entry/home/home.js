define('ops:widget/entry/home/home.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
  	value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('ops:components/react/react.js');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require('ops:components/antd/lib/index.js');
  
  var _reactRouter = require('ops:components/react-router/lib/index.js');
  
  '';
  
  var Home = _react2['default'].createClass({
  	displayName: 'Home',
  
  	render: function render() {
  		var height = '50%';
  		var right = 'right';
  		var bgColor = '#190c26';
  		return _react2['default'].createElement(
  			'div',
  			{ id: 'home' },
  			_react2['default'].createElement(
  				'div',
  				{ className: 'lun' },
  				_react2['default'].createElement(
  					_antd.Carousel,
  					{ autoplay: true },
  					_react2['default'].createElement(
  						'div',
  						{ style: { height: height } },
  						_react2['default'].createElement(
  							'div',
  							{ className: 'center' },
  							_react2['default'].createElement(
  								'div',
  								{ className: 'all' },
  								_react2['default'].createElement(
  									'div',
  									{ className: 'left' },
  									_react2['default'].createElement('img', { src: '/widget/entry/home/img/online.png' })
  								),
  								_react2['default'].createElement(
  									'div',
  									{ className: 'right' },
  									_react2['default'].createElement('img', { className: 'des', src: '/widget/entry/home/img/one.png' })
  								)
  							)
  						)
  					),
  					_react2['default'].createElement(
  						'div',
  						null,
  						_react2['default'].createElement(
  							'div',
  							{ className: 'center' },
  							_react2['default'].createElement(
  								'div',
  								{ className: 'all' },
  								_react2['default'].createElement(
  									'div',
  									{ className: 'left' },
  									_react2['default'].createElement('img', { src: '/widget/entry/home/img/limitmodule.png' })
  								),
  								_react2['default'].createElement(
  									'div',
  									{ className: 'right' },
  									_react2['default'].createElement('img', { className: 'des', src: '/widget/entry/home/img/online.png' })
  								)
  							)
  						)
  					),
  					_react2['default'].createElement(
  						'div',
  						null,
  						_react2['default'].createElement(
  							'div',
  							{ className: 'center' },
  							_react2['default'].createElement(
  								'div',
  								{ className: 'all' },
  								_react2['default'].createElement(
  									'div',
  									{ className: 'left' },
  									_react2['default'].createElement('img', { src: '/widget/entry/home/img/workflow.png' })
  								),
  								_react2['default'].createElement(
  									'div',
  									{ className: 'right' },
  									_react2['default'].createElement('img', { className: 'des', src: '/widget/entry/home/img/workflow.png' })
  								)
  							)
  						)
  					),
  					_react2['default'].createElement(
  						'div',
  						null,
  						_react2['default'].createElement(
  							'div',
  							{ className: 'center' },
  							_react2['default'].createElement(
  								'div',
  								{ className: 'all' },
  								_react2['default'].createElement(
  									'div',
  									{ className: 'left' },
  									_react2['default'].createElement('img', { src: '/widget/entry/home/img/cmdb.png' })
  								),
  								_react2['default'].createElement(
  									'div',
  									{ className: 'right' },
  									_react2['default'].createElement('img', { className: 'des', src: '/widget/entry/home/img/online.png' })
  								)
  							)
  						)
  					)
  				)
  			),
  			_react2['default'].createElement(
  				'div',
  				{ className: 'order clearfix' },
  				_react2['default'].createElement(
  					'div',
  					{ className: 'left' },
  					_react2['default'].createElement('img', { src: '/widget/entry/home/img/icon1.png' })
  				),
  				_react2['default'].createElement(
  					'div',
  					{ className: 'right' },
  					_react2['default'].createElement(
  						'h1',
  						null,
  						'一站式服务'
  					),
  					_react2['default'].createElement(
  						'div',
  						{ className: 'content' },
  						'运维平台一站式服务，集成各种服务与组件，达到op、rd、qa的一站式服务操作体验。上线系统、权限模块已经上线，workflow、cmdb在开发中，陆续会上线更多的服务。敬请期待。'
  					)
  				),
  				_react2['default'].createElement('div', { className: 'diveder clearfix' })
  			),
  			_react2['default'].createElement(
  				'div',
  				{ className: 'order clearfix' },
  				_react2['default'].createElement(
  					'div',
  					{ className: 'left' },
  					_react2['default'].createElement(
  						'h1',
  						null,
  						'通用服务支持'
  					),
  					_react2['default'].createElement(
  						'div',
  						{ className: 'content' },
  						'前期会做一些基础服务，如权限模块、workflow，内部的平台和非运维的平台，只要使用相同的权限和流程都可以复用，也可以自定义自己的权限和流程。欢迎各种服务的对接。'
  					)
  				),
  				_react2['default'].createElement(
  					'div',
  					{ className: 'right' },
  					_react2['default'].createElement(
  						'div',
  						{ className: 'img' },
  						_react2['default'].createElement('img', { src: '/widget/entry/home/img/icon2.png' })
  					)
  				)
  			)
  		);
  	}
  });
  
  exports['default'] = Home;
  module.exports = exports['default'];

});
