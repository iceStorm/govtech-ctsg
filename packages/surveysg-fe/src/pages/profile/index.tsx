import { Button, Descriptions, Result } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import apiClient from '~/api';
import AppRoutes from '~/constants/AppRoutes';
import useAuthentication from '~/hooks/useAuthentication';

export default function ProfilePage() {
  const { setRegistrationStatus } = useAuthentication();

  const {
    data: profileResponse,
    error,
    isFetching,
  } = apiClient.users.getProfile.useQuery(['profile'], {}, { queryKey: [], gcTime: 0 });

  useEffect(() => {
    if (!isFetching) {
      setRegistrationStatus(!!profileResponse?.body);
    }
  }, [isFetching, profileResponse?.body, setRegistrationStatus]);

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

  const { name, contactEmail, agency, jobScopeDescription } = profileResponse?.body ?? {};

  return (
    <div className="flex flex-col">
      <Descriptions
        bordered
        column={{ xs: 1 }}
        items={[
          { label: <span className="font-bold">Name</span>, children: name },
          { label: <span className="font-bold">Contact email</span>, children: contactEmail },
          { label: <span className="font-bold">Agency</span>, children: agency?.name },
          {
            label: <span className="font-bold">Job scope description</span>,
            children: jobScopeDescription,
          },
        ]}
      />
    </div>
  );
}
