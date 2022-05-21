import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, message, Skeleton } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useModel } from 'umi';
import { updateUser } from '@/services/ant-design-pro/api';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome = () => {
  const { initialState, loading, refresh, setInitialState } = useModel('@@initialState');
  console.log({ initialState, loading, refresh, setInitialState });

  const { currentUser } = initialState;
  const intl = useIntl();

  const handleUpdate = async (values) => {
    const hide = message.loading('Loading');

    try {
      await updateUser(values);
      message.success('Updated successfully');
      hide();
    } catch (error) {
      console.log({ error });
      hide();
      message.error('Updating failed, please try again!');
      return false;
    }
  };

  return (
    <PageContainer>
      <Card
        title={intl.formatMessage({
          id: 'pages.welcome.message',
          defaultMessage: 'Welcome to Student Management System Admin',
        })}
      >
        {/* <img width="100%" style={{ maxHeight: '40vh' }} src="/undraw_bookshelves_re_lxoy.svg" /> */}
        {!currentUser && <Skeleton />}
        {currentUser && (
          <ProForm onFinish={handleUpdate}>
            <ProFormText
              width="lg"
              label={intl.formatMessage({ id: 'pages.tenant.name', defaultMessage: 'Name' })}
              name="name"
              initialValue={currentUser.name}
            />
            <ProFormText
              width="lg"
              label={intl.formatMessage({ id: 'pages.tenant.email', defaultMessage: 'Email' })}
              name="email"
              initialValue={currentUser.email}
            />

            <ProFormText.Password
              width="lg"
              label={intl.formatMessage({
                id: 'pages.tenant.oldPassword',
                defaultMessage: 'Old Password',
              })}
              name="password"
            />

            <ProForm.Group>
              <ProFormText.Password
                width="md"
                label={intl.formatMessage({
                  id: 'pages.tenant.newPassword',
                  defaultMessage: 'New Password',
                })}
                name="new_password"
              />
              <ProFormText.Password
                width="md"
                label={intl.formatMessage({
                  id: 'pages.tenant.newPasswordConfirmation',
                  defaultMessage: 'New Password Confirmation',
                })}
                name="new_password_confirmation"
              />
            </ProForm.Group>
          </ProForm>
        )}
      </Card>
    </PageContainer>
  );
};

export default Welcome;
