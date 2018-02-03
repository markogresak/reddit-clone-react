import urlFromTemplate from './helpers/url-from-template';

// GET - get all posts
// POST - add post
// PUT(id) - edit post
// DELETE(id) - remove post
export const posts = (postId) => urlFromTemplate('/posts/:id?', {id: postId});

// PUT(id) - add/edit post rating (upvote/downvote)
export const ratePost = (postId) => `${posts(postId)}/rate`;

// POST - add comment
// PUT(id) - edit comment
// DELETE(id) - remove comment
export const comments = (commentId) => urlFromTemplate('/comments/:id?', {id: commentId});

// PUT(id) - add/edit comment rating (upvote/downvote)
export const rateComment = (commentId) => `${comments(commentId)}/rate`;

// POST - login user
export const login = () => '/login';

// POST - register user
export const register = () => '/users';

// GET(id) - get user details
// POST - add user
// PUT(id) - edit user details
// DELETE(id) - remove user
export const users = (userId) => urlFromTemplate('/users/:id?', {id: userId});
