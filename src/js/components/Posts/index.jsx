import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {postsListSpacing} from '../../style-vars';
import PostItem from './PostItem';
import {fetchAllPosts} from '../../actions/posts.action';

const PostsWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: ${postsListSpacing}px;
`;

class Posts extends Component {
  componentWillMount() {
    this.props.fetchAllPosts();
  }

  renderInner() {
    if (this.props.arePostsLoading) {
      return (<div>Loading...</div>);
    }
    if (this.props.posts && this.props.posts.length > 0) {
      return this.props.posts.map(post => <PostItem key={post.id} {...post} />);
    }
    return (<div>No posts</div>);
  }

  render() {
    return (
      <PostsWrapper>
        {this.renderInner()}
      </PostsWrapper>
    );
  }
}

Posts.propTypes = {
  fetchAllPosts: PropTypes.func.isRequired,
  arePostsLoading: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired,
};

Posts.defaultProps = {
  posts: [],
};

function mapStateToProps(state) {
  return {
    posts: state.posts.allPosts,
    arePostsLoading: state.posts.arePostsLoading,
  };
}

export default connect(mapStateToProps, {fetchAllPosts})(Posts);
