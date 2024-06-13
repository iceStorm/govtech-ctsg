import { Modal } from 'antd';

type TermsOfUseModalProps = {
  isOpen: boolean;
  onClose: (accepted: boolean) => void;
};

type TermItem = {
  title: string;
  content: string;
};

const termItems: TermItem[] = [
  {
    title: 'Eligibility',
    content:
      'You must be at least 18 years of age to use this website. By using this website, you warrant that you are at least 18 years old and have the capacity to enter into a binding agreement.',
  },
  {
    title: 'Survey Participation',
    content:
      'Participation in surveys is voluntary. You may cease participation at any time. By participating in a survey, you agree to provide accurate and truthful responses.',
  },
  {
    title: 'Content Use',
    content:
      'The content of the pages of this website is for your general information and use only. It is subject to change without notice. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.',
  },
  {
    title: 'Privacy',
    content:
      'Your privacy is important to us. Please review our Privacy Policy to understand our practices regarding the collection, use, and protection of your personal information.',
  },
  {
    title: 'Intellectual Property',
    content:
      'All trademarks, logos, and service marks displayed on this website are the property of their respective owners. You are not permitted to use these without the prior written consent of [Website Name] or the third party that owns them.',
  },
  {
    title: 'Limitation of Liability',
    content:
      '[Website Name] will not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or the inability to use the website or for the cost of procurement of substitute goods and services, or resulting from any goods or services purchased or obtained or transactions entered into through the website.',
  },
  {
    title: 'Modifications to Terms',
    content:
      '[Website Name] reserves the right to change these terms of use at any time. Your continued use of the website following any changes indicates your acceptance of the new terms.',
  },
  {
    title: 'Governing Law',
    content:
      'These terms of use are governed by and construed in accordance with the laws of [Jurisdiction], and any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts of [Jurisdiction]. If you do not agree with any part of these terms and conditions, please do not use our website.',
  },
];

export default function TermsOfUseModal(props: TermsOfUseModalProps) {
  const { isOpen, onClose } = props;

  return (
    <Modal
      width={1000}
      title={<span className="text-lg font-bold">Terms of Use</span>}
      okText="Agree"
      cancelText="Disagree"
      open={isOpen}
      maskClosable={false}
      closable={false}
      onCancel={() => onClose(false)}
      onOk={() => onClose(true)}
    >
      <p className="mb-3">
        By accessing and using this survey website, you agree to comply with and be bound by the
        following terms and conditions of use, which together with our privacy policy govern
        [Website Name]&apos;s relationship with you in relation to this website. The term
        &apos;you&apos; refers to the user or viewer of our website. The use of this website is
        subject to the following terms:
      </p>

      <ol className="flex flex-col gap-3">
        {termItems.map((item, index) => (
          <li key={Math.random()}>
            <em className="font-bold">
              {index + 1}. {item.title}:
            </em>{' '}
            {item.content}
          </li>
        ))}
      </ol>
    </Modal>
  );
}
