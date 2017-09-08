var sinon = require('sinon')
var chai = require('chai')
var expect = chai.expect

var mongoose = require('mongoose')
require('sinon-mongoose')

var User = require('../../src/api/user/userModel')

describe('Get all Users', function(){
  it('should return all users', function(done){
    var UserMock = sinon.mock(User)
    var expectedResult = {status: true, user: []}
    UserMock.expects('find').yields(null, expectedResult)
    User.find(function(err, result){
      UserMock.verify()
      UserMock.restore()
      expect(result.status).to.be.true
      done();
    })
  })
})