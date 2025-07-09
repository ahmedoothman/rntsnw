# Google Maps Integration Setup

This guide explains how to set up Google Maps in your React Native app using the `GOOGLE_MAPS_API_KEY` from your environment variables.

## Prerequisites

1. **Google Maps API Key**: You need a valid Google Maps API key from the Google Cloud Console.
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the following APIs:
     - Maps SDK for Android
     - Maps SDK for iOS
     - Places API (if you plan to use places)
   - Create credentials (API Key)
   - Restrict the API key to your app's bundle ID/package name for security

## Setup Steps

### 1. Environment Configuration

Update your `.env` file with your actual Google Maps API key:

```env
GOOGLE_MAPS_API_KEY=your_actual_google_maps_api_key_here
```

### 2. Android Configuration

The Android setup is already configured:

- **AndroidManifest.xml**: Permissions and API key reference added
- **strings.xml**: API key placeholder added

To use your actual API key, update `android/app/src/main/res/values/strings.xml`:

```xml
<string name="google_maps_api_key">your_actual_google_maps_api_key_here</string>
```

### 3. iOS Configuration

The iOS setup is already configured:

- **Info.plist**: Location permissions and API key placeholder added

To use your actual API key, update `ios/rntsnw/Info.plist`:

```xml
<key>GMSApiKey</key>
<string>your_actual_google_maps_api_key_here</string>
```

### 4. Components Available

#### MapView Component (`src/components/MapView.tsx`)

- Reusable Google Maps component
- Supports custom markers
- Configurable location and zoom level
- Tap to add markers functionality

#### MapScreen (`src/screens/MapScreen.tsx`)

- Complete screen implementation
- Integrated in bottom tab navigation
- Shows user location
- Allows adding custom markers by tapping

#### MapService (`src/services/mapService.ts`)

- Service for handling API key validation
- Environment variable management

## Usage Examples

### Basic Map

```tsx
import MapViewComponent from '@/components/MapView';

<MapViewComponent
  latitude={37.78825}
  longitude={-122.4324}
  showUserLocation={true}
/>;
```

### Map with Custom Markers

```tsx
const markers = [
  {
    id: '1',
    latitude: 37.78825,
    longitude: -122.4324,
    title: 'San Francisco',
    description: 'Beautiful city',
  },
];

<MapViewComponent
  latitude={37.78825}
  longitude={-122.4324}
  markers={markers}
  onMapPress={coordinate => console.log(coordinate)}
/>;
```

## Available Navigation

The Map screen has been added to your bottom tab navigation with a map icon. You can access it through the "Map" tab.

## Security Notes

1. **Restrict your API key**: Always restrict your Google Maps API key to your specific app bundle ID/package name
2. **Environment variables**: Never commit your actual API key to version control
3. **Billing**: Monitor your Google Cloud Console for API usage and billing

## Troubleshooting

1. **Map not loading**: Check if your API key is correctly set in both environment and platform-specific files
2. **iOS location not working**: Ensure location permissions are properly configured in Info.plist
3. **Android build issues**: Make sure Google Play Services is available on the device/emulator

## Dependencies

The following packages are required (already installed):

- `react-native-maps`: Google Maps integration
- `react-native-dotenv`: Environment variables support
