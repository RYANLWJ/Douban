import React from 'react';
import Header from '../components/Header'
import axios from 'axios';
import NormalCard from '../components/content/normalCard'
import PhotoCard from '../components/content/photoCard'
import CoverCard from '../components/content/coverCard'



export default class Home extends React.Component {
    state = {
        content:[],
        ready:false,
    };
    componentDidMount() {
        this.getContent()
    };
    getContent() {
        let data = []
        axios
            .get('https://www.easy-mock.com/mock/5d0da1be896dbe7836ce5769/example/homefeed1')
            .then((res) => {
                data = res.data.items
                console.log(data)
                this.setState({
                    content:data
                },()=>{
                    this.setState({ready:true})
                })
            })
    };
    render() {
        return (
            <div>
                <Header />
                <div className="page">

                    <div className="card">
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
                        <section id="recommend-feed">
                            <div data-reactroot="">
                                    {/* ------内容组件待加入 */}
                                {
                                    this.state.ready?
                                    (<div>
                                        <NormalCard content={this.state.content}/>
                                        <PhotoCard content={this.state.content}/>
                                        <CoverCard content={this.state.content}/>
                                    </div>):null
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