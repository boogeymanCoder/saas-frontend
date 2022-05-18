import { request } from 'umi';
import { currentUser } from '../ant-design-pro/api';

export async function student(params, options) {
  const user = await currentUser();

  return request(`http://${user.tenant.id}.${HOST_NAME}/api/students`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  }).then((res) => {
    console.log({ res });
    res.data.forEach((data) => (data.key = data.id));
    return res;
  });
}

// /** 新建规则 PUT /api/rule */

// export async function updateRule(options) {
//   return request('/api/rule', {
//     method: 'PUT',
//     ...(options || {}),
//   });
// }
// /** 新建规则 POST /api/rule */

// export async function addRule(options) {
//   return request('/api/rule', {
//     method: 'POST',
//     ...(options || {}),
//   });
// }
// /** 删除规则 DELETE /api/rule */

// export async function removeRule(options) {
//   return request('/api/rule', {
//     method: 'DELETE',
//     ...(options || {}),
//   });
// }
