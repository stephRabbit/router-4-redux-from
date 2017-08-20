import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost, fetchPost } from '../actions';
import { Link } from 'react-router-dom';

class PostShow extends Component {
  componentDidMount() {
    // props.match takes select params for url '/:id/:somethingElse ...(wildcards)'
    // provided by react router

    // Can cahce request by wrapping code below
    // with if (! this.props.post)
    const { id } = this.props.match.params
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    // this.props.post.id assumes that the post
    // has been fetched - risky
    // params object always has the id
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => this.props.history.push('/'));
  }
  render() {
    const { post } = this.props;

    if (! post) return <div>Loading ...</div>;

    return(
      <div>
        <Link to="/">Back to Posts</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// ownProps are props going to current Component(PostShow) this.props === ownProps
function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts[ownProps.match.params.id]
  };
}
export default connect(mapStateToProps, { deletePost, fetchPost })(PostShow);