import { Notifications, Permissions } from 'expo';
import { getQuizStatus } from "../api/quizStatusApi";

function createNotification() {
    return {
        title: 'Time to study!',
        body: "👋 Don't forget to study today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    };
}

function showNotification() {
    Notifications.cancelAllScheduledNotificationsAsync();

    const notificationTime = new Date();

    notificationTime.setSeconds(notificationTime.getSeconds() + 1);

    Notifications.scheduleLocalNotificationAsync(createNotification(), {
        time: notificationTime
    });
}

function showNotificationIfRequired() {
    getQuizStatus()
        .then(status => {
            if (status) {
                return;
            }

            showNotification();
        });
}

export function setLocalNotification() {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
        .then(({status}) => {
            if (status === 'denied') {
                return;
            }

            if (status === 'granted') {
                showNotificationIfRequired();

                return;
            }

            Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({status}) => {
                    if (status !== 'granted') {
                        return;
                    }

                    showNotificationIfRequired();
                });

        });
}