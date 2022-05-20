export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        name: 'register',
        path: '/user/register',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.classroom-list',
    icon: 'table',
    path: '/classrooms',
    component: './ClassroomList',
  },
  {
    name: 'list.classroom-list',
    icon: 'table',
    path: '/classrooms/student/:student',
    hideInMenu: true,
    component: './ClassroomList',
  },
  {
    name: 'list.classroom-list',
    icon: 'table',
    path: '/classrooms/subject/:subject',
    hideInMenu: true,
    component: './ClassroomList',
  },
  {
    name: 'list.classroom-list',
    icon: 'table',
    path: '/classrooms/teacher/:teacher',
    hideInMenu: true,
    component: './ClassroomList',
  },
  {
    name: 'list.student-list',
    icon: 'table',
    path: '/students',
    component: './StudentList',
  },
  {
    name: 'list.student-list',
    icon: 'table',
    path: '/students/classroom/:classroom',
    hideInMenu: true,
    component: './StudentList',
  },
  {
    name: 'list.subject-list',
    icon: 'table',
    path: '/subjects/id/:id',
    hideInMenu: true,
    component: './SubjectList',
  },
  {
    name: 'list.subject-list',
    icon: 'table',
    path: '/subjects',
    component: './SubjectList',
  },
  {
    name: 'list.teacher-list',
    icon: 'table',
    path: '/teachers/id/:id',
    hideInMenu: true,
    component: './TeacherList',
  },
  {
    name: 'list.teacher-list',
    icon: 'table',
    path: '/teachers/',
    component: './TeacherList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
