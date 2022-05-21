import { subject } from '@/services/subject';
import { ProFormSelect } from '@ant-design/pro-form';
import React from 'react';
import { useIntl } from 'umi';

export const fetchSubjects = async (params, currentRow) => {
  try {
    const { data } = await subject({ 'filter[name]': params.keyWords, 'page[size]': 1000 });
    console.log({ data });

    const options = data.map((value) => {
      return {
        label: value.name,
        value: value.id,
      };
    });

    if (currentRow?.subject) {
      options.push({
        label: currentRow.subject.name,
        value: currentRow.subject.id,
      });
    }
    console.log({ options });
    return options;
  } catch (err) {
    console.log({ err });
  }
};

export default function SubjectSelector({ currentRow, ...props }) {
  const intl = useIntl();

  return (
    <ProFormSelect
      rules={[
        {
          required: true,
        },
      ]}
      label={intl.formatMessage({
        id: 'pages.classroomTable.subject',
        defaultMessage: 'Subject',
      })}
      defaultActiveFirstOption={currentRow}
      showSearch
      initialValue={currentRow && currentRow?.subject?.id}
      request={(params) => fetchSubjects(params, currentRow)}
      debounceTime={800}
      {...props}
    />
  );
}
