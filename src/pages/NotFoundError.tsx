import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <Result
        status="404"
        title="Oops!"
        subTitle={'Page not found'}
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default PageNotFound;
