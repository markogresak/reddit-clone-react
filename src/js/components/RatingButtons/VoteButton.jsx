import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled, {css} from 'styled-components';

import {voteDefaultColor, voteUpColor, voteDownColor} from '../../style-vars';
import {
  addRatingButtons,
  addCommentRating,
  POST_RATE_UP,
  POST_RATE_DOWN,
} from '../../actions/posts.action';
import {hasUserToken} from '../../helpers/token-manager';


const arrowSize = ({comment}) => (comment ? 8 : 10);

const StyledVoteButton = styled.button`
${''/* hacks to override default button styles */}
  background: none;
  border-width: inherit;
  padding: 0;
${''/* Styles for VoteButton */}
  width: 0;
  height: 0;
  border-left: ${arrowSize}px solid transparent;
  border-right: ${arrowSize}px solid transparent;
  ${({down, userRating}) => (
    down ?
      css`border-top: ${arrowSize}px solid ${userRating === -1 ? voteDownColor : voteDefaultColor};` :
      css`border-bottom: ${arrowSize}px solid ${userRating === 1 ? voteUpColor : voteDefaultColor};`
  )}
  cursor: ${hasUserToken() ? 'pointer' : 'not-allowed'};
`;

StyledVoteButton.propTypes = {
  userRating: PropTypes.number.isRequired,
  down: PropTypes.bool.isRequired,
  comment: PropTypes.bool.isRequired,
};

const VoteButton = ({id, userRating, down, addRating, comment}) => (
  <StyledVoteButton
    disabled={!hasUserToken()}
    down={down}
    userRating={userRating}
    comment={comment}
    onClick={() => {
      if (down && userRating !== -1) {
        addRating({id, rating: POST_RATE_DOWN});
      } else if (!down && userRating !== 1) {
        addRating({id, rating: POST_RATE_UP});
      }
    }
    }
  />
);

VoteButton.propTypes = {
  id: PropTypes.number.isRequired,
  userRating: PropTypes.number.isRequired,
  addRating: PropTypes.func.isRequired,
  down: PropTypes.bool,
  comment: PropTypes.bool,
};

VoteButton.defaultProps = {
  down: false,
  comment: false,
};

function mapDispatchToProps(dispatch, ownProps) {
  const actionCreators = {
    addRating: ownProps.comment ? addCommentRating : addRatingButtons,
  };

  return bindActionCreators(actionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(VoteButton);
