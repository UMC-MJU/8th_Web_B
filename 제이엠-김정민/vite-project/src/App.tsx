import React from 'react'
import './App.css'
// Chapter01 에서 import
// import Mission1 from './02-week/2ND-MISSION/Misson1'

// Chapter02 에서 import
// import DarkMode from './02-week/2ND-MISSION2/DarkMode'

//Chapter03 에서 import
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import HomePage from './03-week/실습/pages/home'
// import Movies from './03-week/실습/pages/movies'
// import NotFound from './03-week/실습/pages/not-found'
// import RootLayout from './03-week/실습/layout/root-layout'
//useEffcet 실습
// import UseEffectPage from './03-week/실습/pages/useEffectPage'
import Parent from './03-week/실습/pages/UseEffectCountPage'
//Chapter03 Mission import
// import MoviePage from './03-week/3ND-MISSION/pages/MoviePage'

// function App(){
//   return(
//     <>
//       <MoviePage/>
//     </>
//   )
// }


//Chapter03-router 연결
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <RootLayout/>,
//     //없는 경로에 들어온 처리를 해줌.
//     errorElement: <NotFound/>,
//     // 1. Navbar 밑에 path에 해당하는 element를 보여주고 싶으면 아래와 같이 children을 활용용
//     children: [
//       {
//         // 2.index: true는 위의 path: '/' 즉, 홈경로를 의미
//         index: true,
//         element: <HomePage/>
//       },
//       {
//         // /:를 활용해서 동적으로 바뀌는 부분의 이름을 정의의
//         path:'movies?/:movieId',
//         element: <Movies/>
//       }
//     ]
//   },

// ])
// Chapter03 router연결
// function App() {
//   console.log(import.meta.env.VITE_TMDB_KEY)
//   return <RouterProvider router={router}/>
// }

const App = () => {
  return (
    <>
      {/* <Mission1/> 2주차 미션1 */}
      {/* <DarkMode/>2주차 미션2 */}
      {/* <UseEffectPage/>useEffect 실습 */}
      <Parent/> useEffect에서 cleanUp 함수실습
      {/* <ThemeSwitcher/> */}
    </>
  )
}

export default App
