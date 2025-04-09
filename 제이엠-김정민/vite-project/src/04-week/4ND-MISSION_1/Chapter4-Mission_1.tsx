import HomePage from './pages/HomePage'
import MoviePage from './pages/MoviePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'
import { MovieDetailPage } from './pages/MovieDetailPage'

//BrowserRouter v5
//createBrowserRouter v6

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: 'movies/:category',
                element: <MoviePage/>,
            },
            // {
            //     path: 'movie/:movieId',
            //     element: <MovieDetailPage/>,
            // }
        ],
    },
    {
        path: 'movie/:movieId',
        element: <MovieDetailPage/>,
    }
])

// movies/upcoming
// movies/popular
// movies/now_playing
// movies/top_rated
// movies/category/{movie_id}

function Chapter4_M1() {
    return <RouterProvider router={router} />
    //router을 쓰기 전
    // return (
    //     <>
    //         <MoviePage />
    //     </>
    // )
}

export default Chapter4_M1