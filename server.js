var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');
var proxyMiddleware = require('http-proxy-middleware');

var app = connect();
app.use(serveStatic('output', { 'index': ['index.html'] }));

var online = 'http://wmaudit.baidu.com';
var wantianqi = 'http://cp01-wantianqi.epc.baidu.com:8088';
var fuguozheng = 'http://cp01-zy.epc.baidu.com:8088'
var mainengine = 'http://10.208.48.11:8899'
var check = 'http://10.208.48.11:8899'
var dataSource = 'http://10.208.48.11:8899'
var dataSourceorder = 'http://10.208.48.11:8082'
var sateType = 'http://10.100.30.120:8070'
var groupType = 'http://10.100.30.120:8070'
var actionType = 'http://10.100.30.120:8070'
var activityType = 'http://10.100.30.120:8070'

var proxyConf = {
    '/cmdb/batch/nodes/': dataSourceorder,
    '/cmdb/batch/nodename/': dataSourceorder,
    '/cmdb/batch/nodes?nodeid=1111':dataSourceorder,
    '/v1/order/list':dataSource,
    '/v1/order/moduleInfo':dataSource,
    '/v1/order/delete':dataSource,
    '/v1/order/commit':dataSource,
    '/v1/order/detail':dataSource,
    '/v1/order/process':dataSource,
    '/v1/order/start':dataSource,
    '/v1/order/continue' : dataSource,
    '/v1/order/pauseStatus' : dataSource,
    '/v1/order/forceFinish' : dataSource,
    '/v1/statetype/' : sateType,
    '/v1/grouptype/' : groupType,
    '/v1/actiontype/' : actionType,
    '/v1/activitytype/' : activityType,
};

Object.keys(proxyConf).map(function (path) {
    app.use(proxyMiddleware(path, {
        target: proxyConf[path],
        autoRewrite: true
    }));
});


http.createServer(app).listen(3050);
console.log("listening on port 3050")
