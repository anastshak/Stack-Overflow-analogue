import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export const Logo = () => {
  return (
    <div className="flex items-center hover:cursor-default">
      <LeftOutlined />
      <span className="text-2xl">/</span>
      <RightOutlined />
    </div>
  );
};
