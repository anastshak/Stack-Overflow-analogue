import { Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';

const menuItemsConfig = [
  { key: 'home', label: 'Home', icon: <HomeOutlined />, address: '/' },
  { key: 'account', label: 'My Account', icon: <UserOutlined />, address: '/account', authOnly: true },
  { key: 'post', label: 'Post Snippet', icon: <FileTextOutlined />, address: '/post', authOnly: true },
  { key: 'snippets', label: 'My Snippets', icon: <FileTextOutlined />, address: '/mysnippets', authOnly: true },
  { key: 'questions', label: 'Questions', icon: <QuestionCircleOutlined />, address: '/questions' },
  { key: 'users', label: 'Users', icon: <TeamOutlined />, address: '/users' },
];

export const Sidebar = () => {
  const { isAuthenticated, user } = useAuthStore();

  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('sidebar-collapsed', JSON.stringify(next));
      return next;
    });
  };

  const getSelectedKey = () => {
    const match = menuItemsConfig.find((page) => location.pathname === page.address);
    return match ? match.key : '';
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    const item = menuItemsConfig.find((page) => page.key === key);
    if (item?.address) {
      navigate(item.address);
    }
  };

  return (
    <aside className={`bg-blue-700 text-white transition-all ${collapsed ? 'w-20' : 'w-64'}`}>
      {!isAuthenticated && (
        <div
          className={`flex ${collapsed ? 'justify-center' : 'justify-end'} items-center px-4 py-3 bg-blue-800 border-b border-blue-600`}
        >
          <button onClick={toggleCollapsed} className="text-white cursor-pointer">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        </div>
      )}

      {isAuthenticated && (
        <div
          className={`px-5 py-4 bg-blue-800 border-b border-blue-600 flex ${collapsed ? 'justify-center' : 'justify-between'}`}
        >
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 bg-blue-700 rounded-full flex items-center justify-center 
                    border-2 border-blue-500 shadow-sm"
              >
                <UserOutlined className="text-base" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm truncate">{user?.username}</h3>
                <p className="text-blue-300 text-xs">{user?.role}</p>
              </div>
            </div>
          )}

          <button onClick={toggleCollapsed} className="text-white cursor-pointer">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        </div>
      )}

      <Menu
        className="bg-blue-700 custom-menu"
        mode="inline"
        theme="dark"
        defaultSelectedKeys={['home']}
        selectedKeys={[getSelectedKey()]}
        onClick={handleMenuClick}
        inlineCollapsed={collapsed}
        items={menuItemsConfig.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: item.label,
          disabled: item.authOnly && !isAuthenticated,
        }))}
      />
    </aside>
  );
};
