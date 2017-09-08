import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import styled, {css} from 'styled-components';

import {voteDefaultColor, voteUpColor, voteDownColor} from '../../style-vars';
import {
  addPostRating as addPostRatingAction,
  POST_RATE_UP,
  POST_RATE_DOWN,
} from '../../actions/posts.action';
import {hasUserToken} from '../../helpers/token-manager';

const StyledVoteButton = styled.button`
${''/* hacks to override default button styles */}
  background: none;
  border-width: inherit;
  padding: 0;
${''/* Styles for VoteButton */}
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  ${({down, userRating}) => (
    down ?
      css`border-top: 10px solid ${userRating === -1 ? voteDownColor : voteDefaultColor};` :
      css`border-bottom: 10px solid ${userRating === 1 ? voteUpColor : voteDefaultColor};`
  )}
  cursor: ${hasUserToken() ? 'pointer' : 'not-allowed'};
`;

StyledVoteButton.propTypes = {
  userRating: PropTypes.number.isRequired,
  down: PropTypes.bool.isRequired,
};

const VoteButton = ({postId, userRating, down, addPostRating}) => (
  <StyledVoteButton
    disabled={!hasUserToken()}
    down={down}
    userRating={userRating}
    onClick={() => {
      if (down && userRating !== -1) {
        addPostRating({postId, rating: POST_RATE_DOWN});
      } else if (!down && userRating !== 1) {
        addPostRating({postId, rating: POST_RATE_UP});
      }
    }
  }
  />
);

VoteButton.defaultProps = {
  down: false,
};

VoteButton.propTypes = {
  postId: PropTypes.number.isRequired,
  userRating: PropTypes.number.isRequired,
  addPostRating: PropTypes.func.isRequired,
  down: PropTypes.bool,
};

export default connect(null, {addPostRating: addPostRatingAction})(VoteButton);
