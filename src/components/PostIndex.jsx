import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostIndex extends Component {
  constructor(props) {
    super(props);

    this.renderPost = this.renderPost.bind(this);
  }
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPost() {
    console.log(this.props.posts);

    return _.map(this.props.posts, post => {
      return(
        <li className="list-group-item" key={post.id}>
          <div><Link to={`/posts/${post.id}`}>{post.title}</Link></div>
          <div>{post.categories ? post.categories : 'None'}</div>
          <div>{post.content}</div>
        </li>
      );
    });
  }

  render() {
    return(
      <div>
        <div className="text-xs-right">
          <Link
            className="btn btn-primary"
            to="/posts/new"
          >
            Add Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPost()}
        </ul>
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(fetchPosts, dispatch);
// }

function mapStateToProps({ posts }) {
  return { posts };
}

// { fetchPosts } shorthand for mapDispatchToProps() above
export default connect(mapStateToProps, { fetchPosts })(PostIndex);