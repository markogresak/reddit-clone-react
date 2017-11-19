import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {
  postsListSpacing,
  textBlockBackground,
  textBlockBorder,
  postRatingWidth,
} from '../../style-vars';
import {fetchPost} from '../../actions/posts.action';
import PostItem from '../PostItem';

const PostsWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: ${postsListSpacing}px;
`;

const PostTextWrapper = styled.div`
  background: ${textBlockBackground};
  margin-top: 16px;
  margin-left: ${postRatingWidth}px;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid ${textBlockBorder};
`;

class Post extends Component {
  componentWillMount() {
    const postId = parseInt(this.props.match.params.id, 10);
    this.props.fetchPost(postId);
  }

  render() {
    const {
      isPostViewLoading,
      currentPost,
    } = this.props;

    if (!currentPost || isPostViewLoading) {
      return <div>Loading...</div>;
    }

    return (
      <PostsWrapper>
        <PostItem {...currentPost} />
        {currentPost.text && (
          <PostTextWrapper>{currentPost.text}</PostTextWrapper>
        )}
      </PostsWrapper>
    );
  }
}

Post.propTypes = {
  fetchPost: PropTypes.func.isRequired,
  isPostViewLoading: PropTypes.bool.isRequired,
  currentPost: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

Post.defaultProps = {
  currentPost: null,
};

function mapStateToProps(state) {
  return {
    currentPost: state.posts.currentPost,
    isPostViewLoading: state.posts.isPostViewLoading,
  };
}

export default connect(mapStateToProps, {fetchPost})(Post);
