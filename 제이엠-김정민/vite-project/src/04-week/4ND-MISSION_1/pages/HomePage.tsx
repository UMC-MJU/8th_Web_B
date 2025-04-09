import { Outlet } from 'react-router-dom'
import { Navbor } from '../components/Navbar'

const HomePage = () => {
    return (
        <div>
            <Navbor/>
            {/* Outlet은 자식 라우트가 렌더링되는 자리 */}
            <Outlet/> 
        </div>
    )
}

export default HomePage
