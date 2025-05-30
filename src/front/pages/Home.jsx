import logo from '../assets/img/logo.svg'
import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])


	return (


		<div className="container my-5">
			<div className="row justify-content-center">
				<div className="col-md-6 col-lg-4 p-0 border rounded shadow text-center">
					<div className="col-sm  fs-5 mb-4 px-3 py-2 text-white bg-orange text-start">Login Amin</div>
					<img
						src={logo}
						alt="Chef Logo"
						className="mg-fluid mt-2 mb-1"

					/>


					<form className='m-4'>
						<div className="mb-3 text-start">
							<label htmlFor="username" className="form-label">
								Username
							</label>
							<input
								type="text"
								id="username"
								className="form-control"
								placeholder="Enter your username"
							/>
							<small className="text-muted">Your unique username</small>
						</div>

						<div className="mb-3 text-start">
							<label htmlFor="password" className="form-label">
								Password
							</label>
							<input
								type="password"
								id="password"
								className="form-control"
								placeholder="Enter your password"
							/>
							<small className="text-muted">Your secure password</small>
						</div>

						<button type="submit" className="btn bg-orange text-white w-100">
							Login
						</button>
						<div className="mt-2 mb-5 text-muted">Forgot Password?</div>
					</form>


				</div>
			</div>
		</div>


	)
}