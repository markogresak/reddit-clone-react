import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {
  addPostRating as addPostRatingAction,
  POST_RATE_UP,
  POST_RATE_DOWN,
} from '../../actions/posts.action';

const PostRating = ({postId, rating, addPostRating}) => {
  return (
    <div>
      <button
        className="post__rating__vote post__rating__vote--up"
        onClick={() => addPostRating({postId, rating: POST_RATE_UP})}
      >
        <i className="fa fa-arrow-up" />
      </button>

      <div className="post__rating__value">{rating}</div>

      <button
        className="post__rating__vote post__rating__vote--down"
        onClick={() => addPostRating({postId, rating: POST_RATE_DOWN})}
      >
        <i className="fa fa-arrow-down" />
      </button>
    </div>
  );
};

PostRating.propTypes = {
  postId: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  addPostRating: PropTypes.func.isRequired,
};

export default connect(null, {addPostRating: addPostRatingAction})(PostRating);
