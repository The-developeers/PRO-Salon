import React from "react"
import { TheHeader } from "./components/TheHeader"
import { Sidebar } from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import "./index.css"

const App: React.FC = () => {
  return (
    <div className="app-container">
      <TheHeader />
      <div className="main-content">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  )
}

export default App
