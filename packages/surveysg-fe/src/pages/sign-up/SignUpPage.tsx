import { Button, Form, Input, Select } from 'antd';
import Checkbox from 'antd/es/checkbox/Checkbox';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useMemo } from 'react';

import type SurveyUserEntity from '@/common/entities/SurveyUserEntity';
import IServerError from '@/common/models/IServerError';

import apiClient from '~/api';
import AppStatic from '~/components/AppStatic';
import useAuthentication from '~/hooks/useAuthentication';

const SignUpFormItem = Form.Item<SurveyUserEntity>;

export default function SignUpPage() {
  const { currentUser } = useAuthentication();

  const { data: governmentAgenciesResponse, isFetching: isFetchingAgencies } =
    apiClient.getGovernmentAgencies.useQuery(['government-agencies']);

  const { isPending: isCreatingAccount, mutate: createAccount } =
    apiClient.createAccount.useMutation();

  const governmentAgencies = useMemo(
    () => (governmentAgenciesResponse?.body ?? []).map((item) => item.name),
    [governmentAgenciesResponse?.body],
  );

  const [form] = Form.useForm<SurveyUserEntity>();

  useEffect(() => {
    form.setFieldsValue({ name: currentUser.name, email: currentUser.email });
  }, [currentUser.email, currentUser.name, form]);

  const handleFormSubmit = async () => {
    try {
      const formValues = await form.validateFields();

      createAccount(
        { body: formValues },
        {
          onError(error) {
            AppStatic.notification.error({ message: (error.body as IServerError).message });
          },
        },
      );
    } catch (error) {
      console.log('form errors:', error);
    }
  };

  return (
    <div className="flex flex-col gap-10 w-72 mx-auto">
      <h1 className="font-bold text-lg">Create SurveySG account.</h1>

      <Form form={form} layout="vertical" disabled={isFetchingAgencies ?? isCreatingAccount}>
        <SignUpFormItem name="name" label="Name" rules={[{ required: true }]}>
          <Input disabled />
        </SignUpFormItem>

        <SignUpFormItem name="email" label="Contact email" rules={[{ required: true }]}>
          <Input allowClear />
        </SignUpFormItem>

        <SignUpFormItem name="agencyName" label="Agency" rules={[{ required: true }]}>
          <Select
            showSearch
            allowClear
            loading={isFetchingAgencies}
            placeholder="Select an agency"
            options={governmentAgencies.map((item) => ({ label: item, value: item }))}
          />
        </SignUpFormItem>

        <SignUpFormItem
          name="jobScopeDescription"
          label="Job scope description"
          rules={[{ required: true }]}
        >
          <TextArea allowClear />
        </SignUpFormItem>

        <SignUpFormItem
          name="checkedTermsOfUse"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please confirm this checkbox' }]}
        >
          <Checkbox>I agree to terms of use</Checkbox>
        </SignUpFormItem>

        <SignUpFormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full mt-5"
            loading={isCreatingAccount}
            onClick={handleFormSubmit}
          >
            Create Account
          </Button>
        </SignUpFormItem>
      </Form>
    </div>
  );
}
