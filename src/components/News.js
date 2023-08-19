import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export default class News extends Component {
    static defaultProps={
        country:'in',
        category:'general'
    } 
    static propTypes = {
        category: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    
    }
    
    constructor(){
        super();
        this.state ={
            articles: [],
            loading:false,
            page:1
        }
    }
    
    async updateNews(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3ab3688ee3ca4cd99325f03e00e4676a&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data=await fetch(url);
        let parsedData= await data.json();
        this.setState({
            articles:parsedData.articles,
            totalArticles:parsedData.totalResults,
            loading:[parsedData.length!=0?false:true]
        });
    }
    
    async componentDidMount(){
        this.updateNews();
    }
    handlePrevClick= async()=>{
        this.setState({page:this.state.page - 1});
        this.updateNews();
    }
    handleNextClick= async()=>{
        this.setState({page:this.state.page + 1});
        this.updateNews();
    }
  render() {
    return (
        <div className="container my-3">
            <h1 className='text-center m-5' >NewMonkey - Top Headlines</h1>
            {this.state.loading && <Spinner/>}
            <div className="row">
                {!this.state.loading && this.state.articles?.map((element)=>{
                    return <div className='col-md-4' key={element.url}>
                        <NewsItems title={element.title?element.title.slice(0,45):""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>

                })}
            </div>
            <div className='container d-flex justify-content-between' >
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
                <button disabled={this.state.page+1>Math.ceil(this.state.totalArticles/this.props.pageSize) || this.state.loading} type="button" className="btn btn-dark" onClick={this.handleNextClick}> Next &raquo;</button>
            </div>
        </div>
    )
  }
}