'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getValuePropValue = getValuePropValue;
exports.getPropValue = getPropValue;
exports.isCombobox = isCombobox;
exports.isMultipleOrTags = isMultipleOrTags;
exports.isMultipleOrTagsOrCombobox = isMultipleOrTagsOrCombobox;
exports.isSingleMode = isSingleMode;
exports.toArray = toArray;
exports.getCheckedKeys = getCheckedKeys;
exports.loopAllChildren = loopAllChildren;
exports.filterMinPos = filterMinPos;
exports.getTreeNodesStates = getTreeNodesStates;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function getValuePropValue(child) {
  var props = child.props;
  if ('value' in props) {
    return props.value;
  }
  if (child.key) {
    return child.key;
  }
  throw new Error('no key or value for ' + child);
}

function getPropValue(child, prop) {
  if (prop === 'value') {
    return getValuePropValue(child);
  }
  return child.props[prop];
}

function isCombobox(props) {
  return props.combobox;
}

function isMultipleOrTags(props) {
  return props.multiple || props.tags || props.treeCheckable;
}

function isMultipleOrTagsOrCombobox(props) {
  return isMultipleOrTags(props) || isCombobox(props);
}

function isSingleMode(props) {
  return !isMultipleOrTagsOrCombobox(props);
}

function toArray(value) {
  var ret = value;
  if (value === undefined) {
    ret = [];
  } else if (!Array.isArray(value)) {
    ret = [value];
  }
  return ret;
}

function isInclude(smallArray, bigArray) {
  // attention: [0,0,1] [0,0,10]
  return smallArray.every(function (ii, i) {
    return ii === bigArray[i];
  });
}

function getCheckedKeys(node, checkedKeys, allCheckedNodesKeys) {
  var nodeKey = node.props.eventKey;
  var newCks = [].concat(_toConsumableArray(checkedKeys));
  var nodePos = undefined;
  var unCheck = allCheckedNodesKeys.some(function (item) {
    if (item.key === nodeKey) {
      nodePos = item.pos;
      return true;
    }
  });
  if (unCheck) {
    (function () {
      var nArr = nodePos.split('-');
      newCks = [];
      allCheckedNodesKeys.forEach(function (item) {
        var iArr = item.pos.split('-');
        if (item.pos === nodePos || nArr.length > iArr.length && isInclude(iArr, nArr) || nArr.length < iArr.length && isInclude(nArr, iArr)) {
          // 过滤掉 父级节点 和 所有子节点。
          // 因为 node节点 不选时，其 父级节点 和 所有子节点 都不选。
          return;
        }
        newCks.push(item.key);
      });
    })();
  } else {
    newCks.push(nodeKey);
  }
  return newCks;
}

function loopAllChildren(childs, callback) {
  var loop = function loop(children, level) {
    _react2['default'].Children.forEach(children, function (item, index) {
      var pos = level + '-' + index;
      if (item.props.children) {
        loop(item.props.children, pos);
      }
      callback(item, index, pos, getValuePropValue(item));
    });
  };
  loop(childs, 0);
}

function filterMinPos(arr) {
  var a = [];
  arr.forEach(function (item) {
    var b = a.filter(function (i) {
      return item.indexOf(i) === 0 && (item[i.length] === '-' || !item[i.length]);
    });
    if (!b.length) {
      a.push(item);
    }
  });
  return a;
}

// console.log(filterMinPos(['0-0','0-1', '0-10', '0-0-1', '0-1-1', '0-10-0']));

function handleCheckState(obj, checkedPosArr, checkIt) {
  var stripTail = function stripTail(str) {
    var arr = str.match(/(.+)(-[^-]+)$/);
    var st = '';
    if (arr && arr.length === 3) {
      st = arr[1];
    }
    return st;
  };
  // stripTail('x-xx-sss-xx')
  var splitPos = function splitPos(pos) {
    return pos.split('-');
  };
  checkedPosArr.forEach(function (_pos) {
    // 设置子节点，全选或全不选
    Object.keys(obj).forEach(function (i) {
      if (splitPos(i).length > splitPos(_pos).length && i.indexOf(_pos) === 0) {
        obj[i].checkPart = false;
        obj[i].checked = checkIt;
      }
    });
    // 循环设置父节点的 选中 或 半选状态
    var loop = function loop(__pos) {
      var _posLen = splitPos(__pos).length;
      if (_posLen <= 2) {
        // e.g. '0-0', '0-1'
        return;
      }
      var sibling = 0;
      var siblingChecked = 0;
      var parentPos = stripTail(__pos);
      Object.keys(obj).forEach(function (i) {
        if (splitPos(i).length === _posLen && i.indexOf(parentPos) === 0) {
          sibling++;
          if (obj[i].checked) {
            siblingChecked++;
          } else if (obj[i].checkPart) {
            siblingChecked += 0.5;
          }
        }
      });
      var parent = obj[parentPos];
      // sibling 不会等于0
      // 全不选 - 全选 - 半选
      if (siblingChecked === 0) {
        parent.checked = false;
        parent.checkPart = false;
      } else if (siblingChecked === sibling) {
        parent.checked = true;
        parent.checkPart = false;
      } else {
        parent.checkPart = true;
        parent.checked = false;
      }
      loop(parentPos);
    };
    loop(_pos);
  });
}

function getCheckValues(treeNodesStates) {
  var checkedValues = [];
  Object.keys(treeNodesStates).forEach(function (item) {
    var itemObj = treeNodesStates[item];
    if (itemObj.checked && !itemObj.node.props.children) {
      checkedValues.push(getValuePropValue(itemObj.node));
    }
  });
  return {
    checkedValues: checkedValues
  };
}

function getTreeNodesStates(children, values) {
  var checkedPos = [];
  var treeNodesStates = {};
  loopAllChildren(children, function (item, index, pos, value) {
    var checked = false;
    if (values.indexOf(value) !== -1) {
      checked = true;
      checkedPos.push(pos);
    }
    treeNodesStates[pos] = {
      node: item,
      checked: checked,
      checkPart: false
    };
  });

  handleCheckState(treeNodesStates, filterMinPos(checkedPos.sort()), true);

  return getCheckValues(treeNodesStates);
}