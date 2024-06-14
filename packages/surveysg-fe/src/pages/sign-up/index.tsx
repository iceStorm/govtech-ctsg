import { Button, Form, Input, Select, Typography } from 'antd';
import Checkbox from 'antd/es/checkbox/Checkbox';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type SurveyUserEntity from '@/common/entities/SurveyUserEntity';
import IServerError from '@/common/models/IServerError';

import apiClient from '~/api';
import AppStatic from '~/components/AppStatic';
import AppRoutes from '~/constants/AppRoutes';
import useAuthentication from '~/hooks/useAuthentication';

import TermsOfUseModal from './TermsOfUseModal';

const SignUpFormItem = Form.Item<SurveyUserEntity>;

export default function SignUpPage() {
  const { currentUser } = useAuthentication();
  const navigate = useNavigate();

  const [isTermsOfUseModalOpen, setIsTermsOfUseModalOpen] = useState(false);

  useEffect(() => {
    if (currentUser.isRegistered) {
      navigate(AppRoutes.Home);

      AppStatic.notification.info({
        message: 'Your GOVAA account is already registered on SurveySG.',
      });
    }
  }, [currentUser, currentUser.isRegistered, navigate]);

  const { data: governmentAgenciesResponse, isFetching: isFetchingAgencies } =
    apiClient.getGovernmentAgencies.useQuery(['government-agencies']);

  const { isPending: isCreatingAccount, mutate: createAccount } =
    apiClient.users.createAccount.useMutation();

  const [form] = Form.useForm<SurveyUserEntity>();

  useEffect(() => {
    form.setFieldsValue({
      name: currentUser.name,
      contactEmail: currentUser.email,
      govaaEmail: currentUser.email,
    });
  }, [currentUser.email, currentUser.name, form]);

  const handleFormSubmit = async () => {
    try {
      const formValues = await form.validateFields();

      if (!formValues.checkedTermsOfUse) {
        form.setFields([{ name: 'checkedTermsOfUse', errors: ['Please agree with terms of use'] }]);
        form.validateFields();
        return;
      }

      createAccount(
        { body: formValues },
        {
          onSuccess() {
            navigate(AppRoutes.Profile);
          },
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

      <TermsOfUseModal
        isOpen={isTermsOfUseModalOpen}
        onClose={(isAccepted) => {
          setIsTermsOfUseModalOpen(false);

          form.setFieldValue('checkedTermsOfUse', isAccepted);
          form.validateFields();
        }}
      />

      <Form form={form} layout="vertical" disabled={isFetchingAgencies ?? isCreatingAccount}>
        <SignUpFormItem name="govaaEmail" hidden />

        <SignUpFormItem name="name" label="Name" rules={[{ required: true }]}>
          <Input disabled />
        </SignUpFormItem>

        <SignUpFormItem name="contactEmail" label="Contact email" rules={[{ required: true }]}>
          <Input allowClear />
        </SignUpFormItem>

        <SignUpFormItem name="agency" label="Agency" rules={[{ required: true }]}>
          <Select
            showSearch
            allowClear
            loading={isFetchingAgencies}
            placeholder="Select an agency"
            options={governmentAgenciesResponse?.body.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </SignUpFormItem>

        <SignUpFormItem
          name="jobScopeDescription"
          label="Job scope description"
          rules={[{ required: true }]}
        >
          <TextArea allowClear maxLength={275} showCount />
        </SignUpFormItem>

        <SignUpFormItem
          name="checkedTermsOfUse"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please agree with terms of use' }]}
        >
          <Checkbox onClick={() => setIsTermsOfUseModalOpen(true)}>
            I agree to <Typography.Text underline>terms of use</Typography.Text>
          </Checkbox>
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
