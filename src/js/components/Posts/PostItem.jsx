import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

import PostRating from './PostRating';

const PostItem = ({id, title, url, rating, comment_count: commentCount}) => {
  return (
    <div className="posts__item">
      <div className="post__rating">
        <PostRating postId={id} rating={rating} />
      </div>
      <div className="post__title">
        {
          url
            ? <a href={url}>{title}</a>
            : <Link to={`/posts/${id}`}>{title}</Link>
        }
      </div>
      <div className="post__details">
        <span className="post__details__comment-count">{commentCount}</span>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  rating: PropTypes.number.isRequired,
  comment_count: PropTypes.number.isRequired,
};

PostItem.defaultProps = {
  url: null,
};

export default PostItem;
