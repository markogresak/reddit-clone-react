import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addPost } from '../../actions/posts.action';
import { routeCodes } from '../../routes';
import urlFromTemplate from '../../helpers/url-from-template';
import { hasUserToken } from '../../helpers/token-manager';

const NewPostWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  margin-top: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
  display: inline-block;
  padding-bottom: 6px;
`;

export const postTypes = {
  link: 'link',
  text: 'text',
};

class NewPost extends React.Component {
  onSubmit = e => {
    e.preventDefault();
    const postType = this.postType();

    const postData = {
      title: e.target.title.value.trim(),
      ...(postType === postTypes.link && { url: e.target.url.value.trim() }),
      ...(postType === postTypes.text && { text: e.target.text.value.trim() }),
    };

    this.props.addPost(postData);

    return true;
  };

  postType = () => {
    return this.props.match.params.type;
  };

  render() {
    if (!hasUserToken()) {
      return <Redirect to={routeCodes.HOME} />;
    }

    const { addPostPending, newPostId } = this.props;
    const postType = this.postType();

    if (newPostId) {
      return <Redirect to={urlFromTemplate(routeCodes.POST, { id: newPostId })} />;
    }

    return (
      <NewPostWrapper>
        <h1>Add new {postType} post</h1>

        <div>
          <form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label htmlFor="title">Title</Label>
              <Input type="text" name="title" id="title" required />
            </FormGroup>

            {postType === postTypes.link && (
              <FormGroup>
                <Label htmlFor="url">Link</Label>
                <Input type="text" name="url" id="url" required />
              </FormGroup>
            )}

            {postType === postTypes.text && (
              <FormGroup>
                <Label htmlFor="text">Text</Label>
                <textarea name="text" id="text" cols="1" rows="1" style={{ width: '100%', height: 100 }} required />
              </FormGroup>
            )}

            <button type="submit" disabled={addPostPending}>
              {addPostPending ? 'Saving post...' : 'Save post'}
            </button>
          </form>
        </div>
      </NewPostWrapper>
    );
  }
}

NewPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  addPostPending: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  newPostId: PropTypes.number,
};

NewPost.defaultProps = {
  newPostId: null,
};

function mapStateToProps(state) {
  return {
    addPostPending: state.posts.addPostPending,
    newPostId: state.posts.newPostId,
  };
}

export default connect(mapStateToProps, { addPost })(NewPost);
