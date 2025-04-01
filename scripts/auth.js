import { fetchLogins } from '../../scripts/aem.js';

let authCallbacks = [];

export function addCallback(callback, block) {
  authCallbacks.push({
    callback: callback,
    block: block
  });
}

export async function executeCallbacks(tag) {
  while (authCallbacks.length) {
    const callback = authCallbacks.shift(); // Remove & execute one by one
    callback.callback(callback.block, tag);
  }
}


export async function validateAuth() {
  const { token } = JSON.parse(window.localStorage.getItem('auth'));
  const options = {
    method: 'post',
    body: JSON.stringify({
      token,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch('https://28538-authfake.adobeio-static.net/api/v1/web/FakeAuth/verify', options);
  const userInfo = await response.json();
  return userInfo;
}

export default async function authenticate(username, password) {
  const options = {
    method: 'post',
    body: JSON.stringify({
      identifier: username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch('https://28538-authfake.adobeio-static.net/api/v1/web/FakeAuth/generic', options);
  if (!response.ok) {
    // authenticate using logins spreadsheet
    const logins = await fetchLogins();
    return logins[username];
  } else {
    const userInfo = await response.json();
    window.localStorage.setItem('auth', JSON.stringify(userInfo));
    return userInfo;
  }

  return null;
}