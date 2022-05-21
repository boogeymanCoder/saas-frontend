import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import {
  checkDomain,
  currentUser as queryCurrentUser,
  updateSettings,
} from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';
import { getDomain } from './services/helpers';
import { useEffect } from 'react';
const isDev = process.env.NODE_ENV === 'development';
const isCentralDomain = getDomain() === APP_HOST_NAME;
const loginPath = isCentralDomain ? '/user/register' : '/user/login';
/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      console.log({ data: msg });
      return msg;
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  }; // 如果不是登录页面，执行

  const currentUser = await fetchUserInfo();
  var settingsToSet = defaultSettings;
  try {
    console.log({ currentUser });
    if (currentUser) {
      const userSettings = JSON.parse(currentUser?.settings);
      settingsToSet = userSettings;

      console.log('settingsToSet from user:', { settingsToSet });
    }
  } catch (err) {
    console.log({ err });
  }

  if (history.location.pathname !== loginPath) {
    console.log({ history });
    // if (currentUser.settings) {
    //   const userSettings = JSON.parse(currentUser?.settings);
    //   settingsToSet = userSettings;

    //   console.log('settingsToSet from user:', { settingsToSet });
    // }

    // console.log('currentUser before initial state:', { currentUser });
    // console.log('settingsToSet before initial state:', { settingsToSet });

    console.log('has user before returning initial state:', { settingsToSet });
    const state = {
      fetchUserInfo,
      currentUser,
      settings: settingsToSet,
    };
    console.log({ state });
    return state;
  }

  console.log('no user before returning initial state:', { settingsToSet });
  return {
    fetchUserInfo,
    settings: settingsToSet,
  };
} // ProLayout 支持的api https://procomponents.ant.design/components/layout

export const layout = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          // <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          //   <LinkOutlined />
          //   <span>OpenAPI 文档</span>
          // </Link>,
          // <Link to="/~docs" key="docs">
          //   <BookOutlined />
          //   <span>业务组件文档</span>
          // </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      console.log('settings drawer:', { initialState });

      useEffect(async () => {
        try {
          const domain = getDomain();
          console.log({ domain, APP_HOST_NAME, isCentral: domain === APP_HOST_NAME });
          if (!(domain === APP_HOST_NAME)) {
            console.log('check domain');
            const domainAvailable = (await checkDomain()).success;
          }
        } catch (err) {
          console.log({ err });
          window.location.href = `${APP_URL}/register`;
        }
      });
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {/* {console.log('before drawer:', { initialState })} */}
          {!(
            props.location?.pathname?.includes('/login') ||
            props.location?.pathname?.includes('/register')
          ) && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={async (settings) => {
                // console.log('before onSettingChange:', initialState);
                setInitialState((preInitialState) => {
                  if (!isCentralDomain) {
                    console.log('user changed settings');
                    const settingsParam = { settings: JSON.stringify(settings) };
                    console.log({ settingsParam });

                    updateSettings(settingsParam);
                  }
                  return { ...preInitialState, settings };
                });
              }}
              hideCopyButton
              hideHintAlert
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
