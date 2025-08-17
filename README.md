# Modern Blog Platform (Yusuff-blog)

A modern, feature-rich blog platform built with Vue 3, Bootstrap 5, and TypeScript. This platform provides a complete solution for content creators with an intuitive dashboard, analytics, and comprehensive post management.

## 🚀 Features

### For Readers
- Responsive blog layout with modern design
- Comment system on blog posts
- User profiles and avatars
- Related posts suggestions
- Easy navigation and search
- Like and share functionality

### For Content Creators
- Secure authentication system
- Comprehensive dashboard
  - Post analytics (views, likes, comments)
  - Performance trends
  - Top performing posts
- Full post management
  - Create, edit, and delete posts
  - Draft saving
  - Rich text editing
- Comment moderation
- Profile management
- Customizable settings

## 🛠️ Technical Stack

- **Frontend Framework:** Vue 3
- **Build Tool:** Vite
- **Language:** TypeScript
- **UI Framework:** Bootstrap 5
- **State Management:** Vue Store
- **Routing:** Vue Router
- **Authentication:** JWT-based auth system
- **Styling:** CSS with modern features
- **Components:** Mix of Vue and TSX components

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Git

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

## 📁 Project Structure

```
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components
│   ├── blog/            # Blog-specific components
│   ├── dashboard/       # Dashboard components
│   └── ui/             # Generic UI components
├── src/
│   ├── assets/         # Static assets
│   ├── components/     # Vue components
│   ├── composables/    # Vue composables (hooks)
│   ├── layouts/        # Layout components
│   ├── router/         # Vue router configuration
│   ├── stores/         # State management
│   └── views/          # Page components
├── styles/             # Global styles
└── public/            # Public static files
```

## 🔑 Key Components

### Dashboard Analytics (`DashboardPage.vue`)
- Real-time analytics visualization
- Period-based statistics display
- Top posts tracking
- Interactive analytics modal
- Engagement metrics (views, likes, comments)

### Blog Layout Components
- `BlogLayout.tsx`: Main blog layout structure
- `BlogHeader.tsx`: Navigation and search
- `BlogHero.tsx`: Featured content display
- `BlogPostCard.tsx`: Post preview cards
- `BlogFooter.tsx`: Footer with site links

### Dashboard Components
- `DashboardLayout.tsx`: Admin interface layout
- `DashboardNavbar.tsx`: Admin navigation
- `DashboardSidebar.tsx`: Quick access menu
- `DashboardStats.tsx`: Statistics display
- `PostsTable.tsx`: Post management interface

### Authentication
- `LoginPage.vue`: User authentication
- `RegisterPage.vue`: New user registration
- `ForgotPasswordPage.vue`: Password recovery
- Protected route implementation

### Post Management
- `CreatePostPage.vue`: New post creation
- `EditPostPage.vue`: Post editing interface
- `PostDetail.tsx`: Detailed post view
- `RelatedPosts.tsx`: Similar content suggestions

## 🎨 Styling and Theming

The platform uses Bootstrap 5 with custom theming:
- Responsive design principles
- Dark/light mode support
- Custom color schemes
- Modern UI components
- Consistent spacing and typography

## 🔐 Security Features

- JWT authentication implementation
- Protected routes configuration
- Input validation and sanitization
- API endpoint security
- Session management

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop enhancement
- Fluid typography
- Flexible layouts

## 🚀 Performance Optimizations

- Lazy loading implementation
- Component code splitting
- Image optimization
- Cache management
- Bundle size optimization

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 🤝 Acknowledgments

- Vue.js team for the excellent framework
- Bootstrap team for the UI framework
- All contributors to the project

## 📞 Contact

- Owner: Ayomidespenz
- Repository: Yusuff-blog
- Branch: main
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