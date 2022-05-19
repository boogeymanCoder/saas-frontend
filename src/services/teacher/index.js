import { request } from 'umi';
import { currentUser } from '../ant-design-pro/api';
import { getDomain } from '../helpers';
import store from 'store';

export async function teacher(params, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/teachers`, {
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

export async function updateTeacher(id, params, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/teachers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params,
    ...(options || {}),
  });
}
/** 新建规则 POST /api/rule */

export async function addTeacher(params, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/teachers`, {
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

export async function removeTeacher(id, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/teachers/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}
