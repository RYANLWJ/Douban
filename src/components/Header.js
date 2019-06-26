import React from 'react';
import styles from '../assets/css/base.css';
import '../assets/css/main.css';
import '../assets/css/sign.css';
import {Link} from 'dva/router'
// import '../assets/css/test.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            bool:true,
        }
    };
    searchToggle(){
        this.setState({
            bool:!this.state.bool
        })
    }
    
    render() {
        return  <header className={this.state.bool?'TalionNav':'TalionNav is-active'}>
          <div className="TalionNav-primary" style={this.state.bool?{display:'flex'}:{display:'none'
        }}><a href="/" className="logo">
              <h1>豆瓣</h1>
            </a>
            <nav><span className="" onClick={
                this.searchToggle.bind(this)
            }></span><a
                href="https://www.douban.com/doubanapp/dispatch?copy_open=1&amp;from=mdouban&amp;download=1&amp;model=B&amp;copy=1&amp;page=&amp;channel=m_ad_nav&amp;uri=%2F"
                className="openapp" id="topnav-openapp">打开豆瓣App</a></nav>
          </div>
          <div className="TalionNav-secondary"><a className="close-nav" href="javascript:;" onClick={this.searchToggle.bind(this)}>关闭</a>
            <form action="/search" method="GET">
              <div><input name="query" type="search"/></div>
            </form>
            <ul>
              <li>
                <div><a href="/movie" target="_blank"><strong
                      style={{color: 'rgb(35, 132, 232)'}}>电影</strong><span>影院热映</span></a><a
                    href="https://douban.com/location" target=""><strong
                      style={{color: 'rgb(230, 70, 126)'}}>同城</strong><span>周末活动</span></a><a href="https://read.douban.com"
                    target=""><strong style={{color: 'rgb(159, 120, 96)'}}>阅读</strong><span>电子书</span></a><a href="/status"
                    target="_blank"><strong style={{color:'rgb(225, 100, 77)'}}>广播</strong><span>友邻动态</span></a></div>
              </li>
              <li>
                <div><a href="/tv" target="_blank"><strong
                      style={{color: 'rgb(122, 106, 219)'}}>电视</strong><span>正在热播</span></a><a href="/group"
                    target="_blank"><strong style={{color: 'rgb(42, 184, 204)'}}>小组</strong><span>志趣相投</span></a><a
                    href="/game" target="_blank"><strong
                      style={{color: 'rgb(87, 116, 197)'}}>游戏</strong><span>虚拟世界</span></a><a href="https://douban.fm"
                    target=""><strong style={{color: 'rgb(64, 207, 169)'}}>FM</strong><span>红心歌单</span></a></div>
              </li>
              <li>
                <div><a href="/book" target="_blank"><strong
                      style={{color: 'rgb(159, 120, 96)'}}>图书</strong><span>畅销排行</span></a><a href="/music"
                    target="_blank"><strong style={{color: 'rgb(244, 143, 46)'}}>音乐</strong><span>新碟榜</span></a><a
                    href="/mobileapp" target="_blank"><strong
                      style={{color: 'rgb(89, 108, 221)'}}>应用</strong><span>玩手机</span></a><a
                    href="https://market.douban.com/?utm_campaign=mobile_web_douban_nav&amp;utm_source=douban&amp;utm_medium=mobile_web"
                    target=""><strong style={{color: 'rgb(66, 189, 86)'}}>豆品</strong><span>生活美学</span></a></div>
              </li>
            </ul>
            <div className="navBottom">
              <div className="nav-item"><Link className="toLogin" to={{
                        pathname: "/sign",
                        search: "?sort=name",
                        hash: "#the-hash",
                        state: { fromDashboard: true }
                    }}
               >登录豆瓣</Link></div>
              <div className="nav-item"><a className="toPC" href="/to_pc/?url=https%3A%2F%2Fm.douban.com%2F">使用桌面版</a><a
                  href="https://www.douban.com/doubanapp/dispatch?copy_open=1&amp;from=mdouban&amp;download=1&amp;model=B&amp;copy=1&amp;page=&amp;channel=m_ad_nav&amp;uri=%2F"
                  className="toApp">使用豆瓣App</a></div>
            </div>
          </div>
        </header>
    
           
                
            }
}

