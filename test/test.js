'use strict';
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

//// SUT
var WalkerObject = require('../src/walker-object');

describe('WalkerObject', function() {

  var sandbox;
  var walkerObject;
  var callback;
  var tree;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    walkerObject = new WalkerObject();
    tree = {
      a: ['123', '456'],
      b: ['789', '012']
    };
    callback = sandbox.spy();
  });

  describe('child', function() {

    beforeEach(function() {
      walkerObject.child(callback, tree);
    });

    it('should return the first property in the object', function() {
      expect(callback).to.have.been.calledWith(tree.a);
    });

    it('should return the first item in the array', function() {
      // SUT is stateful so we need to simulate walking the earlier parts of the tree
      walkerObject.child(callback, tree.a);
      expect(callback).to.have.been.calledWith(tree.a[0]);
    });

  });

  describe('sibling', function() {

    beforeEach(function() {
      // SUT is stateful so we need to simulate walking the earlier parts of the tree
      walkerObject.child(callback, tree);
      walkerObject.sibling(callback, tree.a);
    });

    it('should return the next property in the object', function() {
      expect(callback).to.have.been.calledWith(tree.b);
    });

    it('should return the next item in the array', function() {
      // SUT is stateful so we need to simulate walking the earlier parts of the tree
      walkerObject.child(callback, tree.b);
      walkerObject.sibling(callback, tree.b[0]);
      expect(callback).to.have.been.calledWith(tree.b[1]);
    });

  });

});