import React from 'react';
import { render } from 'react-dom';
import { hashHistory, Router, Route, IndexRoute, Link, IndexLink,IndexRedirect} from 'react-router';
import '../../static/css/custom.less';
import IndexPage from './IndexPage';
import MainEngine from '../mainengine/MainEngine';
import BatchManage from '../batchmanage/BatchManage';
import Search from '../search/Search';
import OnLine from '../online/online.jsx';
import List from '../online/list';
import Create from '../online/create';
import Detail from '../online/detail';
import Home from 'home/home.jsx'
import Header from 'home/header.jsx'

import WorkFlow from '../workflow/workflow'
import ProcedureStart from '../workflow/procedureStart'
import OwnProce from '../workflow/ownProce'
import PendingProce from '../workflow/pendingProce'
import DefineProce from '../workflow/defineProce'

var Index = React.createClass({
	render:function(){
		return (
			<Router history={hashHistory}>
				<Route path="/" component={Header}>
					<IndexRoute  component={Home}/>
					<Route component={IndexPage}>
						<Route path="mainengine" component={MainEngine}>
				            <Route path="batchmanage" component={BatchManage}></Route>
						    <Route path="search" component={Search}></Route>
						</Route>
						<Route path="online" component={OnLine}>
							<Route path="list" component={List}></Route>
							<Route path="create" component={Create}></Route>
							<Route path="back" component={Create}></Route>
							<Route path="detail" component={Detail}></Route>
						</Route>
						<Route path="workflow" component={WorkFlow}>
							<Route path="proceStart" component={ProcedureStart}></Route>
							<Route path="ownProce" component={ProcedureStart}></Route>
							<Route path="pendingProce" component={PendingProce}></Route>
							<Route path="defineProce" component={DefineProce}></Route>
						</Route>
					</Route>
				</Route>
			</Router>
		)

	}
})

render(<Index/>, document.getElementById('app'))
