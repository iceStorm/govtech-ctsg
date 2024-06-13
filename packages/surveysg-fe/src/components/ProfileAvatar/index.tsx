import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { ReactElement, ReactNode, cloneElement } from 'react';
import { Link } from 'react-router-dom';

import AppRoutes from '~/constants/AppRoutes';
import useAuthentication from '~/hooks/useAuthentication';

export default function ProfileAvatar() {
  const { currentUser, logOut } = useAuthentication();

  const userNameLetters = currentUser?.name
    ?.split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('');

  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: (
        <Link to={AppRoutes.Profile} className="w-[200px]">
          Profile
        </Link>
      ),
    },
    { type: 'divider' },
    { key: '2', label: 'Log out', icon: <LogoutOutlined />, danger: true, onClick: logOut },
  ];

  const renderItem = (node: ReactNode) => (
    <div className="min-w-[200px]">{cloneElement(node as ReactElement, {})}</div>
  );

  return (
    <Dropdown placement="bottomCenter" menu={{ items }} dropdownRender={renderItem} arrow={{}}>
      <Avatar style={{ backgroundColor: '#87d068' }}>{userNameLetters}</Avatar>
    </Dropdown>
  );
}
