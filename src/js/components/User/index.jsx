import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import PostsList from '../Posts/PostsList';
import Comment from '../Comment';
import { fetchUser } from '../../actions/user.action';
import { contentWidth, postsListSpacing } from '../../style-vars';
import { routeCodes } from '../../routes';
import urlFromTemplate from '../../helpers/url-from-template';

const UsersWrapper = styled.div`
  max-width: ${contentWidth}px;
  margin: 0 auto;
  padding: ${postsListSpacing}px;
`;

const TabsWrapper = styled.div`
  margin-bottom: 20px;
`;

const TabButtonWrapper = styled.span`
  margin-right: 16px;
`;

const userTabs = {
  posts: 'posts',
  comments: 'comments',
};

class User extends React.Component {
  userId = () => {
    return this.props.match.params.id;
  };

  componentWillMount() {
    this.props.fetchUser(this.userId());
  }

  render() {
    const { isUserLoading, currentUser, match: { params: { tab, id } } } = this.props;

    if (!tab) {
      return <Redirect to={urlFromTemplate(routeCodes.USER, { id, tab: userTabs.posts })} />;
    }

    return (
      <UsersWrapper>
        <h1>User {currentUser.username}</h1>

        <TabsWrapper>
          <TabButtonWrapper>
            <Link to={urlFromTemplate(routeCodes.USER, { id, tab: userTabs.posts })}>Posts</Link>
          </TabButtonWrapper>
          <TabButtonWrapper>
            <Link
              to={urlFromTemplate(routeCodes.USER, {
                id,
                tab: userTabs.comments,
              })}
            >
              Comments
            </Link>
          </TabButtonWrapper>
        </TabsWrapper>

        <hr />

        {tab === userTabs.posts && <PostsList posts={currentUser.posts} arePostsLoading={isUserLoading} />}

        {tab === userTabs.comments &&
          currentUser.comments.map(comment => (
            <Comment
              key={comment.id}
              parentCommentId={comment.id}
              currentComment={comment}
              allComments={currentUser.comments}
              submitComment={() => {}}
              deleteComment={() => {}}
              disableNesting
              hideButtons
            />
          ))}
      </UsersWrapper>
    );
  }
}

User.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  isUserLoading: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      tab: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    isUserLoading: state.user.isUserLoading,
    currentUser: state.user.currentUser,
  };
}

export default connect(mapStateToProps, { fetchUser })(User);
