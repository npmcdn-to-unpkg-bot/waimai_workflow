module.exports = function(error_no) {

    switch(error_no) {
        case 403:
            return error_msg = "用户权限认证失败"
            break;
        case 413:
            return error_msg = "提交数据为空"
            break;
        case 414:
            return error_msg = "获取请求数据错误"
            break;
        case 415:
            return error_msg = "业务处理错误"
            break;
        case 416:
            return error_msg = "请求方法错误"
            break;
        case 418:
            return error_msg = "请求头错误"
            break;
        case 419:
            return error_msg = "数据解析错误"
            break;
        case 420:
            return error_msg = "请求参数错误"
            break;
        case 421:
            return error_msg = "全局控制开启"
            break;
        case 422:
            return error_msg = "订单不存在"
            break;
        case 423:
            return error_msg = "订单超时"
            break;
        case 424:
            return error_msg = "订单子任务类型错误"
            break;
        case 425:
            return error_msg = "上一个订单子任务未完成"
            break;
        case 427:
            return error_msg = "bns设备列表检查错误"
            break;
        case 428:
            return error_msg = "订单状态错误"
            break;
        case 430: 
        	return error_msg = '检测任务是否存在失败'
        	break;
        case 431:
        	return error_msg ='任务已经存在错误'
        	break;
        case 426:
        	return error_msg ='上线的版本  高于或低于线上版本'
        	break;
        case 'no':
        	return error_msg=''
        	break;
        default:
            return error_msg = "未知错误"
            break;
    }
}
