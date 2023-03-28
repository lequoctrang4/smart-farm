const { sign, verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');
const { NotAuthError } = require('./errors');

const KEY = 'supersecret';


export function createJSONToken(id) {
  return sign({ id }, KEY, { expiresIn: '1d' });
}

export function validateJSONToken(token) {
  return verify(token, KEY);
}
export function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
export function checkAuthMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  if (!req.headers.authorization) {
    console.log('NOT AUTH. AUTH HEADER MISSING.');
    return next(new NotAuthError('Not authenticated.'));
  }
  const authFragments = req.headers.authorization.split(' ');

  if (authFragments.length !== 2) {
    console.log('NOT AUTH. AUTH HEADER INVALID.');
    return next(new NotAuthError('Not authenticated.'));
  }
  const authToken = authFragments[1];
  try {
    const validatedToken = validateJSONToken(authToken);
    req.token = validatedToken;
  } catch (error) {
    console.log('NOT AUTH. TOKEN INVALID.');
    return next(new NotAuthError('Not authenticated.'));
  }
  next();
}
