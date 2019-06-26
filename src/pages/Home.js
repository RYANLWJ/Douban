import React from 'react';
import Header from '../components/Header'
import axios from 'axios';
import NormalCard from '../components/content/normalCard'
import PhotoCard from '../components/content/photoCard'
import CoverCard from '../components/content/coverCard'



export default class Home extends React.Component {
    state = {
        content: [],
        content_h: 0,
        isOk: true,
        tab: 'home',

    };
    componentDidMount() {
        let _this = this
        this.checkCache()
        // 滚动事件
        window.addEventListener('scroll', () => {
            let scrollTop = document.documentElement.scrollTop;
            // console.log(scrollTop+667)
            if ((scrollTop + 667) % _this.state.content_h === 0 && scrollTop !== 0) {
                _this.loadMore()
            }
        })

    };
    componentDidUpdate() {

        if (this.state.isOk) {
            console.log(this.refs.content_wrap.offsetHeight)

            this.setState({
                content_h: this.refs.content_wrap.offsetHeight,
                isOk: !this.state.isOk
            })
        }

    };
    /* 查有无缓存内容 */
    checkCache() {
        if (sessionStorage.getItem(this.state.tab)) {
            // console.log('读缓存')
            const res = JSON.parse(sessionStorage.getItem(this.state.tab))
            // console.log(res)
            this.setState({ content: res})
        } else {
            this.getContent();
        }
    };

    async  getContent() {
        let data = []
        const res = await axios.get('https://www.easy-mock.com/mock/5d0da1be896dbe7836ce5769/example/homefeed1')
        data = res.data.items
        // console.log(res)

        data = this.randomSort1(data)//把数组打乱,让内容随机出现

        sessionStorage.setItem(this.state.tab, JSON.stringify([...this.state.content, ...data]))//存缓存
        this.setState({ content: [...this.state.content, ...data], }, () => {
            this.setState({ isOk: true, })
        })
    };
    /* 加载更多 */
    async loadMore() {
        this.getContent();
    }

    /* 随机重新排列一个数组 */
    randomSort1(arr) {
        for (let i = 0, l = arr.length; i < l; i++) {
            let rc = parseInt(Math.random() * l);
            // 让当前循环的数组元素和随机出来的数组元素交换位置
            const empty = arr[i];
            arr[i] = arr[rc];
            arr[rc] = empty;
        }
        return arr;
    }
    render() {
        return (
            <div >
                <Header />
                <div className="page" ref="content_wrap" >
                    <div className="card" ref="conH">
                        <ul className="quick-nav">
                            <li>
                                <a href="/movie/nowintheater?loc_id=108288">影院热映</a>
                            </li>
                            <li>
                                <a href="/music/newwestern/">欧美新碟榜</a>
                            </li>
                            <li>
                                <a id="hot-topics" href="https://m.douban.com/time/?dt_time_source=douban-msite_shortcut">豆瓣时间</a>
                            </li>
                            <li>
                                <a href="https://www.douban.com/doubanapp/app?channel=card_home&amp;direct_dl=1">使用豆瓣App</a>
                            </li>
                        </ul>
                        <section id="recommend-feed" >
                            <div data-reactroot="">
                                {/* NOTE  */}

                                {
                                    this.state.content.map((item, index) => {
                                        if (item.content.photos.length == 3) {
                                            return <PhotoCard content={item} key={index} />
                                        } else if (item.content.photos.length == 0) {
                                            return <NormalCard content={item} key={index} />
                                        } else if (item.content.photos.length == 1) {
                                            return <CoverCard content={item} key={index} />
                                        }
                                    })
                                }

                                <div id="infinite-scroll-trigger">
                                    <div className="loadmore"></div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}