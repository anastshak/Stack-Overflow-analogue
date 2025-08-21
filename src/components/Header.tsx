import { Button } from 'antd';
import { Logo } from './Logo';

export const Header = () => {
  return (
    <header className="flex justify-between items-center bg-blue-600 px-6 py-4 text-white">
      <Logo />
      <div className="flex gap-4 items-center">
        <Button type="primary">Login</Button>
        <Button>Sign In</Button>
      </div>
    </header>
  );
};
