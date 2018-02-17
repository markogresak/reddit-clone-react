import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { hasUserToken } from '../../helpers/token-manager';

const CommentFormWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
`;

const CommentFormButtons = styled.div`
  margin-top: 10px;
`;

const CommentForm = ({ onSubmit, addCommentPending, onClose, withCancelButton, defaultValue, editMode }) => {
  if (!hasUserToken()) {
    return null;
  }

  return (
    <CommentFormWrapper>
      <form onSubmit={onSubmit}>
        <textarea
          name="text"
          id="text"
          cols="1"
          rows="1"
          style={{ width: 500, height: 100 }}
          defaultValue={defaultValue}
        />

        <CommentFormButtons>
          <button type="submit" disabled={addCommentPending}>
            {editMode ? 'Edit comment' : 'Submit reply'}
          </button>
          {withCancelButton && (
            <button type="button" onClick={onClose} style={{ marginLeft: 10 }} disabled={addCommentPending}>
              Cancel
            </button>
          )}
        </CommentFormButtons>
      </form>
    </CommentFormWrapper>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  addCommentPending: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  withCancelButton: PropTypes.bool,
  defaultValue: PropTypes.string,
  editMode: PropTypes.bool,
};

CommentForm.defaultProps = {
  onClose: () => {},
  withCancelButton: false,
  defaultValue: '',
  editMode: false,
};

function mapStateToProps(state) {
  return {
    addCommentPending: state.posts.addCommentPending,
  };
}

export default connect(mapStateToProps)(CommentForm);
