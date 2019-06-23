// sql语句

var sqlMap = {

  // 用户

  user: {

    add: 'insert into xmtest(id, name, qty,goods_id) values (0, ?, ?,?)', //插入新数据
    ser: 'select * from xmtest where name = ?', //查询用户数据
    checkCurr: 'select * from xmtest where name = ? and goods_id = ? ',
    upd: 'update xmtest set qty = ? where name = ? and goods_id = ?  ', //如果数据库已有这条数据,则只是更新
    checkNum: 'select * from cusinfo where phonenum = ? ', //根据手机号码查询是否有这个用户
    reg: 'insert into cusinfo(phonenum) values (?) ', //插入用户注册信息
    checkAcc: 'select * from cusinfo where phonenum = ? and password = ? ', //查询手机号和密码是否匹配
    checkEmail: 'select * from cusinfo where email = ? and password = ? ' //查询邮箱和密码是否匹配
  }

}

module.exports = sqlMap;
