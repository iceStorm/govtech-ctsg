import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { clsx } from 'clsx';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StringParam, useQueryParam } from 'use-query-params';

import type LoginPayload from '@/common/dtos/login-payload.dto';
import IServerError from '@/common/models/IServerError';

import apiClient from '~/api';
import AppStatic from '~/components/AppStatic';
import AppRoutes from '~/constants/AppRoutes';
import useAuthentication from '~/hooks/useAuthentication';

export default function LoginPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [originated, setOriginated] = useQueryParam('originated', StringParam);
  const { isLoggedIn, setLoginSession } = useAuthentication();

  const [form] = useForm<LoginPayload>();

  const { isPending, mutate: login } = apiClient.login.useMutation();

  const handleFormSubmit = async () => {
    try {
      const formValue = await form.validateFields();

      login(
        { body: formValue },
        {
          onSuccess(data) {
            setLoginSession(data.body.accessToken, data.body.refreshToken);
            navigate(originated ?? AppRoutes.Profile);
          },
          onError(error) {
            console.log('error:', error);

            AppStatic.notification.error({ message: (error.body as IServerError).message });
          },
        },
      );
    } catch (error) {
      console.log('form submit errors:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(AppRoutes.Home);

      AppStatic.notification.warning({ message: 'You are already logged in.' });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (state?.originated) {
      setOriginated(state.originated);
    }
  }, [setOriginated, state]);

  return (
    <div className={clsx('w-72 mx-auto', 'flex flex-col gap-10')}>
      <h1 className="font-bold text-lg">Login to your GOVAA account.</h1>

      <Form form={form} layout="vertical" disabled={isPending}>
        <FormItem<LoginPayload>
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email' }]}
        >
          <Input allowClear autoFocus autoComplete="email" />
        </FormItem>

        <FormItem<LoginPayload>
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              transform(value) {
                return value.trim();
              },
            },
          ]}
        >
          <Input.Password allowClear autoComplete="current-password" />
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full mt-5"
            onClick={handleFormSubmit}
            loading={isPending}
          >
            Login
          </Button>
        </FormItem>
      </Form>
    </div>
  );
}
