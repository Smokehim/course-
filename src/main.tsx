import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router'
import './index.css'
import Home from './Home.tsx'
import About from './about.tsx'
import Course from './course.tsx'
import Service from './service.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/course" element={<Course />} />
      <Route path="/service" element={<Service />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
