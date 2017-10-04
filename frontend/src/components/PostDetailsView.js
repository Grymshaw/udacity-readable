/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import React from 'react';

import CommentListContainer from './CommentListContainer';
import NewCommentFormContainer from './NewCommentFormContainer';
import PostDetailsContainer from './PostDetailsContainer';

const PostDetailsView = ({ match }) => (
  <div style={{ width: '90%', margin: '0 auto' }}>
    <PostDetailsContainer id={match.params.id} />
    <NewCommentFormContainer parentId={match.params.id} />
    <CommentListContainer parentId={match.params.id} />
  </div>
);

PostDetailsView.propTypes = {
  match: PropTypes.shape({ params: PropTypes.object }).isRequired,
};

export default PostDetailsView;
