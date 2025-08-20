import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, FileTextOutlined, QuestionCircleOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-blue-700 text-white">
      <Menu
        className="h-full bg-blue-700 custom-menu"
        mode="inline"
        theme="dark"
        defaultSelectedKeys={['home']}
        items={[
          { key: 'home', icon: <HomeOutlined />, label: 'Home', onClick: () => navigate('/') },
          { key: 'account', icon: <UserOutlined />, label: 'My Account', disabled: true },
          { key: 'post', icon: <FileTextOutlined />, label: 'Post Snippet', disabled: true },
          { key: 'snippets', icon: <FileTextOutlined />, label: 'My Snippets', disabled: true },
          { key: 'questions', icon: <QuestionCircleOutlined />, label: 'Questions' },
          { key: 'users', icon: <TeamOutlined />, label: 'Users' },
        ]}
      />
    </aside>
  );
};
