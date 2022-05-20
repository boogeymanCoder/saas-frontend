import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome = () => {
  const intl = useIntl();
  return (
    <PageContainer>
      <Card
        title={intl.formatMessage({
          id: 'pages.welcome.message',
          defaultMessage: 'Welcome to Student Management System Admin',
        })}
      >
        <img width="100%" style={{ maxHeight: '40vh' }} src="/undraw_bookshelves_re_lxoy.svg" />
      </Card>
    </PageContainer>
  );
};

export default Welcome;
