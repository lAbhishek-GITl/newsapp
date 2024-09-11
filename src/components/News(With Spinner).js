{/*
    This File is used if you want to display the news articles in separate pages. The pages can be traversed through Previous & Next Button.
    This component is changed & Infinite Scroll is used instead. The code for this approach is available down below.
    This component works same as News.js without InfiniteLoader, TopLoader
    
*/}



import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 5,
        category: "general"
    }
    
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    constructor(props)
    {
        super(props);
        this.state = {
            articles : [],
            loading : false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsOften`;
    }

    async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2d04f9eba33c4a9886dd34490aca06c7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        
        this.setState({
            articles : parsedData.articles || [],
            totalResults : parsedData.totalResults,
            loading: false});
    }

    async componentDidMount()
    {
        this.updateNews();




    /*
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2d04f9eba33c4a9886dd34490aca06c7&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        
        this.setState({
            articles : parsedData.articles,
            totalResults : parsedData.totalResults,
            loading: false});
    */
    }

    handlePreviousClick = async () => {
        this.setState({page: this.state.page - 1})
        this.updateNews();






    /*
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2d04f9eba33c4a9886dd34490aca06c7&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false

        });
    */
    }


    handleNextClick = async () => {
        this.setState({page: this.state.page + 1})
        this.updateNews();




    /* 
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2d04f9eba33c4a9886dd34490aca06c7&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json();
            
            this.setState({
                page: this.state.page + 1,
                articles : parsedData.articles,
                loading: false
            });
        }
    */
        
        
    }

    

    render() {
    
    return (
        <div className='container my-3'>
            <h1 className='text-center' style={{margin: "30px 0px"}} >NewsOften - Top Headlines In {this.capitalizeFirstLetter(this.props.category)} Category</h1>
            {this.state.loading && <Spinner />}

            <div className="row">
                {!this.state.loading && this.state.articles.map((element) => {
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,90):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                    </div>
                })}
            </div>

            <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" onClick={this.handlePreviousClick} className="btn btn-dark">&larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
            </div>
        </div>

    )
    }
}

export default News
