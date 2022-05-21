// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
import store from 'store';
import { getDomain } from '../helpers';
/** 获取当前的用户 GET /api/currentUser */

export async function currentUser(options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    skipErrorHandler: true,
    ...(options || {}),
  });
}
/** 退出登录接口 POST /api/login/outLogin */

export async function outLogin(options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}
/** 登录接口 POST /api/login/account */

export async function register(body, options) {
  const domain = getDomain();

  return request(`${API_URL}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateUser(body, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: body,
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */

export async function login(body, options) {
  const domain = getDomain();

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 此处后端没有提供注释 GET /api/notices */

export async function getNotices(options) {
  return request('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 获取规则列表 GET /api/rule */

export async function rule(params, options) {
  return request('/api/rule', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 新建规则 PUT /api/rule */

export async function updateRule(options) {
  return request('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}
/** 新建规则 POST /api/rule */

export async function addRule(options) {
  return request('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 删除规则 DELETE /api/rule */

export async function removeRule(options) {
  return request('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
