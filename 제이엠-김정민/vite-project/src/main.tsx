// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // 계속 새로고침을 하게 하는 태그 (개발 중 중복 렌더링 방지용)
  // <StrictMode>
    <App />
  // </StrictMode>,
)
