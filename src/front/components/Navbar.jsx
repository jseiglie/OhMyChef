import { Link } from "react-router-dom";


export const Navbar = () => {

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-2 vh-10">
			<div className="container-fluid">
				<div className="container">
    				<a className="navbar-brand" href="#">
      					<img src="/docs/assets/ohmychef 312.png" alt="" width="200" height="55"/>
    				</a>

					<button className="btn d-lg-none" type="button">
						<i className="bi bi-search"></i>
					</button>
			
					<div className="collapse navbar-collapse" id="navbarContent">
						<form className="d-flex mx-auto my-2 my-lg-0">
        					<input className="form-control form-control-search" type="search" placeholder="Search..." aria-label="Search"/>		
						</form>
					</div>

					<ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
						<li className="nav-item position-relative">
							<i className="bi bi-bell fs-5"></i>
							<span className="notify-dot bg-danger rounded-circle position-absolute top-0 start-100 translate-middle p-1"></span>
						</li>
						<li className="nav-item d-flex align-items-center gap-2">
							<i className="bi bi-person-circle fs-4"></i>
							<div className="text-end">
								<p className="mb-0 name">david zapadiel</p>
								<p className="mb-0 role text-muted small">admin</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};