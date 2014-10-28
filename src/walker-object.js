function WalkerObject() {
  this.stack = [];
};
WalkerObject.prototype = {
  constructor: WalkerObject,
  child: function(cb, node, key, path) {
    var next;
    if(typeof node === 'object') {
      this.stack.unshift(Object.keys(node).map(function(key) {
        return {
          key: key,
          val: node[key]
        };
      }));
      next = this.stack[0].shift();
    }
    if(next) {
      cb(next.val, next.key, path.concat(next.key));
    }
  },
  sibling: function(cb, node, key, path) {
    var next;
    if(this.stack.length) {
      var level = this.stack[0];
      if(level.length) {
        next = level.shift();
      } else {
        this.stack.shift();
      }
    }
    if(next) {
      path.pop();
      cb(next.val, next.key, path.concat(next.key));
    }
  }
};
module.exports = WalkerObject;