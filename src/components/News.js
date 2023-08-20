import React, { useEffect ,useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

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
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }
  useEffect(()=>{
    document.title = `${CapitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
  },[])
  //   handlePrevClick = async () => {
  //     setState({ page: page - 1 });
  //     updateNews();
  //   };
  //   handleNextClick = async () => {
  //     setState({ page: page + 1 });
  //     updateNews();
  //   };
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pagesize=${props.pageSize}`;
    setPage(page+1)
    // let url="https://newsapi.org/v2/top-headlines?country=us&apiKey=0c1773b7175240c2989e42d7acb24af4"
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

    return (
      <>
        <h1 className="text-center" style={{marginTop:73}}>
          NewMonkey - Top {CapitalizeFirstLetter(props.category)}{" "}
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
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
          >
            &laquo; Previous
          </button>
          <button
            disabled={
              state.page + 1 >
                Math.ceil(state.totalArticles / props.pageSize) ||
              state.loading
            }
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            {" "}
            Next &raquo;
          </button>
        </div> */}
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