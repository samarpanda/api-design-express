var supertest = require('supertest')
var app = require('./app').app

exports.correct_user_pass_responds_token = function(done){
  supertest(app)
  .post('/auth/signin')
  .send({
    'username':'samar',
    'password':'pass'
  })
  .set('Content-Type', 'application/json')
  .expect(200)
  .end(function(err, res){
    if(err) throw(err)
    console.log(res.body)
    done();
  })
}
