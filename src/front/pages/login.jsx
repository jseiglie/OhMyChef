export const Login = () => {

    return (
        <>
            

            <div className="login-container shadow">
                <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="Chef Logo" className="logo-img" />
                
                <div className="logo-title">OhMyChef<span style="color: #ff5722;">!</span></div>

                <form>
                    <div className="mb-3 text-start">
                        <label for="username" className="form-label">Username</label>
                        <input type="text" id="username" className="form-control" placeholder="Enter your username" />
                        <small className="text-muted">Your unique username</small>
                    </div>

                    <div className="mb-3 text-start">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" id="password" className="form-control" placeholder="Enter your password" />
                        <small className="text-muted">Your secure password</small>
                    </div>

                    <button type="submit" className="btn login-btn w-100">Login</button>
                </form>

                <div className="forgot-password">Forgot Password?</div>
            </div>
        </>
    )
}