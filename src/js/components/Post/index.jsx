import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';

import {
  postsListSpacing,
  textBlockBackground,
  textBlockBorder,
  ratingButtonsWidth,
  contentWidth,
} from '../../style-vars';
import {fetchPost, addOrEditComment, deleteComment} from '../../actions/posts.action';
import PostItem from '../PostItem';
import Comment from '../Comment';
import CommentForm from '../CommentForm';

const PostsWrapper = styled.div`
  max-width: ${contentWidth}px;
  margin: 0 auto;
  padding: ${postsListSpacing}px;
`;

const PostContentWrapper = styled.div`
  margin-left: ${ratingButtonsWidth}px;
`;

const PostTextWrapper = styled.div`
  background: ${textBlockBackground};
  margin-top: 16px;
  margin-left: ${ratingButtonsWidth}px;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid ${textBlockBorder};
`;

class Post extends Component {
  submitComment = (e, additionalData = {}) => {
    e.preventDefault();
    const text = _.get(e, 'target.text.value');

    if (!text) {
      return false;
    }

    e.target.text.value = '';

    this.props.addOrEditComment({
      postId: this.props.currentPost.id,
      text,
      ...additionalData,
    });

    return true;
  }

  componentWillMount() {
    const postId = parseInt(this.props.match.params.id, 10);
    this.props.fetchPost(postId);
  }

  render() {
    const {
      isPostViewLoading,
      currentPost,
      deleteComment,
    } = this.props;

    if (!currentPost || isPostViewLoading) {
      return <div>Loading...</div>;
    }

    const topLevelComments = currentPost.comments.filter(c => c.parent_comment_id === null);

    return (
      <PostsWrapper>
        <PostItem {...currentPost} />
        {currentPost.text && (
          <PostTextWrapper>{currentPost.text}</PostTextWrapper>
        )}

        <PostContentWrapper>
          <div style={{marginTop: 16}}>
            <strong>{currentPost.comments.length} comments</strong>
            <hr />
          </div>

          <CommentForm onSubmit={this.submitComment} />

          {topLevelComments.map(comment => (
            <Comment
              key={comment.id}
              parentCommentId={comment.id}
              currentComment={comment}
              allComments={currentPost.comments}
              submitComment={this.submitComment}
              deleteComment={deleteComment}
            />
          ))}
        </PostContentWrapper>
      </PostsWrapper>
    );
  }
}

Post.propTypes = {
  fetchPost: PropTypes.func.isRequired,
  addOrEditComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, {fetchPost, addOrEditComment, deleteComment})(Post);
