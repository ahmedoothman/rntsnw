# Font Configuration Guide

This project supports both Arabic and English fonts with automatic language detection and proper RTL/LTR text direction.

## Current Setup

### System Fonts (Currently Configured)

- **English**: Uses system fonts (Roboto on Android, San Francisco on iOS)
- **Arabic**: Uses system fonts with good Arabic support (GeezaPro on iOS, NotoSansArabic on Android)

## Adding Custom Fonts

If you want to use custom fonts instead of system fonts, follow these steps:

### 1. Download Font Files

Download your preferred Arabic and English font files in TTF or OTF format. Some good options:

**Arabic Fonts:**

- Noto Sans Arabic (free, excellent support)
- Cairo (modern, readable)
- Amiri (traditional, elegant)
- IBM Plex Sans Arabic

**English Fonts:**

- Roboto (Android default)
- Open Sans
- Lato
- Inter

### 2. Add Font Files to Project

Place your font files in these directories:

```
src/assets/fonts/
├── english/
│   ├── YourFont-Regular.ttf
│   ├── YourFont-Medium.ttf
│   ├── YourFont-Bold.ttf
│   └── YourFont-Light.ttf
└── arabic/
    ├── YourArabicFont-Regular.ttf
    ├── YourArabicFont-Medium.ttf
    ├── YourArabicFont-Bold.ttf
    └── YourArabicFont-Light.ttf
```

### 3. Android Configuration

Copy font files to Android assets:

```
android/app/src/main/assets/fonts/
├── YourFont-Regular.ttf
├── YourFont-Medium.ttf
├── YourFont-Bold.ttf
├── YourFont-Light.ttf
├── YourArabicFont-Regular.ttf
├── YourArabicFont-Medium.ttf
├── YourArabicFont-Bold.ttf
└── YourArabicFont-Light.ttf
```

### 4. iOS Configuration

1. Add font files to `ios/YourAppName/` directory
2. Update `ios/YourAppName/Info.plist`:

```xml
<key>UIAppFonts</key>
<array>
    <string>YourFont-Regular.ttf</string>
    <string>YourFont-Medium.ttf</string>
    <string>YourFont-Bold.ttf</string>
    <string>YourFont-Light.ttf</string>
    <string>YourArabicFont-Regular.ttf</string>
    <string>YourArabicFont-Medium.ttf</string>
    <string>YourArabicFont-Bold.ttf</string>
    <string>YourArabicFont-Light.ttf</string>
</array>
```

### 5. Update Font Configuration

Edit `src/theme/fonts.ts` and update the FONT_FAMILIES object:

```typescript
export const FONT_FAMILIES = {
  en: {
    regular: Platform.select({
      ios: 'YourFont-Regular',
      android: 'YourFont-Regular',
    }),
    medium: Platform.select({
      ios: 'YourFont-Medium',
      android: 'YourFont-Medium',
    }),
    // ... etc
  },
  ar: {
    regular: Platform.select({
      ios: 'YourArabicFont-Regular',
      android: 'YourArabicFont-Regular',
    }),
    // ... etc
  },
};
```

## Usage

### Using the Custom Text Component

```tsx
import Text from '../components/Text';

// Basic usage - automatically selects correct font for current language
<Text>Hello / مرحبا</Text>

// With weight and size
<Text weight="bold" size="lg">Important Text</Text>

// Combining with Tailwind classes
<Text weight="medium" className="text-blue-500">Styled Text</Text>
```

### Using the Font Hook

```tsx
import {useFont} from '../hooks/useFont';

const MyComponent = () => {
  const {font, getStyle, getTailwindFont, isArabic} = useFont();

  return <RNText style={getStyle('bold', 'xl')}>Custom styled text</RNText>;
};
```

### Using with Tailwind CSS

The font families are configured in `tailwind.config.js`:

```tsx
<Text className="font-ar-bold text-xl"> // Arabic bold
<Text className="font-en-medium text-lg"> // English medium
```

## Features

- ✅ Automatic font selection based on current language
- ✅ RTL/LTR support
- ✅ TypeScript support with proper typing
- ✅ Tailwind CSS integration
- ✅ Consistent sizing and line heights
- ✅ React hooks for advanced usage
- ✅ Fallback to system fonts

## Testing

After adding custom fonts:

1. Clean and rebuild the project:

```bash
npx react-native run-android --reset-cache
# or
npx react-native run-ios --reset-cache
```

2. Test both languages in the app
3. Verify RTL layout with Arabic text
4. Check that fallbacks work if fonts fail to load

## Troubleshooting

### Fonts not appearing on Android

- Ensure font files are in `android/app/src/main/assets/fonts/`
- Font names are case-sensitive
- Clean and rebuild the project

### Fonts not appearing on iOS

- Check `Info.plist` has correct font file names
- Ensure fonts are added to Xcode project
- Use exact PostScript name for iOS font family

### Arabic text not displaying correctly

- Ensure your font supports Arabic script
- Check that RTL layout is working
- Verify text rendering with Arabic diacritics if needed
