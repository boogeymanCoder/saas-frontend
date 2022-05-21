import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage, useParams } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import { addSubject, subject, removeSubject, updateSubject } from '@/services/subject';
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const handleAdd = async (fields) => {
  const hide = message.loading('Loading');
  console.log({ fields });

  try {
    await addSubject({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    console.log({ error });
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};
/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */

const handleUpdate = async (id, fields) => {
  const hide = message.loading('Configuring');

  try {
    await updateSubject(id, fields);
    hide();
    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};
/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('Loading');
  if (!selectedRows) return true;

  try {
    // await removeRule({
    //   key: selectedRows.map((row) => row.key),
    // });
    selectedRows.map(
      async (student) =>
        await removeSubject(student.id).then((res) => {
          message.success('Deleted successfully and will refresh soon');
        }),
    );

    hide();
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList = () => {
  console.log({ window });
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */

  const pageParams = useParams();
  console.log({ pageParams });
  const [createModalVisible, handleModalVisible] = useState(false);
  const createFormRef = useRef();
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */

  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const intl = useIntl();
  const columns = [
    {
      title: <FormattedMessage id="pages.studentTable.id" defaultMessage="ID" />,
      dataIndex: 'id',
      tip: 'The ID is the unique key',
      fixed: 'left',
      width: 50,
      search: false,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.subjectTable.name" defaultMessage="Name" />,
      dataIndex: 'name',
      key: 'filter[name]',
      defaultSortOrder: 'ascend',
      sorter: true,
      width: 100,
    },
    {
      title: <FormattedMessage id="pages.subjectTable.code" defaultMessage="Code" />,
      dataIndex: 'code',
      key: 'filter[code]',
      sorter: true,
      width: 100,
    },
    {
      title: <FormattedMessage id="pages.subjectTable.classrooms" defaultMessage="Classrooms" />,
      dataIndex: 'classrooms_count',
      render: (dom, entity) => <a href={`/classrooms/subject/${entity.id}`}>{dom}</a>,
      width: 100,
      fixed: 'right',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.table.actions" defaultMessage="Actions" />,
      dataIndex: 'option',
      valueType: 'option',
      width: 50,
      fixed: 'right',
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.table.edit" defaultMessage="Edit" />
        </a>,

        <Popconfirm
          key="delete"
          title={intl.formatMessage({
            id: 'pages.table.areYouSure',
            defaultMessage: 'Are you sure?',
          })}
          okText={intl.formatMessage({
            id: 'pages.table.yes',
            defaultMessage: 'Yes',
          })}
          cancelText={intl.formatMessage({
            id: 'pages.table.no',
            defaultMessage: 'No',
          })}
          onConfirm={async () => {
            await handleRemove([record]);
            actionRef.current?.reloadAndRest?.();
          }}
        >
          <a href="#">
            <FormattedMessage id="pages.table.delete" defaultMessage="Delete" />
          </a>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        scroll={{
          x: 300,
        }}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={(params, sort, filter) => {
          let sorter = Object.entries(sort);
          console.log({ params, sort, sorter, filter });
          const parameters = {
            ...params,
            'page[number]': params.current,
            'page[size]': params.pageSize,
            'filter[id]': pageParams.id,
            sort:
              sorter.length === 0
                ? undefined
                : sorter[0][1] === 'ascend'
                ? sorter[0][0]
                : `-${sorter[0][0]}`,
          };
          return subject(parameters);
        }}
        columns={columns}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="items" />
            </div>
          }
        >
          <Popconfirm
            key="delete"
            title={intl.formatMessage({
              id: 'pages.table.areYouSure',
              defaultMessage: 'Are you sure?',
            })}
            okText={intl.formatMessage({
              id: 'pages.table.yes',
              defaultMessage: 'Yes',
            })}
            cancelText={intl.formatMessage({
              id: 'pages.table.no',
              defaultMessage: 'No',
            })}
            onConfirm={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <Button type="primary" danger>
              <FormattedMessage id="pages.table.delete" defaultMessage="Delete" />
            </Button>
          </Popconfirm>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.studentTable.newStudent',
          defaultMessage: 'New Student',
        })}
        width="400px"
        formRef={createFormRef}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value);

          if (success) {
            createFormRef.current.resetFields();
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          label={intl.formatMessage({
            id: 'pages.subjectTable.name',
            defaultMessage: 'Name',
          })}
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          label={intl.formatMessage({
            id: 'pages.subjectTable.code',
            defaultMessage: 'Code',
          })}
          name="code"
        />
      </ModalForm>

      {currentRow && updateModalVisible && (
        <ModalForm
          title={intl.formatMessage({
            id: 'pages.studentTable.editStudent',
            defaultMessage: 'Edit Student',
          })}
          width="400px"
          visible={updateModalVisible}
          onVisibleChange={handleUpdateModalVisible}
          onFinish={async (value) => {
            const success = await handleUpdate(currentRow.id, value);

            if (success) {
              handleUpdateModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        >
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            label={intl.formatMessage({
              id: 'pages.subjectTable.name',
              defaultMessage: 'Name',
            })}
            name="name"
            initialValue={currentRow && currentRow.name}
          />
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            label={intl.formatMessage({
              id: 'pages.subjectTable.code',
              defaultMessage: 'Code',
            })}
            name="code"
            initialValue={currentRow && currentRow.code}
          />
        </ModalForm>
      )}

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {console.log({ currentRow })}
        {currentRow && (
          <ProDescriptions
            column={1}
            title={`${currentRow?.first_name} ${currentRow?.middle_name} ${currentRow?.last_name}`}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
