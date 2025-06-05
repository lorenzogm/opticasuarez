import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage, AboutPage, ServicesPage, ContactPage } from './pages'
import { Layout } from './ui/patterns'

export function App() {
  // Use basename for GitHub Pages deployment
  const basename = import.meta.env.PROD ? '/opticasuarez' : ''
  
  return (
    <Router basename={basename}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quienes-somos" element={<AboutPage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}
