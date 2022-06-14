import { createContext, useState } from 'react';

const NotificationContext = createContext({
  notification: null, //{ title, message, status}
  showNotification: function () {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  return (
    <NotificationContext.provider>
      {props.children}
    </NotificationContext.provider>
  );
}

export default NotificationContext;
