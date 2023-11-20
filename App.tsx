import { StyleSheet, SafeAreaView } from 'react-native';

import Routes from './src/routes/Routes';

import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
}

async function scheduleMorningNotification() {
  const now = new Date();
  const scheduledTime = new Date();

  scheduledTime.setHours(9, 0, 0, 0);

  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Reminder',
      body: "Don't forget to check out the new artworks!",
    },
    trigger: scheduledTime,
  });
}

async function scheduleTwoMinutesNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Notification',
      body: 'Come to see the new artworks!',
    },
    trigger: { seconds: 30 },
  });
}

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
    scheduleMorningNotification();
    scheduleTwoMinutesNotification();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Routes />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
});
