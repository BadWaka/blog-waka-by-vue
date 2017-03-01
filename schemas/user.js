/**
 * Created by BadWaka on 2017/3/1.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // 专门为密码存储设计的算法,基于bluefish加密算法变形而来
const SALT_WORK_FACTOR = 10;  // 盐的强度

const UserSchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String
  },
  password: String,
  meta: {
    createAt: { // 创建时间
      type: Date,
      default: Date.now()
    },
    updateAt: { // 更新时间
      type: Date,
      default: Date.now()
    }
  }
});

// pre()的意思是，每次进行save操作之前，都会调用这个方法
UserSchema.pre('save', function (next) {

  let user = this;

  // 判断数据是否是新添加的
  if (this.isNew) {
    // 如果是，则将创建时间和更新时间都设置为当前时间
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    // 否则，只更新更新时间
    this.meta.updateAt = Date.now();
  }

  // 生成一个随机的盐
  // 第一个参数是盐的强度，默认为10
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });

  });

});

UserSchema.statics = {

  // fetch方法，用来取出数据库里面所有的数据
  fetch: function (cb) {
    return this
      .find()
      .sort('-meta.updateAt')  // 排序;根据更新时间排序；前面加-号表示降序
      .exec(cb);
  },

  // 根据id，查询单条数据
  findById: function (id, cb) {
    return this
      .findOne({
        _id: id
      })
      .exec(cb);
  },

  // 根据类型id，查询
  findByTypeId: function (typeId, cb) {
    return this
      .find({
        typeId: typeId
      })
      .sort('-meta.updateAt')  // 排序;根据更新时间排序；前面加-号表示降序
      .exec(cb);
  }
};

// 导出模式
module.exports = UserSchema;
