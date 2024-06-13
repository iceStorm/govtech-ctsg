import { App, notification as antdNotification } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import { ModalStaticFunctions } from 'antd/es/modal/confirm';
import { NotificationInstance } from 'antd/es/notification/interface';

// https://ant.design/components/app#global-scene-redux-scene
type AppStaticProps = {
  message: MessageInstance;
  notification: NotificationInstance;
  modal: Omit<ModalStaticFunctions, 'warn'>;
};

/**
 * This global variable holds static components to use every where in the app (inside and outside a component).
 */
const AppStatic: AppStaticProps = {} as never;
export default AppStatic;

/**
 * This component will initialize some static components and store in a global variable for using later.
 */
export function AppStaticInitializer() {
  const { message, modal, notification } = App.useApp();
  Object.assign(AppStatic, { message, modal, notification });

  // antdNotification.useNotification({
  //   placement: 'bottomLeft',
  //   bottom: 50,
  //   duration: 3,
  //   rtl: true,
  // });

  return null;
}
