import { request } from 'umi';
import { currentUser } from '../ant-design-pro/api';
import { getDomain } from '../helpers';
import store from 'store';

export async function student(params, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/students`, {
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

export async function updateStudent(id, params, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/students/${id}`, {
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

export async function addStudent(params, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/students`, {
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

export async function removeStudent(id, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/students/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}

export async function findStudentByClassroom(id, params, options) {
  const domain = getDomain();
  const token = store.get('accessToken');
  console.log({ id, params, options });

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/classrooms/${id}/students`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params,
    ...(options || {}),
  });
}
