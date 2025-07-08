# Reactotron Integration Guide

This project has been integrated with Reactotron for debugging React Native applications.

## What is Reactotron?

Reactotron is a desktop app for inspecting your React Native projects. It provides:

- State inspection and manipulation
- API request/response monitoring
- Redux action dispatching and state tracking
- Console logging with better formatting
- Performance monitoring
- AsyncStorage inspection

## Setup Instructions

### 1. Install Reactotron Desktop App

Download and install the Reactotron desktop app from:
https://github.com/infinitered/reactotron/releases

### 2. Configuration

The project is already configured with Reactotron. The configuration file is located at:
`src/config/ReactotronConfig.ts`

### 3. Running with Reactotron

#### For Simulator/Emulator:

1. Start the Reactotron desktop app
2. Run your React Native app as usual:
   ```bash
   yarn android
   # or
   yarn ios
   ```

#### For Physical Device:

1. Find your computer's IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`
2. Update the host in `src/config/ReactotronConfig.ts`:
   ```typescript
   host: 'YOUR_COMPUTER_IP', // Replace with your actual IP
   ```
3. Start Reactotron desktop app
4. Run your app on the device

### 4. Features Integrated

#### Redux Integration

- All Redux actions and state changes are automatically logged
- You can dispatch actions directly from Reactotron
- Time-travel debugging is available

#### Firebase Messaging Logging

- FCM token reception is logged
- Foreground message reception is logged
- Notification events are logged
- Navigation events from notifications are logged

#### Debug Component

A `ReactotronDebug` component is available for manual logging:

```tsx
import ReactotronDebug from '../components/ReactotronDebug';

// In your component
<ReactotronDebug
  title="User Action"
  data={{userId: 123, action: 'button_press'}}
/>;
```

### 5. Manual Logging

You can add manual logs throughout your app:

```typescript
if (__DEV__) {
  const reactotron = require('../config/ReactotronConfig').default;
  reactotron.log('Your message', {data: 'optional data object'});
}
```

### 6. Troubleshooting

#### Reactotron not connecting:

1. Ensure Reactotron desktop app is running
2. Check that the port 9090 is not blocked
3. For physical devices, verify the IP address is correct
4. Try restarting both the app and Reactotron

#### Performance:

- Reactotron only runs in development mode (**DEV**)
- It's automatically excluded from production builds
- No performance impact in release builds

### 7. Useful Reactotron Features

#### Timeline

- See all actions, logs, and state changes in chronological order
- Filter by type (Redux, API, Logs, etc.)

#### Redux

- View current state tree
- Dispatch actions manually
- Time-travel through state changes

#### AsyncStorage

- View and edit AsyncStorage values
- Clear storage

#### Networking (if added)

- Monitor API requests and responses
- Replay requests

## Next Steps

To add API monitoring, install the networking plugin:

```bash
yarn add --dev reactotron-react-native-networking
```

Then update `ReactotronConfig.ts` to include:

```typescript
import {networking} from 'reactotron-react-native'

Reactotron
  .configure({...})
  .use(networking()) // Add this line
  .connect()
```

Happy debugging! 🚀
