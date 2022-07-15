import React, { Component } from 'react'

export class NewsItem extends Component {
 
  render() {

    let {title ,description,imgUrl,newsUrl,author,date} = this.props
    return (
      <div className='my-3 '>
       <div className="card  ">
      <img src={!imgUrl?"https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg":imgUrl} style={{height:'259px', width:'354px'}} className="card-img-top" alt="..."/>
        <div className="card-body ">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text "><small className="text-muted">By{!author?"Unkonw":author} on {new Date (date).toGMTString()}</small></p>
            <a href={newsUrl} target="blank" className="btn btn-sm btn-dark d-flex justify-content-center ">Read More</a>
        </div>
</div>
      </div>
    )
  }
}

export default NewsItem