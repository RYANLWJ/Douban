import React from 'react';

export default class NormalCard extends React.Component{
    constructor(props){
        super(props)
        this.state={
            arr:this.props.content,
        }
        console.log(this.props.content[0].content.title)
        this.props.content.map((item)=>{
            console.log(item.content.title)
        })
    }
    render(){
        return  this.state.arr.map((item,index)=>{
            if(item.content.photos.length==0){
                return(
                    <a className="feed-item" href="https://www.douban.com/note/721186333/" key={index}>
                    <div className="feed-content">
                      <h3>{item.content.title}</h3>
                      <p>{item.content.abstract}</p>
                    </div>
                    <div className="author">
                   
                      <span className="name">{item.content.author.name}</span></div><span className="feed-label"></span>
                  </a>
                    )
            }
     
        })
     
    }
}