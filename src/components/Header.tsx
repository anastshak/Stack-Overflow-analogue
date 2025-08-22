import { Button } from 'antd';
import { Logo } from './Logo';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center bg-blue-600 px-6 py-4 text-white">
      <Logo isDisplay />
      <div className="flex gap-4 items-center">
        <Button
          type="primary"
          onClick={() => {
            navigate('/login');
          }}
        >
          Login
        </Button>
        <Button
          onClick={() => {
            navigate('/signup');
          }}
        >
          Sign Up
        </Button>
      </div>
    </header>
  );
};
