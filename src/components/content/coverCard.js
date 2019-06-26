import React from 'react';

export default class CoverCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arr: this.props.content,
        }

    }
    render() {

        return (<a className="feed-item" href="https://www.douban.com/note/720246434/" >
            <div className="feed-content">
                <div className="cover"
                    style={{ position: 'relative', background: 'url(' + this.state.arr.content.photos[0].image.normal.url + ') center center / cover no-repeat rgb(250, 250, 250)' }}>
                    <div style={{ paddingTop: '100%' }}></div>
                </div>
                <h3>{this.state.arr.content.title}</h3>
                <p>{this.state.arr.content.abstract}</p>
            </div>
            <div className="author">

                <span className="name">{this.state.arr.content.author.name}</span></div><span className="feed-label"></span>
        </a>)

    }




}