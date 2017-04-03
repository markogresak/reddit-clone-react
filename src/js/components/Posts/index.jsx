import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import PostItem from './PostItem';
import {fetchAllPosts} from '../../actions/posts.action';

class Posts extends Component {
  componentWillMount() {
    this.props.fetchAllPosts();
  }

  renderInner() {
    if (this.props.isLoading) {
      return (<div>Loading...</div>);
    }
    if (this.props.posts && this.props.posts.length > 0) {
      return this.props.posts.map(post => <PostItem key={post.id} {...post} />);
    }
    return (<div>No posts</div>);
  }

  render() {
    return (
      <div>
        {this.renderInner()}
      </div>
    );
  }
}

Posts.propTypes = {
  fetchAllPosts: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PostItem.propTypes),
};

Posts.defaultProps = {
  posts: [],
};

function mapStateToProps(state) {
  return {
    posts: state.getIn(['posts', 'posts']),
    isLoading: state.getIn(['posts', 'isLoading']),
  };
}

export default connect(mapStateToProps, {fetchAllPosts})(Posts);
