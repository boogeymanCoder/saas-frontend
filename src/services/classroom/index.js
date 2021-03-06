import { request } from 'umi';
import { currentUser } from '../ant-design-pro/api';
import { getDomain } from '../helpers';
import store from 'store';

export async function classroom(params, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/classrooms`, {
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
      console.log({ res });
      return res;
    })
    .catch((err) => {
      console.log({ err });
    });
}

/** 新建规则 PUT /api/rule */

export async function updateClassroom(id, params, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/classrooms/${id}`, {
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

export async function addClassroom(params, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/classrooms`, {
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

export async function removeClassroom(id, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/classrooms/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...(options || {}),
  });
}

export async function findClassroomByStudent(id, params, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/students/${id}/classrooms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params,
    ...(options || {}),
  }).then((res) => {
    console.log({ res });
    res.data.forEach((data) => (data.key = data.id));
    console.log({ res });
    return res;
  });
}

export async function findClassroomBySubject(id, params, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/subjects/${id}/classrooms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params,
    ...(options || {}),
  }).then((res) => {
    console.log({ res });
    res.data.forEach((data) => (data.key = data.id));
    console.log({ res });
    return res;
  });
}

export async function findClassroomByTeacher(id, params, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(`${PROTOCOL}//${domain}.${HOST_NAME}/api/teachers/${id}/classrooms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params,
    ...(options || {}),
  }).then((res) => {
    console.log({ res });
    res.data.forEach((data) => (data.key = data.id));
    console.log({ res });
    return res;
  });
}

export async function addClassroomStudent(id, student_id, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(
    `${PROTOCOL}//${domain}.${HOST_NAME}/api/classrooms/${id}/students/${student_id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      ...(options || {}),
    },
  );
}

export async function removeClassroomStudent(id, student_id, options) {
  const domain = getDomain();
  const token = store.get('accessToken');

  return request(
    `${PROTOCOL}//${domain}.${HOST_NAME}/api/classrooms/${id}/students/${student_id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      ...(options || {}),
    },
  );
}
