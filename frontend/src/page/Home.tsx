import Sidebar from "../components/Sidebar"
import TheHeader from "../components/TheHeader"
import Dashboard from "../components/Dashboard"

import "../style/Home.css"

const Home = () => {
  return (
    <div className="home-container">

      <Sidebar />

      <div className="home-main">
        <TheHeader />
        <Dashboard />
      </div>

    </div>
  )
}

export default Home
