var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt')

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', function(next){
  if(!this.isModified('password'))
    return next()

  this.password = this.encryptPassword(this.password)
  next()
})

UserSchema.methods = {
  authenticate: function(plainTextPword){
    return bcrypt.compareSync(plainTextPword, this.password)
  },
  encryptPassword: function(plainTextPword){
    if(!plainTextPword){
      return ''
    } else {
      var salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(plainTextPword, salt)
    }
  },
  toJson: function(){
    var obj = this.toObject()
    delete obj.password
    return obj
  }
}

module.exports = mongoose.model('user', UserSchema)