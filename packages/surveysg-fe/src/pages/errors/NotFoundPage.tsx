import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

import AppRoutes from '~/constants/AppRoutes';

export default function NotFoundPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to={AppRoutes.Home}>
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
}
