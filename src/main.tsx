import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router'
import './index.css'
import Home from './Home.tsx'
import About from './about.tsx'
import Course from './course.tsx'
import Service from './service.tsx'
import Contact from './contacts.tsx'
import Login from './login.tsx'
import Setting from './user.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/course" element={<Course />} />
      <Route path="/service" element={<Service />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/setting" element={<Setting />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
