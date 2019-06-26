import React from 'react';

export default class NormalCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arr: this.props.content,
        }

    }
    render() {

        return (
            <a className="feed-item" href="https://www.douban.com/note/721186333/" >
                <div className="feed-content">
                    <h3>{this.state.arr.content.title}</h3>
                    <p>{this.state.arr.content.abstract}</p>
                </div>
                <div className="author">

                    <span className="name">{this.state.arr.content.author.name}</span></div><span className="feed-label"></span>
            </a>
        )


    }
}