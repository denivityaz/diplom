import "./styles/main.css";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import Contacts from "./pages/Contacts";
import ScrollToTop from "./utils/scrollToTop"

import Registration from "./pages/auth/Registration"
import Login from "./pages/auth/Login";
import Profile from "./pages/auth/Profile";
import CourseEdit from "./components/admin/course_edit";

import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
		<div className="App">
			<Router>
				<ScrollToTop />
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/project/:id" element={<Project />} />
					<Route path="/contacts" element={<Contacts />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Registration />} />
					<Route 
						path="/profile" 
						element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
						} />
					<Route 
						path="/course_edit" 
						element={
						<ProtectedRoute>
							<CourseEdit />
						</ProtectedRoute>
						} />
				</Routes>
				<Footer />
			</Router>
		</div>
  );
}

export default App;
