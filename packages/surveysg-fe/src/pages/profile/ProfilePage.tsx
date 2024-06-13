import { useEffect } from 'react';

import IServerError from '@/common/models/IServerError';

import apiClient from '~/api';
import AppStatic from '~/components/AppStatic';

export default function ProfilePage() {
  const { data: profileResponse, isFetching, error } = apiClient.getProfile.useQuery(['profile']);

  useEffect(() => {
    if (error) {
      AppStatic.notification.error({ message: (error.body as IServerError).message });
    }
  }, [error]);

  if (!profileResponse && !isFetching) {
    return <div>Failed to fetch profile...</div>;
  }

  return (
    <div className="flex flex-col">
      <h1>{profileResponse?.body.name}</h1>
    </div>
  );
}
