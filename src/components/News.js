import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general"
  }
  static PropTyps = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }


  constructor() {
    super();
    this.state = {
      // articles:this.articles,
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0

    }
  }

  async updateNews() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`
    // const url  = `https://newsapi.org/v2/top-headlines?country= ${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url)
    this.props.setProgress(30)

    let parseData = await data.json()
    this.props.setProgress(70)
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,

    })
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updateNews()
  }
  onHandelPrevious = async () => {
    this.setState({ page: this.state.page - 1 })
    this.updateNews();
  }

  onHandelNext = async () => {

    this.setState({ page: this.state.page + 1 })
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`
    this.setState({ loading: true });
    let data = await fetch(url)
    let parseData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false,

    })
  };


  render() {
    // console.log("After render");
    return (
      <>
        <h2 className='text-center'>News Head-lines</h2>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""}
                    description={element.description ? element.description.slice(0, 88) : ""}
                    newUrl="todo" imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt} />
                </div>

              })}
            </div>
          </div>
        </InfiniteScroll>
      </>

    )
  }
}

export default News 