'use strict';
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

var sandbox;

//// SUT
var WalkerObject = require('../src/walker-object');

describe('WalkerObject', function() {

  var walkerObject;
  var result;
  var tree;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    walkerObject = new WalkerObject();
    tree = {
      a: ['123', '456'],
      b: ['789', '012']
    };
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('child', function() {

    beforeEach(function() {
      result = walkerObject.child(tree);
    });

    it('should return the first property in the object', function() {
      expect(result).to.equal(tree.a);
    });

    it('should return the first item in the array', function() {
      // SUT is stateful so we need to simulate walking the earlier parts of the tree
      result = walkerObject.child(tree.a);
      expect(result).to.equal(tree.a[0]);
    });

  });

  describe('sibling', function() {

    beforeEach(function() {
      // SUT is stateful so we need to simulate walking the earlier parts of the tree
      walkerObject.child(tree);
      result = walkerObject.sibling(tree.a);
    });

    it('should return the next property in the object', function() {
      expect(result).to.equal(tree.b);
    });

    it('should return the next item in the array', function() {
      // SUT is stateful so we need to simulate walking the earlier parts of the tree
      walkerObject.child(tree.b);
      result = walkerObject.sibling(tree.b[0]);
      expect(result).to.equal(tree.b[1]);
    });

  });

});