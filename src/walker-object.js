function WalkerObject() {
  this._stack = [];
  this.initialParams = [[]];
};
WalkerObject.prototype = {
  constructor: WalkerObject,
  child: function(cb, node, path) {
    var next;
    if(typeof node === 'object') {
      this._stack.unshift(Object.keys(node).map(function(key) {
        return {
          key: key,
          val: node[key]
        };
      }));
      next = this._stack[0].shift();
    }
    if(next) {
      cb(next.val, path.concat(next.key));
    }
  },
  sibling: function(cb, node, path) {
    var next;
    if(this._stack.length) {
      var level = this._stack[0];
      if(level.length) {
        next = level.shift();
      } else {
        this._stack.shift();
      }
    }
    if(next) {
      path.pop();
      cb(next.val, path.concat(next.key));
    }
  }
};
module.exports = WalkerObject;