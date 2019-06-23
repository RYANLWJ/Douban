import React from 'react';
import axios from 'axios';
import $cookie from 'js-cookie';
const request = require('request'); // 发送短信 验证码用到的module
const querystring = require('querystring'); //  发送短信验证码用到的module

export default class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bool: true,
            userNum: '',
            userPsw: '',
            confirmCode: -1,
            errInfo: false,
            count: 60,
            ready: true,
            errMsg: '',
        }
    };
    loginWayToggle() {
        this.setState({
            bool: !this.state.bool,
            userNum: '',
            userPsw: '',
            btnActive: false,
        })
    };
    /* 获取手机号 */
    handelNumVal(e) {
        this.setState({
            userNum: e.target.value

        }, () => this.inputConfirm())
        //setState是异步的,如果要拿到最后的值,要用回调函数

    };
    /* 获取验证码 */
    handelCodeVal(e) {
        this.setState({
            userPsw: e.target.value
        }, () => this.inputConfirm())

    };
    /* 非空点亮提交按钮 */
    inputConfirm() {
        if (this.state.userNum && this.state.userPsw) {
            this.setState({
                btnActive: true
            })

        } else {
            this.setState({
                btnActive: false
            })
        }

    };
    /* 获取手机验证码 */
    getMsgCode() {
        let telNum = this.state.userNum;

        if (this.tel(telNum)) {
            let _code = this.rand(1000, 9999);

            this.setState({
                confirmCode: _code,
            })

            var queryData = querystring.stringify({
                "mobile": telNum,  // 接受短信的用户手机号码
                "tpl_id": "155597",  // 您申请的短信模板ID，根据实际情况修改
                "tpl_value": "#code#=" + _code,  // 您设置的模板变量，根据实际情况修改
                // "key": "c0570ef0cf102c596043aee5b9bddb16",  // 应用APPKEY(应用详细页查询)
            });
            var queryUrl = 'http://v.juhe.cn/sms/send?' + queryData;
            request(queryUrl, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body) // 打印接口返回内容
                    var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
                    console.log(jsonObj)
                } else {
                    console.log('请求异常');
                    console.log(error)
                }
            });

            // 验证码倒计时
            let count = this.state.count;
            const timer = setInterval(() => {
                this.setState({ count: (count--), ready: false }, () => {
                    if (count === 0) {
                        clearInterval(timer);
                        this.setState({
                            ready: true,
                            count: 60
                        })
                    }
                });
            }, 1000);

        } else {
            console.log('手机号码格式不对')
            let _this = this
            this.setState({
                errInfo: true,
                errMsg: '手机号码格式不对'
            }, () => this.errHide())


        }



    };
        /* 提交按钮发送表单 */
        checkInfo() {
            if (this.state.bool) {
                if (this.state.userPsw == this.state.confirmCode) {
                    console.log('matched')
                    let telNum = this.state.userNum;
                    let psw = this.state.userPsw;
                    axios.post('/api/user/checkNum', {
                        phoneNum: telNum
                    }, {}).then((response) => {
                        console.log(response);
                        if (response.data.length) {
                            console.log('已经注册过,登陆成功')
                            $cookie.set(telNum, '');//设置cookie
                            //   this.toHomepage();
    
                        } else {
                            console.log('没有注册过')
                            this.addReg(telNum)//插入数据
                        }
                    })
    
                }
            } else {
                let telNum = this.state.userNum
                let psw = this.state.userPsw
                if (this.tel(telNum)) {
                    // console.log('手机号输入正确')
                    axios.post('/api/user/checkAcc', {
                        phoneNum: telNum,
                        psw: psw
                    }, {}).then(res => {
                        if (res.data.length) {
                            console.log('已经注册过,登陆成功')
                            $cookie.set(telNum, '');//设置cookie
                            //   this.toHomepage();
    
                        } else {
                            console.log('没有注册过')
    
                        }
                    })
                } else if (this.mail(telNum)) {
                    // console.log('邮箱输入正确')
                    let email = this.state.userNum
                    let psw = this.state.userPsw
                    axios.post('/api/user/checkEmail', {
                        email,
                        psw,
                    }, {}).then(res => {
                        if (res.data.length) {
                            console.log('已经注册过,登陆成功')
                            $cookie.set(email, '');//设置cookie
    
                            //   this.toHomepage();
    
                        } else {
                            console.log('没有注册过')
    
                        }
                    })
                } else {
                    console.log('请输入正确的邮箱或手机号码')
                    let _this = this;
                    this.setState({
                        errMsg: '邮箱/手机号不正确',
                        errInfo: true,
                    }, () => this.errHide())
                }
            }
    
        };
    /* 验证邮箱正则 */
    mail(str) {
        let reg = /^[\w-+&%.]+@[\w-+&%.]+\.[a-zA-Z]+$/;
        return reg.test(str);
    };
    /* 验证手机号正则 */
    tel(str) {
        let reg = /^1[3-9]\d{9}$/;
        return reg.test(str);
    };
    /* 生成四位随机数 */
    rand(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    /* 插入新用户信息 */
    addReg(telNum, ) {

        axios.post('/api/user/reg', {
            phoneNum: telNum
        }, {}).then(res => {

            if (res.status == 200) {
                console.log('注册成功')
            }

        })
    }


    /* 提示信息消失倒计时 */
    errHide() {
        let _this = this;
        setTimeout(() => {
            _this.setState({
                errInfo: false,
            })
        }, 2000)
    }



    render() {
        return (<div id="account">
            <div className="account-body">
                <h1 className="account-body-title login-label-phone">
                    <a href="javascript:;" className="cancel icon login-cancel"></a>
                    <span className="account-body-text">
                        {
                            this.state.bool ? '短信验证登录/注册' : '登录豆瓣'
                        }
                    </span>
                    <span className="account-body-tips">登录注册表示同意 <a target="_blank" href="https://accounts.douban.com/passport/agreement">豆瓣使用协议、隐私政策</a></span>
                </h1>
                <div className="account-form">
                    <input type="hidden" name="ticket" id="ticket" value="" />
                    <fieldset>
                        <div className="account-form-group-fields account-form-phone" id="tmpl_login_phone">
                            <div className="account-form-field account-form-field-phone">
                                <span className="icon clear-input hide"></span>
                                {
                                    this.state.bool ? <input type="phone" name="phone" maxLength="13" className="account-form-input" placeholder="手机号" tabindex="1" value={this.state.userNum} onChange={this.handelNumVal.bind(this)} /> : <input id="username" name="username" type="text" className="account-form-input" placeholder="手机号 / 邮箱" value={this.state.userNum} onChange={this.handelNumVal.bind(this)} tabIndex="1" />
                                }
                                <div className={this.state.bool ? 'account-form-field-area-code' : 'account-form-field-area-code hide'}>
                                    <div className="account-form-field-area-code-label">+86</div>
                                </div>
                            </div>
                            <div className="account-form-field">
                                {
                                    this.state.bool ? <input type="text" name="code" maxLength="6" className="account-form-input account-form-input-code" placeholder="手机验证码" value={this.state.userPsw} onChange={this.handelCodeVal.bind(this)} tabindex="2" /> : <input id="password" type="password" name="password" className="account-form-input password" placeholder="密码" value={this.state.userPsw} onChange={this.handelCodeVal.bind(this)} tabindex="2" />
                                }
                                <div style={this.state.bool ? { display: 'block' } : { display: 'none' }} className="account-form-field-options account-form-field-code">
                                    <a href="javascript:;" style={this.state.ready ? { pointerEvents: 'auto' } : { pointerEvents: 'none' }} onClick={this.getMsgCode.bind(this)}>
                                        {
                                            this.state.ready ? '获取手机验证码' : '请等候' + this.state.count + '秒'
                                        }
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="account-form-field-submit">
                            <a href="javascript:;" className={this.state.btnActive ? 'btn submit btn-active' : 'btn submit'} onClick={this.checkInfo.bind(this)}>登录</a>
                        </div>
                        <div className="account-form-ft">
                            <a href="https://m.douban.com/page/wijmvyh" className="login-forget no-code">验证码收不到?</a>
                            <div className="account-form-switch">
                                <a href="javascript:;" className="login-label-account" onClick={this.loginWayToggle.bind(this)}>{this.state.bool ? '帐号密码登录' : '免密登录'}</a>
                                <a href="javascript:;" className={this.state.bool ? 'login-label-abroad hide' : 'login-label-abroad'}>海外手机登录</a>
                            </div>
                        </div>
                        <div className="account-form-3rd">
                            <div className="account-form-3rd-hd">第三方登录</div>
                            <div className="account-form-3rd-bd">
                                <a href="https://accounts.douban.com/connect/sina_weibo/?from=None&amp;redir=https://m.douban.com/&amp;fallback=" className="link-3rd-wb link-3rd-wb-on" target="_top" title="用微博登录">Weibo</a>

                                <a href="https://www.douban.com/accounts/weixin" className="link-3rd-wx link-3rd-wx-on" target="_top" title="用微信登录">Wechat</a>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
            <div className="nation-select hide"></div>
            <div id="TCaptcha"></div>

            <script type="text/template" id="tmpl_account">
                <div className="account-form-field account-form-field-first">
                    <div className="field-account">
                        <input id="username" name="username" type="text" className="account-form-input" placeholder="手机号 / 邮箱" tabindex="1" />
                        <span className="icon clear-input hide"></span>
                    </div>
                    <div className="account-form-field-phone field-abroad">
                        <span className="icon clear-input hide"></span>
                        <input type="phone" name="phone" maxlength="13" className="account-form-input" placeholder="手机号" tabindex="1" />
                        <div className="account-form-field-area-code">
                            <div className="account-form-field-area-code-label">+86</div>
                        </div>
                    </div>
                </div>
                <div className="account-form-field">
                    <input id="password" type="password" name="password" className="account-form-input password" placeholder="密码" tabindex="2" />
                    <span className="icon openpwd hide"></span>
                </div>
            </script>

            <script type="text/template" id="tmpl_select_findpwd">
                <div className="birthday-item">
                    <a href="./get_password?type=email">用邮箱</a>
                    <a href="./get_password?type=phone">用手机号</a>
                </div>
            </script>
            <div className="error-info-wrap" style={this.state.errInfo ? { display: 'block' } : { display: 'none' }}>
                {/* <div className="account-form-error-popup-body error-popup-out"> */}
                <div className={`account-form-error-popup-body ${this.state.errInfo ? "error-popup-in" : "error-popup-out"}`}>
                    {this.state.errMsg}
                    <a href="javascript:;" className="account-form-error-popup-close">×</a>
                </div>
            </div>
        </div>
        )
    }
}