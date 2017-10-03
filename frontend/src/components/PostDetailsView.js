/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import React from 'react';

import CommentListContainer from './CommentListContainer';
import PostDetailsContainer from './PostDetailsContainer';

const PostDetailsView = ({ match }) => (
  <div>
    <PostDetailsContainer id={match.params.id} />
    <CommentListContainer parentId={match.params.id} />
  </div>
);

PostDetailsView.propTypes = {
  match: PropTypes.shape({ params: PropTypes.object }).isRequired,
};

export default PostDetailsView;
