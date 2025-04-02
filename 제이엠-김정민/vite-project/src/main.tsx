import { createRoot } from "react-dom/client";
//2주차 TodoList에서 사용한 css파일
// import './02-week/index.css' 
// import App from './App.tsx'
// import Mission1 from "./2ND-MISSION/Misson1.tsx";
import App from "./App.tsx";

createRoot(document.getElementById('root')!).render(
  <>
  <App/>
  </>
)

/* ===================================================================================================================*/
//실습할때 사용한 main.tsx
// // import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// // import App from './App'  -> 첫 컴포넌트 만들기기
// // import App2 from './App2' //useState 첫 실습
// // import App3 from './Chapter02/App3' //useState 상태 변경경
// // import Pratice from './Chapter02/pratice'
// import UseContext from './Chapter02/UseContext'
// //가장 상위의 부모요소에 Provider을 씌워주면 됨.
// import {CounterProvider } from './context/CounterProvider'


// createRoot(document.getElementById('root')!).render(
//   // 계속 새로고침을 하게 하는 태그 (개발 중 중복 렌더링 방지용)
//   // <StrictMode>
//   <CounterProvider>
//       <UseContext />
//   </CounterProvider>
//   // </StrictMode>,
// )
