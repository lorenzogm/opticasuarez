# Óptica Suárez - Website

Modern React website for Óptica Suárez, a leading optical shop in Jaén, Spain, specializing in visual health services since 1940.

## 🏥 About Óptica Suárez

Óptica Suárez has been caring for visual health in Jaén for over 80 years. We offer comprehensive eye care services including:

- Visual examinations
- Visual therapy
- Contactology
- Pediatric vision
- Myopia control
- Sports vision

## 🚀 Technologies

- **React** 19.1.0
- **React Router** v7.6.2
- **TypeScript** 5.8.3
- **Vite** 6.3.5
- **Tailwind CSS** 4.1.8

## 📂 Project Structure

```
src/
├── components/           # Reusable components (deprecated)
├── pages/               # Page components
│   ├── HomePage.tsx     # Main homepage with all sections
│   ├── AboutPage.tsx    # About us page
│   ├── ServicesPage.tsx # Services overview
│   └── ContactPage.tsx  # Contact information
├── ui/
│   ├── patterns/        # Layout components
│   │   └── Layout.tsx   # Main layout wrapper
│   └── sections/        # Homepage sections
│       ├── Header.tsx           # Navigation header
│       ├── Hero.tsx             # Hero section with background image
│       ├── BlueBanner.tsx       # Blue banner "Desde 1940..."
│       ├── Services.tsx         # Service cards grid
│       ├── VideoSection.tsx     # Company presentation video
│       ├── SocialMediaSection.tsx # Instagram/Facebook cards
│       ├── CallToActionSection.tsx # Blue CTA section
│       ├── CollaboratorsSection.tsx # Partner logos
│       ├── NewsSection.tsx      # News section
│       ├── LocationsMap.tsx     # Both locations with contact info
│       └── Footer.tsx           # Footer with all links and info
└── App.tsx              # Main app with routing
```

## 🎨 Design Features

### Homepage Sections (in order):
1. **Header** - Navigation with logo and contact
2. **Hero** - "TU ÓPTICA EN JAÉN" with background image
3. **Blue Banner** - "DESDE 1940 CUIDANDO TU VISIÓN"
4. **Services** - 5-column grid with service images
5. **Video Section** - Company presentation video
6. **Social Media** - Instagram and Facebook cards
7. **Call to Action** - Blue section with company description
8. **Collaborators** - Partner company logos
9. **News** - News section with right-aligned content
10. **Locations** - Two location cards with detailed contact info
11. **Footer** - Complete contact information and links

### Design System:
- **Primary Color**: Blue (#072D84, bg-blue-800)
- **Typography**: Delius serif font for headings, Inter for body text
- **Layout**: Responsive design with mobile-first approach
- **Images**: High-quality placeholder images for all sections

## 🏢 Locations

### Bulevar Location
- **Address**: C. de Canarias, 6, 23009 Jaén
- **Phone**: 953-093-062
- **Email**: bulevar@opticasuarezjaen.es
- **Hours**: Mon-Fri 9:30-13:30 & 17:00-20:30, Sat 10:00-13:00

### Centro Location
- **Address**: P.º de la Estación, 12, 23003 Jaén
- **Phone**: 953-223-180
- **Email**: centro@opticasuarezjaen.es
- **Hours**: Mon-Fri 9:30-13:30 & 17:00-20:30, Sat 10:00-13:00

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd opticasuarez

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🎯 Features

### Implemented:
- ✅ Complete homepage with all sections
- ✅ Responsive design for mobile/tablet/desktop
- ✅ React Router v7 navigation
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ SEO-optimized structure
- ✅ Accessibility considerations
- ✅ Clean, semantic HTML
- ✅ Fast loading with Vite

### Coding Standards:
- ✅ Named exports for components
- ✅ Regular functions (no arrow functions for components)
- ✅ No prop destructuring in function parameters
- ✅ Tailwind CSS only (no CSS modules)
- ✅ TypeScript strict mode

## 🚀 Deployment

The project is ready for deployment to any static hosting service:

1. **Build the project**: `npm run build`
2. **Deploy the `dist` folder** to your hosting service
3. **Configure routing** for SPA (redirect all routes to index.html)

### Recommended Hosting:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 📱 Social Media

- **Instagram**: @opticasuarezjaen
- **Facebook**: @opticasuarezjaen
- **YouTube**: @opticasuarezjaen
- **WhatsApp**: +34 953 093 062

## 📧 Contact

- **Email**: bulevar@opticasuarezjaen.es
- **Phone**: 953-093-062 (Bulevar) | 953-223-180 (Centro)
- **Website**: https://opticasuarezjaen.com

---

*Desarrollado con ❤️ para cuidar tu visión*
