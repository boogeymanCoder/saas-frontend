import { request } from 'umi';
import { currentUser } from '../ant-design-pro/api';
import { getDomain } from '../helpers';
import store from 'store';

export async function subject(params, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/subjects`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: { ...params },
    ...(options || {}),
  })
    .then((res) => {
      console.log({ res });
      res.data.forEach((data) => (data.key = data.id));
      return res;
    })
    .catch((err) => {
      console.log({ err });
    });
}

/** 新建规则 PUT /api/rule */

export async function updateSubject(id, params, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/subjects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params,
    ...(options || {}),
  });
}
/** 新建规则 POST /api/rule */

export async function addSubject(params, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/subjects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params,
    ...(options || {}),
  });
}
/** 删除规则 DELETE /api/rule */

export async function removeSubject(id, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/subjects/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}
