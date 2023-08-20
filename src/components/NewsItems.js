import React from 'react'

const NewsItems=(props)=>{
    let {title,description,imageUrl,newsUrl,author,date,source}=props
    return (
      <div className='my-3'>
        <div className="card" >
          <div style={{
            display: 'flex',
            position: 'absolute',
            right: 0,
            justifyContent: 'flex-end'
          }}>
            <span className="badge rounded-pill bg-danger">
              {source}</span>

          </div>
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
export default NewsItems
