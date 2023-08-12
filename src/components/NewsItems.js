import React, { Component } from 'react'

export default class NewsItems extends Component {
  render() {
    let {title,description,imageUrl}=this.props
    return (
      <div className='my-3'>
        <div className="card" style={{width:"18rem"}}>
            <img src="https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/rockcms/2023-08/230811-hunter-biden-ONE-TIME-USE-mn-1245-1ac033.jpg" className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href="/newdetail" className="btn btn-sm btn-primary">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}
