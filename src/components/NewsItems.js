import React, { Component } from 'react'

export default class NewsItems extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source}=this.props
    return (
      <div className='my-3'>
        <div className="card" >
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>
          {source}</span>
            <img src={imageUrl?imageUrl:"https://cdn1.expresscomputer.in/wp-content/uploads/2022/04/20113309/EC_Merger_01_750.jpg"} className='card-img-top' alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className='card-text'><small className='text-muted'>By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} className="btn btn-sm btn-primary btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}
