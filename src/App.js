import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Layout from './components/Layout/Layout';
import Home from "./pages/Home";
import Blog from './pages/Blog';
import Post from './pages/Post';
import About from "./pages/About";
import Skills from "./pages/Skills";
import Contact from "./components/Contact/Contact";
import Projects from './pages/Projects';
import ErrorPage from './pages/ErrorPage';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/UI/GlobalStyles";
import { lightTheme, darkTheme } from "./components/UI/Themes"
import Toggler from './components/UI/Toggler';

function App() {
	const [theme, setTheme] = useState('light');
	const themeToggler = () => {
		theme === 'light' ? setTheme('dark') : setTheme('light')
	};

	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
			<>
				<GlobalStyles/>
				<div className='App'>
					<Toggler theme={theme} toggleTheme={themeToggler} />
					<BrowserRouter>
					<div className="body-wrapper">
						<Layout />
							<Routes>
									<Route path='/' exact element={<Home />} />
									<Route path='/about/' exact element={<About />} />
									<Route path='/my-skills/' exact element={<Skills />} />
									<Route path='/projects/' exact element={<Projects />} />
									<Route path='/blog/' exact element={<Blog />} />
									<Route path='/blog/:slug/' exact element={<Post />} />
									<Route path='/blog/:slug/' exact element={<Post />} />
									<Route path='/*' element={<ErrorPage />} />
							</Routes>
						<Contact id= "contact" />
					</div>
					</BrowserRouter>
				</div>
			</>
		</ThemeProvider>
	);
}

export default App;