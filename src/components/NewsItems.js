import React, { Component } from 'react'

export default class NewsItems extends Component {
  render() {
    let {title,description,imageUrl,newsUrl}=this.props
    return (
      <div className='my-3'>
        <div className="card" style={{width:"18rem"}}>
            <img src={imageUrl?imageUrl:"https://cdn1.expresscomputer.in/wp-content/uploads/2022/04/20113309/EC_Merger_01_750.jpg"} className='card-img-top' alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href={newsUrl} className="btn btn-sm btn-primary btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}
