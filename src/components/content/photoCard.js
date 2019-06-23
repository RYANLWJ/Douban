import React from 'react';

export default class PhotoCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arr: this.props.content,
        }
    };
    render() {
        return this.state.arr.map((item, index) => {
            if (item.content.photos.length == 3) {
                return (<a className="feed-item" href="https://www.douban.com/note/722646263/" key={index}>
                    <div className="feed-content">
                        <div className="photos">
                            <div className="main"
                                style={{ position: 'relative', background: 'url(' + item.content.photos[0].image.normal.url + ') center center / cover no-repeat rgb(250, 250, 250)' }}>
                                <div></div>
                            </div>
                            <div className="aside">
                                <div className="aside-pic">
                                    <div
                                        style={{ position: 'relative', background: 'url(' + item.content.photos[1].image.normal.url + ') center center / cover no-repeat rgb(250, 250, 250)' }}>
                                        <div style={{ paddingTop: '100%' }}></div>
                                    </div>
                                </div>
                                <div className="aside-pic">
                                    <div
                                        style={{ position: 'relative', background: 'url(' + item.content.photos[2].image.normal.url + ') center center / cover no-repeat rgb(250, 250, 250)' }}>
                                        <div style={{ paddingTop: '100%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3>{item.content.title}</h3>
                        <p>{item.content.abstract}</p>
                    </div>
                    <div className="author">

                        <span className="name">{item.content.author.name}</span></div><span className="feed-label"></span>
                </a>)
            }

        })
    }
}