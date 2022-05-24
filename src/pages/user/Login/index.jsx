import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { ProFormCaptcha, ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage, SelectLang, useModel, useLocation } from 'umi';
import Footer from '@/components/Footer';
import { login, register } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import styles from './index.less';
import store from 'store';
import { getDomain } from '@/services/helpers';
import defaultSettings from '../../../../config/defaultSettings';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = () => {
  const [userLoginState, setUserLoginState] = useState({});
  const [type, setType] = useState('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();
  const location = useLocation();

  const isCentralDomain = getDomain() === APP_HOST_NAME;

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    var settingsToSet = defaultSettings;

    console.log({ userInfo });
    if (userInfo.settings) {
      const userSettings = JSON.parse(userInfo?.settings);
      settingsToSet = userSettings;

      console.log('settingsToSet from user:', { settingsToSet });
    }

    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo, settings: settingsToSet }));
    }
  };

  const handleSubmit = async (values) => {
    try {
      // 登录
      const msg = await login({ ...values, type });
      console.log({ msg });

      if (msg.success) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: 'Login Successful！',
        });
        message.success(defaultLoginSuccessMessage);

        store.set('accessToken', msg.data.token);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */

        console.log({ history, location });
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query;
        history.push(redirect || '/');
        return;
      }

      console.log(msg); // 如果失败去设置用户错误信息

      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: 'Login failed, please try again!',
      });
      message.error(defaultLoginFailureMessage);
    }
  };
  const handleRegister = async (values) => {
    try {
      // 登录
      const msg = await register({ ...values, type });
      const domain = msg.data.tenant.id;
      console.log({ msg });

      if (msg.success) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.register.success',
          defaultMessage: 'Register successful!',
        });
        message.success(defaultLoginSuccessMessage);

        store.set('accessToken', msg.data.token);
        /** 此方法会跳转到 redirect 参数所在的位置 */

        window.location.href = `${PROTOCOL}//${domain}.${APP_HOST_NAME}`;
        return;
      }

      console.log(msg); // 如果失败去设置用户错误信息

      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.register.failure',
        defaultMessage: 'Register failed, please try again!',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        {!isCentralDomain && (
          <LoginForm
            logo={<img alt="logo" src="/logo.svg" />}
            title="SAAS SMS"
            subTitle={intl.formatMessage({
              id: 'pages.layouts.userLayout.title',
            })}
            initialValues={{
              autoLogin: true,
            }}
            onFinish={async (values) => {
              await handleSubmit(values);
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.login.login',
                  defaultMessage: 'Login',
                }),
              },
            }}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane
                key="account"
                tab={intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: 'Account Login',
                })}
              />
            </Tabs>

            {status === 'error' && loginType === 'account' && (
              <LoginMessage
                content={intl.formatMessage({
                  id: 'pages.login.accountLogin.errorMessage',
                  defaultMessage: 'Incorrect username/password',
                })}
              />
            )}
            {type === 'account' && (
              <>
                <ProFormText
                  name="email"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.email',
                    defaultMessage: 'Email',
                  })}
                  rules={[
                    {
                      required: true,
                      type: 'email',
                      message: 'Please enter a valid email address.',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.password',
                    defaultMessage: 'Password',
                  })}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
              </>
            )}
          </LoginForm>
        )}
        {isCentralDomain && (
          <LoginForm
            logo={<img alt="logo" src="/logo.svg" />}
            title="Ant Design"
            subTitle={intl.formatMessage({
              id: 'pages.layouts.userLayout.title',
            })}
            initialValues={{
              autoLogin: true,
            }}
            onFinish={async (values) => {
              await handleRegister(values);
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.login.register',
                  defaultMessage: 'Register',
                }),
              },
            }}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane
                key="account"
                tab={intl.formatMessage({
                  id: 'pages.login.registerAccount',
                  defaultMessage: 'Register Account',
                })}
              />
            </Tabs>

            {status === 'error' && loginType === 'account' && (
              <LoginMessage
                content={intl.formatMessage({
                  id: 'pages.login.accountLogin.errorMessage',
                  defaultMessage: 'Incorrect username/password',
                })}
              />
            )}
            {type === 'account' && (
              <>
                <ProFormText
                  placeholder={intl.formatMessage({
                    id: 'pages.register.name',
                    defaultMessage: 'Name',
                  })}
                  name="name"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
                <ProFormText
                  placeholder={intl.formatMessage({
                    id: 'pages.register.email',
                    defaultMessage: 'Email',
                  })}
                  name="email"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  rules={[
                    {
                      required: true,
                      type: 'email',
                      message: 'Please enter a valid email address.',
                    },
                  ]}
                />
                <ProFormText.Password
                  placeholder={intl.formatMessage({
                    id: 'pages.register.password',
                    defaultMessage: 'Password',
                  })}
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
                <ProFormText.Password
                  placeholder={intl.formatMessage({
                    id: 'pages.register.passwordConfirmation',
                    defaultMessage: 'Password Confirmation',
                  })}
                  name="password_confirmation"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
                <ProFormText
                  placeholder={intl.formatMessage({
                    id: 'pages.register.domain',
                    defaultMessage: 'Domain',
                  })}
                  name="domain"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
              </>
            )}
          </LoginForm>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Login;
