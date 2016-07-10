'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('ops:components/react/react.js');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('ops:components/react-dom/react-dom.js');

var _reactRouter = require('ops:components/react-router/lib/index.js');

'';

var _IndexPage = require('ops:widget/entry/IndexPage.jsx');

var _IndexPage2 = _interopRequireDefault(_IndexPage);

var _mainengineMainEngine = require('ops:widget/mainengine/MainEngine.jsx');

var _mainengineMainEngine2 = _interopRequireDefault(_mainengineMainEngine);

var _batchmanageBatchManage = require('ops:widget/batchmanage/BatchManage.jsx');

var _batchmanageBatchManage2 = _interopRequireDefault(_batchmanageBatchManage);

var _searchSearch = require('ops:widget/search/Search.jsx');

var _searchSearch2 = _interopRequireDefault(_searchSearch);

var _onlineOnlineJsx = require('ops:widget/online/online.jsx');

var _onlineOnlineJsx2 = _interopRequireDefault(_onlineOnlineJsx);

var _onlineList = require('ops:widget/online/list.jsx');

var _onlineList2 = _interopRequireDefault(_onlineList);

var _onlineCreate = require('ops:widget/online/create.jsx');

var _onlineCreate2 = _interopRequireDefault(_onlineCreate);

var _onlineDetail = require('ops:widget/online/detail.jsx');

var _onlineDetail2 = _interopRequireDefault(_onlineDetail);

var _homeHomeJsx = require('ops:widget/entry/home/home.jsx');

var _homeHomeJsx2 = _interopRequireDefault(_homeHomeJsx);

var _homeHeaderJsx = require('ops:widget/entry/home/header.jsx');

var _homeHeaderJsx2 = _interopRequireDefault(_homeHeaderJsx);

var Index = _react2['default'].createClass({
	displayName: 'Index',

	render: function render() {
		return _react2['default'].createElement(
			_reactRouter.Router,
			{ history: _reactRouter.hashHistory },
			_react2['default'].createElement(
				_reactRouter.Route,
				{ path: '/', component: _homeHeaderJsx2['default'] },
				_react2['default'].createElement(_reactRouter.IndexRoute, { component: _homeHomeJsx2['default'] }),
				_react2['default'].createElement(
					_reactRouter.Route,
					{ component: _IndexPage2['default'] },
					_react2['default'].createElement(
						_reactRouter.Route,
						{ path: 'mainengine', component: _mainengineMainEngine2['default'] },
						_react2['default'].createElement(_reactRouter.Route, { path: 'batchmanage', component: _batchmanageBatchManage2['default'] }),
						_react2['default'].createElement(_reactRouter.Route, { path: 'search', component: _searchSearch2['default'] })
					),
					_react2['default'].createElement(
						_reactRouter.Route,
						{ path: 'online', component: _onlineOnlineJsx2['default'] },
						_react2['default'].createElement(_reactRouter.Route, { path: 'list', component: _onlineList2['default'] }),
						_react2['default'].createElement(_reactRouter.Route, { path: 'create', component: _onlineCreate2['default'] }),
						_react2['default'].createElement(_reactRouter.Route, { path: 'back', component: _onlineCreate2['default'] }),
						_react2['default'].createElement(_reactRouter.Route, { path: 'detail', component: _onlineDetail2['default'] })
					)
				)
			)
		);
	}
});

(0, _reactDom.render)(_react2['default'].createElement(Index, null), document.getElementById('app'));