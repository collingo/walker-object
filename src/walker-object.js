function WalkerObject() {
	this.stack = [];
};
WalkerObject.prototype = {
	constructor: WalkerObject,
	child: function(cb, node) {
		var next;
		if(typeof node === 'object') {
			if(Array.isArray(node)) {
				this.stack.unshift([].concat(node));
			} else {
				this.stack.unshift(Object.keys(node).map(function(key) {
					return node[key];
				}));
			}
			next = this.stack[0].shift();
		}
    if(next) {
      cb(next);
    }
	},
	sibling: function(cb, node) {
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
      cb(next);
    }
	}
};
module.exports = WalkerObject;