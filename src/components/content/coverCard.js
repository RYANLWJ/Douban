import React from 'react';

export default class CoverCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arr: this.props.content,
        }
        // console.log(this.props.content[4].content.photos[0].image.normal.url)
        // this.props.content.map((item)=>{
        //     if(item.content.photos.length==1){
        //         console.log(item.content.photos[0].image.normal.url)
        //     }

        // })
    }
    render() {
        return this.state.arr.map((item, index) => {
            if (item.content.photos.length < 2 && item.content.photos.length != 0) {
                return (<a className="feed-item" href="https://www.douban.com/note/720246434/" key={index}>
                    <div className="feed-content">
                        <div className="cover"
                            style={{ position: 'relative', background: 'url(' + item.content.photos[0].image.normal.url + ') center center / cover no-repeat rgb(250, 250, 250)' }}>
                            <div style={{ paddingTop: '100%' }}></div>
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