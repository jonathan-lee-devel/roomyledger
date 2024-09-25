export const notificationsMessagePatterns = {
  getAllNotificationsForUser: {cmd: 'get-notifications-for-user'},
  acknowledgeAllNotificationsForUser: {
    cmd: 'acknowledge-all-notifications-for-user',
  },
  deleteAllNotificationsForUser: {cmd: 'delete-all-notifications-for-user'},
  getNotificationById: {cmd: 'get-notification-by-id'},
  acknowledgeNotificationById: {cmd: 'acknowledge-notification-by-id'},
  deleteNotificationById: {cmd: 'delete-notification-by-id'},
} as const;
