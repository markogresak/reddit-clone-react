import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import VoteButton from './VoteButton';
import {
  getColorBasedOnRating,
  ratingButtonsWidth,
  ratingButtonsTextSpacing,
} from '../../style-vars';


const Rating = styled.div`
  color: ${({userRating}) => getColorBasedOnRating(userRating)};
  margin: ${ratingButtonsTextSpacing}px 0;
`;

Rating.propTypes = {
  userRating: PropTypes.number.isRequired,
};

const VoteButtonSpacer = styled.div`
  height: 8px;
`;

const RatingButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: ${ratingButtonsWidth}px;
  ${({comment}) => comment && css`
    margin-top: 10px;
    padding-right: 8px;
    flex-basis: auto;
  `}
  ${({collapsed}) => collapsed && css`
    visibility: hidden;
  `}
`;

const RatingButtons = ({id, rating, userRating, comment, collapsed}) => {
  return (
    <RatingButtonsWrapper comment={comment} collapsed={collapsed}>
      <VoteButton id={id} userRating={userRating} comment={comment} />
      {comment ? (
        <VoteButtonSpacer />
      ) : (
        <Rating userRating={userRating}>{rating}</Rating>
      )}
      <VoteButton down id={id} userRating={userRating} comment={comment} />
    </RatingButtonsWrapper>
  );
};

RatingButtons.propTypes = {
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  userRating: PropTypes.number.isRequired,
  comment: PropTypes.bool,
  collapsed: PropTypes.bool,
};

RatingButtons.defaultProps = {
  comment: false,
  collapsed: false,
};

export default RatingButtons;
