import React from "react"
import Sidebar from "../components/Sidebar"
import TheHeader from "../components/TheHeader"
import '../style/Layout.css'

export default function Layout({ children }) {
	return (
		<div className="layout">
			<Sidebar/>
			<div className="main-content">
				<TheHeader/>
				<div className="page-content">{children}</div>
			</div>
		</div>
	)
}