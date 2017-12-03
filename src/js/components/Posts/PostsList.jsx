import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import PostItem from '../PostItem';

const PostsList = ({posts, arePostsLoading, page, pageSize}) => {
  if (arePostsLoading) {
    return (<div>Loading...</div>);
  }
  if (_.isEmpty(posts)) {
    return (<div>No posts</div>);
  }
  const postsToRender = (page && pageSize) ? _.take(posts, page * pageSize) : posts;
  return postsToRender.map(post => <PostItem key={post.id} {...post} />);
};

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  arePostsLoading: PropTypes.bool.isRequired,
  page: PropTypes.number,
  pageSize: PropTypes.number,
};

PostsList.defaultProps = {
  page: null,
  pageSize: null,
};

export default PostsList;
