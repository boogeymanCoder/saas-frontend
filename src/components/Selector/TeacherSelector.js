import { teacher } from '@/services/teacher';
import { ProFormSelect } from '@ant-design/pro-form';
import React from 'react';
import { useIntl } from 'umi';

export const fetchTeachers = async (params, currentRow) => {
  try {
    const { data } = await teacher({ 'filter[full_name]': params.keyWords, 'page[size]': 1000 });
    console.log({ data });

    const options = data.map((value) => {
      return {
        label: `${value.first_name} ${value.middle_name} ${value.last_name}`,
        value: value.id,
      };
    });

    if (currentRow?.teacher) {
      options.push({
        label: `${currentRow.teacher.first_name} ${currentRow.teacher.middle_name} ${currentRow.teacher.last_name}`,
        value: currentRow.teacher.id,
      });
    }
    console.log({ options });
    return options;
  } catch (err) {
    console.log({ err });
  }
};

export default function TeacherSelector({ currentRow, ...props }) {
  const intl = useIntl();

  return (
    <ProFormSelect
      rules={[
        {
          required: true,
        },
      ]}
      label={intl.formatMessage({
        id: 'pages.classroomTable.teacher',
        defaultMessage: 'Teacher',
      })}
      defaultActiveFirstOption={currentRow}
      showSearch
      initialValue={currentRow && currentRow?.teacher?.id}
      request={(params) => fetchTeachers(params, currentRow)}
      debounceTime={800}
      {...props}
    />
  );
}
