import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { clsx } from 'clsx';

import type LoginPayload from '@/common/dtos/login-payload.dto';
import { GovaaLoginAction } from '@/common/models/GovaaLoginActionQuery';

import apiClient from '~/api';

export default function LoginPage() {
  const [form] = useForm<LoginPayload>();

  const { isPending, mutate: login } = apiClient.login.useMutation();

  const handleFormSubmit = async () => {
    try {
      const formValue = await form.validateFields();

      console.log('form:', form.getFieldsValue());

      login(
        { body: formValue, query: { action: GovaaLoginAction.SURVEY_LOGIN } },
        {
          onSuccess(data) {
            //
          },
          onError(error) {
            //
          },
        },
      );
    } catch (error) {
      console.log('form submit errors:', error);
    }
  };

  return (
    <div className={clsx('w-72 mx-auto', 'flex flex-col gap-10')}>
      <h1 className="font-bold">Login to SurveySG using your GOVAA account.</h1>

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
