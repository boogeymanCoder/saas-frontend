import { findStudentByClassroom, student } from '@/services/students';
import { ProFormSelect } from '@ant-design/pro-form';
import React from 'react';
import { useIntl } from 'umi';

export const fetchStudents = async (params, currentRow) => {
  try {
    const { data } = await student({ 'filter[full_name]': params.keyWords, 'page[size]': 1000 });
    console.log({ data });

    const options = data.map((value) => {
      return {
        label: `${value.first_name} ${value.middle_name} ${value.last_name}`,
        value: value.id,
      };
    });

    if (currentRow?.student) {
      options.push({
        label: currentRow.student.name,
        value: currentRow.student.id,
      });
    }
    console.log({ options });
    return options;
  } catch (err) {
    console.log({ err });
  }
};

export const fetchClassroomStudents = async (classroomId, params, currentRow) => {
  try {
    const { data } = await findStudentByClassroom(classroomId, {
      'filter[full_name]': params.keyWords,
      'page[size]': 1000,
    });
    console.log({ data });

    const options = data.map((value) => {
      return {
        label: `${value.first_name} ${value.middle_name} ${value.last_name}`,
        value: value.id,
      };
    });

    if (currentRow?.student) {
      options.push({
        label: currentRow.student.name,
        value: currentRow.student.id,
      });
    }
    console.log({ options });
    return options;
  } catch (err) {
    console.log({ err });
  }
};

export default function StudentSelector({ classroomId, currentRow, ...props }) {
  const intl = useIntl();
  console.log('studentSelector:', { currentRow });

  return (
    <ProFormSelect
      rules={[
        {
          required: true,
        },
      ]}
      label={intl.formatMessage({
        id: 'pages.classroomTable.student',
        defaultMessage: 'Student',
      })}
      showSearch
      initialValue={currentRow && currentRow?.student?.id}
      request={(params) =>
        classroomId
          ? fetchClassroomStudents(classroomId, params, currentRow)
          : fetchStudents(params, currentRow)
      }
      debounceTime={800}
      {...props}
    />
  );
}
