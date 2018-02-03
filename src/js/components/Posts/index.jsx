import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import _ from 'lodash';

import {routeCodes} from '../../routes';
import {postsListSpacing, contentWidth} from '../../style-vars';
import PostsList from './PostsList';
import {fetchAllPosts} from '../../actions/posts.action';
import hasScrolledToBottom from '../../helpers/has-scrolled-to-bottom';
import urlFromTemplate from '../../helpers/url-from-template';
import {postTypes} from '../NewPost';
import {hasUserToken} from '../../helpers/token-manager';

const PostsWrapper = styled.div`
  max-width: ${contentWidth}px;
  margin: 0 auto;
  padding: ${postsListSpacing}px;
`;

const NewPostWrapper = styled.div`
  margin-top: 20px;
  margin-right: 16px;
  display: flex;
  justify-content: flex-end;
`;

const NewPostButtonWrapper = styled.div`
  margin-right: 10px;
`;

const pageSize = 20;

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      maxPage: Math.ceil(props.posts.length / pageSize),
    };
  }

  handleScroll = () => {
    const {page, maxPage} = this.state;
    if (page < maxPage && hasScrolledToBottom()) {
      this.setState({page: page + 1});
    }
  }

  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.props.fetchAllPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.posts, nextProps.posts)) {
      this.setState({
        page: 1,
        maxPage: Math.ceil(nextProps.posts.length / pageSize),
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const {posts, arePostsLoading} = this.props;

    return (
      <div>
        {hasUserToken() &&
          <NewPostWrapper>
            <NewPostButtonWrapper>
              <Link to={urlFromTemplate(routeCodes.NEW_POST, {type: postTypes.link})}>
                <button>+ Add new link post</button>
              </Link>
            </NewPostButtonWrapper>
            <NewPostButtonWrapper>
              <Link to={urlFromTemplate(routeCodes.NEW_POST, {type: postTypes.text})}>
                <button>+ Add new text post</button>
              </Link>
            </NewPostButtonWrapper>
          </NewPostWrapper>
        }
        <PostsWrapper>
          <PostsList posts={posts} arePostsLoading={arePostsLoading} pageSize={pageSize} page={this.state.page} />
        </PostsWrapper>
      </div>
    );
  }
}

Posts.propTypes = {
  fetchAllPosts: PropTypes.func.isRequired,
  arePostsLoading: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired,
};

Posts.defaultProps = {
  posts: [],
};

function mapStateToProps(state) {
  return {
    posts: state.posts.allPosts,
    arePostsLoading: state.posts.arePostsLoading,
  };
}

export default connect(mapStateToProps, {fetchAllPosts})(Posts);