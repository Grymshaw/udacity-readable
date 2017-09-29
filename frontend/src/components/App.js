import React from 'react';
import 'whatwg-fetch';

import './App.css';

const comments = [
  {
    id: '0',
    author: 'me',
    body: 'sample comment body',
  },
  {
    id: '1',
    author: 'me',
    body: 'sample comment body',
  },
  {
    id: '2',
    author: 'me',
    body: 'sample comment body',
  },
];

const posts = [
  {
    id: '0',
    author: 'not me',
    timestamp: Date.now(),
    body: 'This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.',
  },
  {
    id: '1',
    author: 'not me',
    timestamp: Date.now() - 10000,
    body: 'This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.',
  },
  {
    id: '2',
    author: 'not me',
    timestamp: Date.now() - 20000,
    body: 'This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.This will be the body of the post.',
  },
];

const App = () => (
  <div>
    <div>
      <div className="page">
        {/* navbar */}
        <div className="navbar">
          <span className="brand">Readable</span>
          <div className="nav-actions right">
            <select className="nav-selector category-selector">
              <option className="nav-selector__option">View All</option>
              <option className="nav-selector__option">React</option>
              <option className="nav-selector__option">Redux</option>
              <option className="nav-selector__option">Udacity</option>
            </select>
            <select className="nav-selector sort-order-selector">
              <option className="nav-selector__option">Votes (high to low)</option>
              <option className="nav-selector__option">Votes (low to high)</option>
              <option className="nav-selector__option">Date (recent first)</option>
              <option className="nav-selector__option">Date (oldest first)</option>
            </select>
          </div>
        </div>
        <div className="floating-action bottom-right">+Add Post+</div>
        {/* page content */}
        <div className="page-content">
          <div className="post-list">
            {posts.map(post => (
              <div key={post.id} className="card post-card">
                <div className="card-actions left post-voting">
                  <span>up arrow</span>
                  <span>40</span>
                  <span>down arrow</span>
                </div>
                <div className="card-content post-content">
                  <div className="card-content__header post-content__header">
                    <span className="card-title">{post.title}</span>
                    <span className="card-subtitle">{post.author}</span>
                    <span className="card-subtititle">{post.timestamp}</span>
                  </div>
                  <div className="card-content__body post-content__body">
                    <p className="post-body">{post.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="page">
        <div className="navbar">
          <span className="brand">Readable</span>
          <div className="nav-actions right">
            <select className="nav-selector sort-order-selector">
              <option className="nav-selector__option">Votes (high to low)</option>
              <option className="nav-selector__option">Votes (low to high)</option>
              <option className="nav-selector__option">Date (recent first)</option>
              <option className="nav-selector__option">Date (oldest first)</option>
            </select>
          </div>
        </div>

        <div className="page-content">
          <div className="post-details">
            <div className="post-actions left post-voting">
              <span>up arrow</span>
              <span>40</span>
              <span>down arrow</span>
            </div>
            <div className="post-body">
              <div className="post-title">{posts[0].title}</div>
              <div className="post-subtitle">{posts[0].author}</div>
              <div className="post-subtitle">{posts[0].timestamp}</div>
              <div className="post-body">{posts[0].body}</div>
            </div>
          </div>

          <div className="comment-form">
            <label htmlFor="author">
              Your name
              <input name="author" type="text" />
            </label>
            <label htmlFor="comment">
              Your name
              <textarea name="comment" />
            </label>
          </div>

          <div className="comment-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment-container">
                <div className="vote-actions vote-actions--comment">
                  <span>up arrow</span>
                  <span>40</span>
                  <span>down arrow</span>
                </div>
                <div className="comment-content">
                  <div className="comment-author">{comment.author}</div>
                  <div className="comment-time">{comment.timestamp}</div>
                  <div className="comment-body">{comment.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="page">
        <div className="navbar">
          <span className="brand">Readable</span>
          <div className="nav-actions right">
            <span>Back</span>
          </div>
        </div>

        <form className="new-post-form">
          <label htmlFor="title">
            Title:
            <br />
            <input name="title" type="text" />
            <br />
          </label>
          <label htmlFor="author">
            Your name:
            <br />
            <input name="author" type="text" />
            <br />
          </label>
          <label htmlFor="body">
            Post:
            <br />
            <textarea name="body" />
            <br />
          </label>
        </form>
      </div>
    </div>
  </div>
);

export default App;
