import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CrudReactReduxApp } from './CrudReactReduxApp.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CrudReactReduxApp />
  </StrictMode>,
)
