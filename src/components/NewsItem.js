import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    
    return (
        <div className='my-3'>
            <div className="card">
                <span className="badge text-bg-danger">{source}</span>
                <img src={!imageUrl?"https://c.ndtvimg.com/2024-06/ih3u0is8_virat-kohli-afp_625x300_30_June_24.jpg?im=FeatureCrop,algorithm=dnn,width=806,height=605":imageUrl} className="card-img-top" alt="News" />
                    <div className="card-body">
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-body-secondary"> By {!author?"Unknown" : author} on {new Date(date).toGMTString()} </small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
            </div>
        </div>
        )
    }
}

export default NewsItem
