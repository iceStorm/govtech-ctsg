import { App, ConfigProvider } from 'antd';
import { PropsWithChildren } from 'react';

export default function AntDesignProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <ConfigProvider>
      <App>{children}</App>
    </ConfigProvider>
  );
}
