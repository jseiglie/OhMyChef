import { Link } from "react-router-dom";


export const Navbar = () => {

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-2">
  			<div className="container-fluid">
				<div className="container">
    				<a className="navbar-brand" href="#">
      					<img src="/docs/assets/ohmychef 312.png" alt="" width="200" height="55"/>
    				</a>

					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          				<span className="navbar-toggler-icon"></span>
        			</button>
			
					<div className="collapse navbar-collapse" id="navbarContent">
						<form className="d-flex mx-auto my-2 my-lg-0">
        					<input className="form-control form-control-search" type="search" placeholder="Search..." aria-label="Search"/>		
						</form>
					</div>

					<div className="ms-auto mb-2 mb-lg-0 d-flex align-items-center">
        				<div className="bell-icon position-relative">
          					<i className="bi bi-bell fs-5"></i>
          					<span className="notify-dot position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle"></span>
        				</div>
        				<div className="user-info">
							<i className="bi bi-person-circle fs-4 me-2"></i>
         					<div className="text-end">
            					<p className="name mb-0">david zapadiel</p>
            					<p className="role mb-0">admin</p>
          					</div>
        				</div>
      				</div>
				</div>			
			</div>
		</nav>
	);
};