# BlogCraft - Vue.js Blog Platform

A modern blogging platform built with Vue.js 3, Bootstrap 5, and AOS animations.

## Features

- ✨ Modern Vue.js 3 with Options API
- 🎨 Beautiful Bootstrap 5 styling
- 🚀 Smooth AOS animations
- 📱 Responsive design
- 🎯 Component-based architecture
- 🛣️ Vue Router for navigation
- 📦 Pinia for state management

## Tech Stack

- **Frontend Framework**: Vue.js 3 (Options API)
- **Build Tool**: Vite
- **Styling**: Bootstrap 5
- **Animations**: AOS (Animate On Scroll)
- **Icons**: Lucide Vue
- **Router**: Vue Router 4
- **State Management**: Pinia
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blog-platform-vue
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
pnpm build
```

### Preview Production Build

```bash
npm run preview
# or
pnpm preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/            # Base UI components (Button, Card, etc.)
├── views/              # Page components
│   ├── auth/          # Authentication pages
│   ├── blog/          # Blog-related pages
│   └── dashboard/     # Dashboard pages
├── router/             # Vue Router configuration
├── assets/             # Static assets
└── main.ts            # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

### Colors
The project uses Bootstrap's color system with custom CSS variables for primary colors.

### Animations
AOS animations are configured in `src/main.ts` and can be customized by modifying the AOS configuration.

### Styling
Bootstrap classes are used throughout the components. Custom styles are added via scoped CSS in each component.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 