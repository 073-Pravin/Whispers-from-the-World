import React, { useEffect ,useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
const News = (props)=>{
  

  const [articles, setArticles]=useState([])
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(1)
  const [totalResults,setTotalResults]=useState(0)

  const CapitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews =async ()=> {
    props.setProgress(10);
    setLoading(true);
    props.setProgress(30);
    
    let {data} = await axios.post('/api',{
      country: `${props.country}`,
      category:`${props.category}`,
      apikey:`${props.apikey}`,
      page:page+1,
      pageSize:props.pageSize
    });  
    let parsedData=data;
    // console.log(parsedData);
    
    props.setProgress(70);
    
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }
  useEffect(()=>{
    document.title = `${CapitalizeFirstLetter(props.category)} - Whispers from the world`;
    updateNews();
  },[])

  const fetchMoreData = async () => {
    setLoading(true);
    let {data} = await axios.post('/api',{
      country: `${props.country}`,
      category:`${props.category}`,
      apikey:`${props.apikey}`,
      page:page+1,
      pageSize:props.pageSize
    }); 
    let parsedData=data;
    props.setProgress(70);
    // console.log(parsedData);
    setPage(page+1)
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
    setLoading(false);
  };

    return (
      <>
        <h1 className="text-center" style={{marginTop:73}}>
        Whispers from the World - Top {CapitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h1>
        {/* {loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          // hasMore={true}
          loader={<Spinner/>}

        >
          <div className="container">
            <div className="row">
              {articles?.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItems
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
export default News
News.defaultProps = {
  country: "in",
  category: "general",
}
News.propTypes = {
  category: PropTypes.string,
  pageSize: PropTypes.number
}