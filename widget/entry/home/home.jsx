import React from 'react';
import {Affix,Menu,Carousel} from 'antd'
import { hashHistory, Router, Route, IndexRoute, Link, IndexLink,IndexRedirect} from 'react-router';
import 'home.less';

var Home = React.createClass({
	render : function(){
		var height = '50%';
		var right = 'right'
		var bgColor = '#190c26'
		return(
		<div id="home">		
		    <div className='lun'>
		     <Carousel autoplay>
			    <div style={{height:height}}>
			    	<div className="center">
			    	<div className="all">
			    		<div className='left'><img src="img/online.png"/></div>
			    		<div className='right'><img className="des"  src='./img/one.png'/></div>
			    	</div>
			    	</div>
			    </div>
			    <div>
			    	<div className="center">
					<div className="all">
			    		<div className='left'><img src='./img/limitmodule.png'/></div>
			    		<div className='right'><img className="des" src="./img/online.png"/></div>
			    	</div>
			    	</div>
			    </div>
			    <div>
			    	<div className="center">
			    	<div className="all">
			    		<div className='left'><img  src="./img/workflow.png"/></div>
			    		<div className='right'><img className="des" src='./img/workflow.png'/></div>
			    	</div>
			    	</div>
			    </div>

			    <div >
			    	<div className="center">
				    	<div className="all">
				    		<div className='left'><img  src='./img/cmdb.png'/></div>
				    		<div className='right'><img className="des" src="./img/online.png"/></div>
				    	</div>
			    	</div>
			    </div>
			  </Carousel>
		    </div>

		    <div className="order clearfix">
		    	<div className="left"><img src='./img/icon1.png'/></div>
		    	<div className="right">
		    		<h1>一站式服务</h1>
		    		<div className='content'>运维平台一站式服务，集成各种服务与组件，达到op、rd、qa的一站式服务操作体验。上线系统、权限模块已经上线，workflow、cmdb在开发中，陆续会上线更多的服务。敬请期待。</div>
		    	</div>
		    	<div className="diveder clearfix"></div>
		    </div>
		    
		   	<div className="order clearfix">
		    	<div className="left"><h1>通用服务支持</h1>
		    		<div className='content'>前期会做一些基础服务，如权限模块、workflow，内部的平台和非运维的平台，只要使用相同的权限和流程都可以复用，也可以自定义自己的权限和流程。欢迎各种服务的对接。</div></div>
		    	<div className="right">
		    		<div className="img"><img src='./img/icon2.png'/></div>
		    	</div>
		    </div>		
		</div>

		)

	}	
});


export default Home