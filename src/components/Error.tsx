import { Alert } from 'antd';

interface ErrorMsgProps {
  msg: string;
  errorObj: Error;
}

export const ErrorMsg = ({ msg, errorObj }: ErrorMsgProps) => {
  return (
    <Alert
      message="Error"
      description={errorObj instanceof Error ? errorObj.message : `Failed to load ${msg}`}
      type="error"
      showIcon
    />
  );
};
