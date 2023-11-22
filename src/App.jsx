import { Routes, Route, Navigate, NavLink } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import AddOrEdit from './components/AddOrEdit'
import './css/App.css'
import Detail from './components/Detail'
function App() {
	return (
		<div className="app container">
			<nav className="navbar navbar-inverse navbar-fixed-top">
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
							<span className="sr-only">navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<NavLink className="navbar-brand" to={'/'}>
							学生管理系统
						</NavLink>
					</div>
					<div id="navbar" className="collapse navbar-collapse">
						<ul className="nav navbar-nav">
							<li>
								<NavLink to={'/'}>主页</NavLink>
							</li>
							<li>
								<NavLink to={'/about'}>关于我们</NavLink>
							</li>
						</ul>
						<ul className="nav navbar-nav navbar-right">
							<li>
								<NavLink to={'/add'}>添加用户</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			<div className="content">
				<Routes>
					<Route path="/home" element={<Home />}></Route>
					<Route path="/about" element={<About />}></Route>
					<Route path="/add" element={<AddOrEdit />}></Route>
					<Route path="/edit/:id" element={<AddOrEdit />}></Route>
					<Route path="/detail/:id" element={<Detail />}></Route>
					<Route path="/" element={<Navigate replace to={'/home'} />}></Route>
				</Routes>
			</div>
		</div>
	)
}

export default App
