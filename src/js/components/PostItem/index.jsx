import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';

import {
  mutedTextColor,
  textSmSize,
  textXsSize,
  postHeight,
  postSpacing,
  postRatingWidth,
} from '../../style-vars';
import extractDomain from '../../helpers/extract-domain';
import PostRating from '../PostRating';
import {routeCodes} from '../../routes';
import urlFromTemplate from '../../helpers/url-from-template';

const PostItemWrapper = styled.div`
  display: flex;
  margin-top: ${postSpacing}px;
  min-height: ${postHeight}px;
`;

const PostContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: calc(100% - ${postRatingWidth}px);
`;

const PostContent = styled.div``;
const ExternalUrlDomain = styled.small`
  margin-left: 6px;
  color: ${mutedTextColor};
  font-size: ${textXsSize}px;

  &::before {
    content: '(';
  }

  &::after {
    content: ')';
  }
`;

const PostDetails = styled.div`
  font-size: ${textSmSize}px;
  color: ${mutedTextColor};
  padding-top: 6px;
`;
const PostSubmitted = styled.span``;
const PostCommentCount = styled.div`
  a {
    font-size: ${textSmSize}px;
    font-weight: bold;
    color: ${mutedTextColor};
  }
`;

const PostItem = ({
  id,
  title,
  url,
  rating,
  comment_count: commentCount,
  submitted_at: submittedAt,
  user: {
    username,
    id: userId,
  },
}) => {
  return (
    <PostItemWrapper>
      <PostRating postId={id} rating={rating} />
      <PostContentWrapper>
        <PostContent>
          {
            url
              ? (
                <span>
                  <a href={url}>{title}</a>
                  <ExternalUrlDomain>{extractDomain(url)}</ExternalUrlDomain>
                </span>
              )
              : <Link to={urlFromTemplate(routeCodes.POST, {id})}>{title}</Link>
          }
        </PostContent>
        <PostDetails>
          <PostSubmitted>
            Submitted {moment(submittedAt).fromNow()} by{' '}
            <Link to={urlFromTemplate(routeCodes.USER, {id: userId})}>{username}</Link>
          </PostSubmitted>
        </PostDetails>
        <PostCommentCount>
          <Link to={urlFromTemplate(routeCodes.POST, {id})}>{commentCount} comments</Link>
        </PostCommentCount>
      </PostContentWrapper>
    </PostItemWrapper>
  );
};

PostItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  rating: PropTypes.number.isRequired,
  comment_count: PropTypes.number.isRequired,
  submitted_at: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

PostItem.defaultProps = {
  url: null,
  withoutDetails: false,
};

export default PostItem;
