import React, { Component } from 'react';
import { PostListRow } from './PostListRow';
import axios from 'axios';


export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      isGiverPost: 1,
      filteredIds: undefined,
      userId: undefined
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/posts/')
      .then(response => {
        this.setState({
          posts: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      })
    console.log("component did mount called!!")
  }



  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ filteredIds: undefined });
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.isGiverPost !== this.state.isGiverPost) {
      this.setState({ isGiverPost: nextProps.isGiverPost });
    }
    if (nextProps.filteredIds !== this.state.filteredIds) {
      this.setState({ filteredIds: nextProps.filteredIds });
    }
    if (nextProps.userId !== this.state.userId) {
      this.setState({ userId: nextProps.userId });
    }
  }


  postList() {

    console.log(this.state.posts)

    var localIsGiverPost
    var filteredPost = this.state.posts;

    if (this.state.filteredIds != undefined) {
      if (this.state.filteredIds.length != 0 && this.state.filteredIds[0] != "-1") {
        filteredPost = this.state.filteredIds.map((key) => { return this.state.posts[parseInt(key)]; });
        console.log('search results' + JSON.stringify(filteredPost))
      } else if (this.state.filteredIds.length != 0 && this.state.filteredIds[0] == "-1") {
        filteredPost = [];
        console.log('search' + JSON.stringify(filteredPost))
      }
    }

    var localUserId = this.state.userId

    if (localUserId !== undefined) {
      console.log('user' + localUserId)
      return (
        this.state.posts
          .map((currentPost, i) => {
            return <PostListRow
              key={i}
              post={currentPost.creatorUserId == localUserId ? currentPost : ''}
            />
          }
          )
      )
    }

    else if (this.state.isGiverPost == '1') {
      console.log('all type')
      return (
        filteredPost
          .map((currentPost, i) => {
            return <PostListRow
              key={i}
              post={currentPost.isFullfilled == false ? currentPost : ''}
            />
          }
          )
      )
    }
    else if (this.state.isGiverPost == '2') {
      console.log('beneficiary type')
      localIsGiverPost = false
    }
    else if (this.state.isGiverPost == '3') {
      console.log('giver type')
      localIsGiverPost = true
    }

    console.log(filteredPost)
    return (
      filteredPost
        .map((currentPost, i) => {
          return <PostListRow
            key={i}
            post={((currentPost.isGiver == localIsGiverPost) && (currentPost.isFullfilled == false)) ? currentPost : ''}
          />
        }
        )
    )
  }


  render() {
    console.log("is giver" + this.state.isGiverPost)

    return (
      <div>
        {this.postList()}
      </div>
    )
  }
}