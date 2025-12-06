// public/sw.js
self.addEventListener("push", function (event) {
  if (event.data) {
    const notification = event.data.json();

    // Show the notification
    event.waitUntil(
      self.registration.showNotification(notification.title, {
        body: notification.body,
        icon: notification.icon,
        data: notification.data,
      })
    );

    // Send message to all clients (browser tabs)
    event.waitUntil(
      self.clients.matchAll().then(function (clients) {
        clients.forEach(function (client) {
          client.postMessage({
            type: "PUSH_NOTIFICATION_RECEIVED",
            notification: notification,
          });
        });
      })
    );
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  // Handle notification click
  event.waitUntil(clients.openWindow(event.notification.data?.url || "/"));
});
