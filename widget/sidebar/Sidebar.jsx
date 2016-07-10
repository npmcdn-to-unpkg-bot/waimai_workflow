import React from 'react';
import {Tree}from 'antd';
import jsonp from '../../static/js/utils/jsonp.js'
const TreeNode = Tree.TreeNode;

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
const Sidebar = React.createClass({
    getInitialState() {
        return {
            treeData: [],
        };
    },
    componentDidMount() {
        var self = this;
        setTimeout(() => {
            jsonp(this.props.url, function (err, res) {
                self.setState({
                    treeData: Object.keys(res).map(v => res[v])
                });
            });
        }, 100);
    },
    onLoadData(treeNode) {
        // console.log(treeNode);
        var pos = treeNode.props.eventKey.split('-').slice(1);
        var self = this;
        return new Promise((resolve) => {
            const treeData = [...this.state.treeData];
            jsonp('http://noah.baidu.com/service-tree/v1/node/' + treeNode.props.id + '/children', function (err, res) {
                self.setState({
                    treeData: setTreeData(treeData, pos, Object.keys(res).map(v => res[v]))
                });
                resolve();
            });
        });
    },
    render() {
        const loop = (data, level) => data.map((item, index) => {
            // console.log(data, level)
            let newLevel = level + '-' + index;
            if (item.children) {
                return <TreeNode title={item.name} key={newLevel}
                                 id={item.id}>{loop(item.children, newLevel)}</TreeNode>;
            }
            return <TreeNode title={item.name} key={newLevel} id={item.id} isLeaf={item.isLeaf}
                             disabled={item.key === '0-0-0'}/>;
        });
        const treeNodes = loop(this.state.treeData, '0');
        return (
            /*<Tree loadData={this.onLoadData}> onSelect={this.onSelect}*/
            <Tree loadData={this.onLoadData}>
                {treeNodes}
            </Tree>
        );
    },
});

export default Sidebar