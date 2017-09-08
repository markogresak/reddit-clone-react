import React, {PropTypes} from 'react';
import styled from 'styled-components';

import VoteButton from './VoteButton';
import {
  getColorBasedOnRating,
  postRatingWidth,
  postRatingTextSpacing,
} from '../../style-vars';


const Rating = styled.div`
  color: ${({userRating}) => getColorBasedOnRating(userRating)};
  margin: ${postRatingTextSpacing}px 0;
`;

Rating.propTypes = {
  userRating: PropTypes.number.isRequired,
};

const PostRatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: ${postRatingWidth}px;
`;

const PostRating = ({postId, rating}) => {
  // TODO: get the actual user rating
  const userRating = 0;
  return (
    <PostRatingWrapper>
      <VoteButton postId={postId} userRating={userRating} />
      <Rating userRating={userRating}>{rating}</Rating>
      <VoteButton down postId={postId} userRating={userRating} />
    </PostRatingWrapper>
  );
};

PostRating.propTypes = {
  postId: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};

export default PostRating;
