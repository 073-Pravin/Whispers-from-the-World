import React, { Component } from 'react'
import NewsItems from './NewsItems'

export default class News extends Component {
    constructor(){
        super();
        this.state ={
            articles: [],
            loading:false
        }
    }
    async componentDidMount(){
        console.log("cdm");
        let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=3ab3688ee3ca4cd99325f03e00e4676a";
        let data=await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        this.setState({articles:parsedData.articles});
    }
    handlePrevClick=()=>{
        console.log("previous");
    }
    handleNextClick=()=>{
        console.log("Next");
    }
  render() {
    return (
        <div className="container my-3">
            <h1>NewMonkey - Top Headlines</h1>
            <div className="row">
                {this.state.articles?.map((element)=>{
                    return <div className='col-md-4' key={element.url}>
                        <NewsItems title={element.title?element.title.slice(0,45):""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                    </div>

                })}
            </div>
            <div className='container d-flex justify-content-between' >
                <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={handlePrevClick}>&laquo; Previous</button>
                <button type="button" class="btn btn-dark" onClick={handleNextClick}> Next &raquo;</button>
            </div>
        </div>
    )
  }
}
