# Advanced Todo List App with Theme Switcher

A sophisticated React Native Todo application with real-time backend integration using Convex, featuring light/dark theme switching and comprehensive CRUD operations.

## Features

- ✅ Real-time todo management with Convex
- 🎨 Light/Dark theme with smooth transitions
- 📱 Pixel-perfect Figma design implementation
- 🔄 Full CRUD operations (Create, Read, Update, Delete)
- 🔍 Search and filter functionality
- 🎯 Drag and sort todos
- 💾 Persistent theme preferences
- ♿ Accessibility compliant
- 📱 Responsive on all screen sizes

## Tech Stack

- **Framework**: React Native with Expo
- **Routing**: Expo Router
- **Backend**: Convex (Real-time database)
- **State Management**: React Context API
- **Styling**: Styled Components
- **UI Components**: Custom components with theme support

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android APK) or Xcode (for iOS)

## Installation

### 1. Clone the Repository

```bash
git clone 
cd todo-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Convex Setup

1. Install Convex:
```bash
npm install convex
```

2. Initialize Convex in your project:
```bash
npx convex dev
```

3. Follow the prompts to:
   - Create a new Convex project or link to existing one
   - This will create a `convex/` directory and `.env.local` file

4. Set up your Convex deployment URL:
   - Copy the deployment URL from the Convex dashboard
   - Add it to your environment variables (see below)

### 4. Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud
```

**Important**: Replace `your-convex-deployment` with your actual Convex deployment URL from the dashboard.

## Project Structure

```
todo-app/
├── app/                      # Expo Router pages
│   ├── (tabs)/              # Tab navigation
│   │   ├── index.tsx        # Home/Todo list screen
│   │   └── settings.tsx     # Settings screen
│   ├── _layout.tsx          # Root layout
│   └── +not-found.tsx       # 404 page
├── components/              # Reusable components
│   ├── TodoItem.tsx
│   ├── TodoForm.tsx
│   ├── ThemeToggle.tsx
│   └── EmptyState.tsx
├── convex/                  # Convex backend
│   ├── schema.ts           # Database schema
│   ├── todos.ts            # Todo CRUD functions
│   └── tsconfig.json
├── contexts/               # React contexts
│   └── ThemeContext.tsx   # Theme management
├── hooks/                 # Custom hooks
│   └── useTheme.ts
├── styles/                # Styled components & themes
│   ├── theme.ts
│   └── globalStyles.ts
├── types/                 # TypeScript types
│   └── index.ts
├── utils/                 # Utility functions
│   └── storage.ts
├── .env                   # Environment variables
├── app.json              # Expo configuration
├── package.json
└── README.md
```

## Running the Application

### Development Mode

Start the Expo development server:

```bash
npm start
# or
expo start
```

This will open the Expo DevTools in your browser. You can then:
- Press `a` to open in Android emulator
- Press `i` to open in iOS simulator
- Scan QR code with Expo Go app on your physical device

### Run on Specific Platform

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## Building for Production

### Android APK

1. Configure your app in `app.json`:
```json
{
  "expo": {
    "android": {
      "package": "com.yourcompany.todoapp",
      "versionCode": 1
    }
  }
}
```

2. Build APK using EAS Build:
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build APK
eas build --platform android --profile preview
```

3. Download the APK from the provided link

### Alternative: Local Build

```bash
# Generate Android build
expo build:android -t apk
```

## Convex Backend Setup Details

### Database Schema

The app uses the following Convex schema:

```typescript
// convex/schema.ts
todos: {
  title: string
  description: string
  completed: boolean
  dueDate: number (timestamp)
  createdAt: number
  updatedAt: number
  order: number
}
```

### Available Convex Functions

- `todos:list` - Get all todos
- `todos:create` - Create a new todo
- `todos:update` - Update an existing todo
- `todos:delete` - Delete a todo
- `todos:toggle` - Toggle todo completion status
- `todos:reorder` - Update todo order for drag-and-drop

## Features Implementation

### Theme Switching
- Toggle between light and dark themes
- Smooth animated transitions
- Persistent preference using AsyncStorage
- System theme detection support

### CRUD Operations
- **Create**: Add new todos with title, description, and due date
- **Read**: Real-time todo list updates via Convex subscriptions
- **Update**: Edit todo details and mark as complete
- **Delete**: Swipe-to-delete gesture support

### Additional Features
- Search todos by title/description
- Filter by completed/incomplete status
- Sort by due date, creation date, or custom order
- Drag-and-drop reordering
- Loading states and error handling
- Empty state illustrations

## Accessibility

- Proper semantic labels for screen readers
- Sufficient color contrast ratios (WCAG AA)
- Touch targets minimum 44x44 points
- Keyboard navigation support
- Voice control compatibility

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Troubleshooting

### Convex Connection Issues
- Verify your `EXPO_PUBLIC_CONVEX_URL` is correct
- Check if Convex dev server is running: `npx convex dev`
- Ensure you're authenticated: `npx convex login`

### Build Failures
- Clear cache: `expo start -c`
- Delete node_modules: `rm -rf node_modules && npm install`
- Reset Metro bundler: `watchman watch-del-all`

### Theme Not Persisting
- Check AsyncStorage permissions
- Verify storage key is consistent
- Clear app data and reinstall

## Performance Optimization

- Memoized components with React.memo
- Optimized re-renders with useMemo/useCallback
- Lazy loading for large lists
- Image optimization
- Debounced search input

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
- Create an issue on GitHub
- Contact: your-email@example.com

## Acknowledgments

- Design inspiration from Figma community
- Convex for real-time backend infrastructure
- Expo team for amazing development tools

---

**Built with ❤️ using React Native & Convex**