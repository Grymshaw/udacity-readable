/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

import CommentListContainer from './CommentListContainer';
import Navigation from './Navigation';
import NewCommentFormContainer from './NewCommentFormContainer';
import PostDetailsContainer from './PostDetailsContainer';


const PostDetailsView = ({ match, store }) => {
  const { posts } = store.getState().posts;
  return (
    <div>
      <Navigation match={match} />
      {posts[match.params.id] === undefined
        ? <Redirect to="/404" />
        : <div className="page">
          <PostDetailsContainer id={match.params.id} />
          <NewCommentFormContainer parentId={match.params.id} />
          <CommentListContainer parentId={match.params.id} />
        </div>
      }
    </div>
  );
};

PostDetailsView.propTypes = {
  match: PropTypes.shape({ params: PropTypes.object }).isRequired,
};

export default PostDetailsView;
