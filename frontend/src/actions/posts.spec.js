import * as types from '../constants/ActionTypes';
import * as actions from './posts';

describe('post actions', () => {
  it('addPost should create an ADD_POST action', () => {
  });

  it('editPost should create an EDIT_POST action', () => {
  });

  it('deletePost should create an DELETE_POST action', () => {
  });

  it('upvotePost should create an UPVOTE_POST action', () => {
  });

  it('downvotePost should create an DOWNVOTE_POST action', () => {
  });

  it('fetchPosts should create')

  it('addPost should create an ADD_POST action', () => {
  });
});



describe('post actions', () => {
  it('addPost should create ADD_POST action', () => {
    const currentDate = Date.now();
    const post = {
      author: 'Kyle',
      body: 'This is a post about something I care about',
      category: 'Sports',
      timestamp: currentDate,
      title: 'My post',
    };
    const expectedAction = {
      type: types.ADD_POST,
      id: '0',
      voteScore: 1,
      deleted: false,
      dateCreated: currentDate,
      lastEdited: currentDate,
      author: 'Kyle',
      body: 'This is a post about something I care about',
      category: 'Sports',
      title: 'My post',
    };
    expect(actions.addPost(post)).to.deep.equal(expectedAction);
    expect(actions.addPost(post)).to.deep.equal(Object.assign({}, expectedAction, { id: '1' }));
  });

  it('editPost should create EDIT_POST action', () => {
    const currentDate = Date.now();
    const post = {
      body: 'This is an edited post about something I care about',
      category: 'Programming',
      lastEdited: currentDate,
      title: 'My edited post',
    };
    const id = '0';
    const expectedAction = {
      type: types.EDIT_POST,
      id: '0',
      body: 'This is an edited post about something I care about',
      category: 'Programming',
      lastEdited: currentDate,
      title: 'My edited post',
    };
    expect(actions.editPost(id, post)).to.deep.equal(expectedAction);
  });

  it('deletePost should create DELETE_POST action', () => {
    const id = '0';
    const expectedAction = {
      type: types.DELETE_POST,
      id: '0',
    };
    expect(actions.deletePost(id)).to.deep.equal(expectedAction);
  });

  it('incrementPostVoteCount should create INCREMENT_POST_VOTE_COUNT action', () => {
    const id = '0';
    const expectedAction = {
      type: types.INCREMENT_POST_VOTE_COUNT,
      id,
    };
    expect(actions.incrementPostVoteCount(id)).to.deep.equal(expectedAction);
  });

  it('decrementPostVoteCount should create DECREMENT_POST_VOTE_COUNT actoin', () => {
    const id = '0';
    const expectedAction = {
      type: types.DECREMENT_POST_VOTE_COUNT,
      id,
    };
    expect(actions.decrementPostVoteCount(id)).to.deep.equal(expectedAction);
  });
});


describe('')
