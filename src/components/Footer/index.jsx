import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'Submitted by Acaso, Aro, Barcos & Guinlamon ',
  });
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'API',
          title: 'API',
          href: 'https://github.com/boogeymanCoder/taskme-api',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/boogeymanCoder/saas-frontend',
          blankTarget: true,
        },
        {
          key: 'Frontend',
          title: 'Frontend',
          href: 'https://github.com/boogeymanCoder/saas-frontend',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
