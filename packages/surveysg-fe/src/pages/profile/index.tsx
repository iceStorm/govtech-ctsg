import { Button, Descriptions, Result } from 'antd';
import { Link } from 'react-router-dom';

import apiClient from '~/api';
import AppRoutes from '~/constants/AppRoutes';

export default function ProfilePage() {
  const { data: profileResponse, error } = apiClient.users.getProfile.useQuery(
    ['profile'],
    {},
    { queryKey: [], gcTime: 0 },
  );

  if (error?.status === 404) {
    return (
      <Result
        status="warning"
        title={error.body.message}
        extra={
          <Link to={AppRoutes.CreateAccount}>
            <Button type="primary" key="console">
              Create now
            </Button>
          </Link>
        }
      />
    );
  }

  const { name, contactEmail, agencyName, jobScopeDescription } = profileResponse?.body ?? {};

  return (
    <div className="flex flex-col">
      <Descriptions
        bordered
        column={{ xs: 1 }}
        items={[
          { label: <span className="font-bold">Name</span>, children: name },
          { label: <span className="font-bold">Contact email</span>, children: contactEmail },
          { label: <span className="font-bold">Agency</span>, children: agencyName },
          {
            label: <span className="font-bold">Job scope description</span>,
            children: jobScopeDescription,
          },
        ]}
      />
    </div>
  );
}
