import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, FileTextOutlined, QuestionCircleOutlined, TeamOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Sidebar = () => {
  const { isAuthenticated, user } = useAuthStore();

  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = (() => {
    if (location.pathname === '/') return 'home';
    // if (location.pathname.startsWith('/snippets')) return 'snippets';
    // if (location.pathname.startsWith('/account')) return 'account';
    // if (location.pathname.startsWith('/post')) return 'post';
    if (location.pathname === '/questions') return 'questions';
    if (location.pathname === '/users') return 'users';
    return '';
  })();

  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'home':
        navigate('/');
        break;
      // case 'account':
      //   navigate('/account');
      //   break;
      // case 'post':
      //   navigate('/post');
      //   break;
      // case 'snippets':
      //   navigate('/snippets');
      //   break;
      case 'questions':
        navigate('/questions');
        break;
      case 'users':
        navigate('/users');
        break;
    }
  };

  return (
    <aside className="w-64 bg-blue-700 text-white">
      {isAuthenticated && (
        <div className="px-5 py-4 bg-blue-800 border-b border-blue-600">
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
        </div>
      )}

      <Menu
        className="bg-blue-700 custom-menu"
        mode="inline"
        theme="dark"
        defaultSelectedKeys={['home']}
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
        items={[
          { key: 'home', icon: <HomeOutlined />, label: 'Home' },
          { key: 'account', icon: <UserOutlined />, label: 'My Account', disabled: !isAuthenticated },
          { key: 'post', icon: <FileTextOutlined />, label: 'Post Snippet', disabled: !isAuthenticated },
          { key: 'snippets', icon: <FileTextOutlined />, label: 'My Snippets', disabled: !isAuthenticated },
          { key: 'questions', icon: <QuestionCircleOutlined />, label: 'Questions' },
          { key: 'users', icon: <TeamOutlined />, label: 'Users' },
        ]}
      />
    </aside>
  );
};
