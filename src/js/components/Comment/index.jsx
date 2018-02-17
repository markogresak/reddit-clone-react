import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import moment from 'moment';
import styled, {css} from 'styled-components';

import RatingButtons from '../RatingButtons';
import CommentForm from '../CommentForm';
import {routeCodes} from '../../routes';
import urlFromTemplate from '../../helpers/url-from-template';
import {hasUserToken, getUserToken} from '../../helpers/token-manager';
import {
  textSmSize,
  mutedTextColor,
  defaultTextColor,
  defaultBorderColor,
} from '../../style-vars';


const CommentWrapper = styled.div`
  display: flex;
  margin-top: ${props => (props.nested ? 8 : 20)}px;

  &:first-child {
    margin-top: 0;
  }
`;

const CommentDetails = styled.div`
  font-size: ${textSmSize}px;
  color: ${mutedTextColor};
  padding-top: 6px;
  margin-bottom: 4px;
`;

const NestedWrapper = styled.div`
  border-left: 1px solid ${defaultBorderColor};
  padding-left: 16px;
`;

const CommentPoints = styled.span`
  font-weight: bold;
  color: ${defaultTextColor};
`;

const CollapseButton = styled.span`
  margin-right: 8px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CommentContentWrapper = styled.div`
  ${props => props.collapsed && css`
    display: none;
  `}
`;

const ActionLink = styled.span`
  font-size: ${textSmSize}px;
  font-weight: bold;
  color: ${mutedTextColor};
  padding-top: 8px;
  margin-bottom: 6px;
  margin-right: 6px;
  cursor: pointer;
`;

class Comment extends React.Component {
  state = {
    collapsed: false,
    showReplyForm: false,
    editMode: false,
  }

  toggleCollapse = () => {
    this.setState({collapsed: !this.state.collapsed});
  }

  openReplyForm = () => {
    this.setState({showReplyForm: true});
  }

  closeReplyForm = () => {
    this.setState({showReplyForm: false});
  }

  submitReply = (e) => {
    const {editMode} = this.state;

    const submitSuccess = this.props.submitComment(e, {
      parentCommentId: this.props.parentCommentId,
      ...(editMode && {commentId: this.props.currentComment.id}),
    });

    if (submitSuccess) {
      if (editMode) {
        this.closeEditForm();
      } else {
        this.closeReplyForm();
      }
    }
  }

  openEditForm = () => {
    this.setState({editMode: true});
  }

  closeEditForm = () => {
    this.setState({editMode: false});
  }

  onDeleteComment = () => {
    // eslint-disable-next-line no-alert
    if (confirm('Are you sure you wish to delete this comment?')) {
      this.props.deleteComment(this.props.currentComment.id);
    }
  }

  render() {
    const {currentComment, allComments, submitComment, deleteComment, nested, disableNesting, hideButtons} = this.props;
    const {collapsed, showReplyForm, editMode} = this.state;

    const {
      id,
      user,
      rating,
      text,
      submitted_at: submittedAt,
      user_comment_rating: userRating,
    } = currentComment;

    const nestedComments = allComments.filter(c => c.parent_comment_id === id);
    const currentUserId = parseInt((getUserToken() || {}).userId, 10);

    return (
      <CommentWrapper nested={nested}>
        <RatingButtons id={id} rating={rating} userRating={userRating || 0} comment collapsed={collapsed} />

        <div>
          <CommentDetails>
            <CollapseButton onClick={this.toggleCollapse}>[ {collapsed ? '+' : '-'} ]</CollapseButton>
            <Link to={urlFromTemplate(routeCodes.USER, {id: user.id})}>{user.username}</Link>{' '}
            <CommentPoints>{rating} points</CommentPoints>{' '}
            <span>{moment(submittedAt).fromNow()}</span>
          </CommentDetails>
          <CommentContentWrapper collapsed={collapsed}>
            <div>
              {editMode ? (
                <CommentForm
                  onSubmit={this.submitReply}
                  onClose={this.closeEditForm}
                  withCancelButton
                  defaultValue={text}
                />
              ) : (
                <span>{text}</span>
              )}
            </div>
            {hasUserToken() && !hideButtons && !editMode &&
              <span>
                <ActionLink onClick={this.openReplyForm}>Reply</ActionLink>
                {currentUserId === user.id &&
                  <span>
                    <ActionLink onClick={this.openEditForm}>Edit</ActionLink>
                    <ActionLink onClick={this.onDeleteComment}>Delete</ActionLink>
                  </span>
                }
              </span>
            }

            {showReplyForm && (
              <CommentForm onSubmit={this.submitReply} onClose={this.closeReplyForm} withCancelButton />
            )}

            {!disableNesting && nestedComments.length > 0 && (
              <NestedWrapper>
                {nestedComments.map(comment => (
                  <Comment
                    key={comment.id}
                    parentCommentId={comment.id}
                    currentComment={comment}
                    allComments={allComments}
                    submitComment={submitComment}
                    deleteComment={deleteComment}
                    nested
                  />
                ))}
              </NestedWrapper>
            )}
          </CommentContentWrapper>
        </div>
      </CommentWrapper>
    );
  }
}

Comment.propTypes = {
  parentCommentId: PropTypes.number.isRequired,
  currentComment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    submitted_at: PropTypes.string.isRequired,
    user_comment_rating: PropTypes.number,
  }).isRequired,
  allComments: PropTypes.array.isRequired,
  submitComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  nested: PropTypes.bool,
  disableNesting: PropTypes.bool,
  hideButtons: PropTypes.bool,
};

Comment.defaultProps = {
  nested: false,
  disableNesting: false,
  hideButtons: false,
};

export default Comment;
