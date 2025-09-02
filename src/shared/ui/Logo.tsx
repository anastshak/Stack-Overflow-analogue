import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  isDisplay?: boolean;
}

export const Logo = ({ isDisplay }: LogoProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 hover:cursor-pointer" onClick={() => navigate('/')}>
      <div className="flex items-center">
        <LeftOutlined />
        <span className="text-2xl">/</span>
        <RightOutlined />
      </div>
      {isDisplay && <h1 className="text-base font-bold font-mono">codelang</h1>}
    </div>
  );
};
