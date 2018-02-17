import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import PostItem from '../PostItem';

const PostsList = ({posts, arePostsLoading}) => {
  if (arePostsLoading) {
    return (<div>Loading...</div>);
  }
  if (_.isEmpty(posts)) {
    return (<div>No posts</div>);
  }
  return posts.map(post => <PostItem key={post.id} {...post} />);
};

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  arePostsLoading: PropTypes.bool.isRequired,
};

export default PostsList;
