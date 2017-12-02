import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import moment from 'moment';
import styled, {css} from 'styled-components';

import RatingButtons from '../RatingButtons';
import {routeCodes} from '../../routes';
import urlFromTemplate from '../../helpers/url-from-template';
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

class Comment extends React.Component {
  state = {
    collapsed: false,
  }

  toggleCollapse = () => {
    this.setState({collapsed: !this.state.collapsed});
  }

  render() {
    const {currentComment, allComments, nested} = this.props;
    const {collapsed} = this.state;

    const {
      id,
      user,
      rating,
      text,
      submitted_at: submittedAt,
      user_comment_rating: userRating,
    } = currentComment;

    const nestedComments = allComments.filter(c => c.parent_comment_id === id);

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
              {text}
            </div>
            {nestedComments.length > 0 && (
              <NestedWrapper>
                {nestedComments.map(comment => (
                  <Comment
                    key={comment.id}
                    currentComment={comment}
                    allComments={allComments}
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
  currentComment: PropTypes.object.isRequired,
  allComments: PropTypes.array.isRequired,
  nested: PropTypes.bool,
};

Comment.defaultProps = {
  nested: false,
};

export default Comment;
