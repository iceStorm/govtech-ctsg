import { Button, Result } from 'antd';

export default function UnauthenticatedPage() {
  return (
    <Result
      title="Your operation has been executed"
      extra={
        <Button type="primary" key="console">
          Go Console
        </Button>
      }
    />
  );
}
