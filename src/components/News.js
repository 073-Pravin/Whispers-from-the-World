import React, { Component } from 'react'
import NewsItems from './NewsItems'

export default class News extends Component {
    constructor(){
        super();
        console.log("hello");
        this.state ={
            articles: this.articles,
            loading:false
        }
    }
  render() {
    return (
        <div className="container my-3">
            <h1>NewMonkey - Top Headlines</h1>
            <div className="row">
                <div className="col-md-4">
                    <NewsItems title="myTitle" description="Mydescription"/>    
                </div>
                <div className="col-md-4">
                    <NewsItems title="myTitle" description="Mydescription"/>    
                </div>
                <div className="col-md-4">
                    <NewsItems title="myTitle" description="Mydescription"/>    
                </div>
            </div>
        </div>
    )
  }
}
