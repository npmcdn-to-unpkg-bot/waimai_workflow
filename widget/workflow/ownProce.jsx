import React from 'react'
import { render } from 'react-dom';
import {Router,Route,Link} from 'react-router'
import reqwest from 'reqwest'
import {
	Tabs
}
from 'antd';
const TabPane = Tabs.TabPane;

var OwnProce = React.createClass({



	render: function(){
		return (
			<div>
				我流程
			</div>
			
		)
	}
});

export default OwnProce