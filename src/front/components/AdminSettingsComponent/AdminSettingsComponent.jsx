import AdminSettingsExpensePestania from "./AdminSettingsExpensePestania";
import AdminSettingsRestaurantePestania from "./AdminSettingsRestaurantePestania";
import AdminSettingsNotificationsPestania from "./AdminSettingsNotificationsPestania";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";


const AdminSettingsComponent = () => {
    const location = useLocation();
    return (
        <div className="dashboard-container px-0 py-3 pt-4 row">
            <h1 className="dashboard-title ">Settings</h1>
            <p class="dashboard-welcome mb-2">Configura tu Restaurante</p>

            <div className="col-12 col-sm-12 col-md-11 col-lg-10 col-xl-9 col-xxl-8 mt-4">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname.endsWith("restaurant") ? "active" : ""}`} to="restaurant">
                            Restaurante
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname.endsWith("expense") ? "active" : ""}`} to="expense">
                            Expense
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname.endsWith("notifications") ? "active" : ""}`} to="notifications">
                            Notifications
                        </Link>
                    </li>
                </ul>


                <div className="card p-4">
                    <Routes>
                        <Route path="restaurant" element={<AdminSettingsRestaurantePestania />} />
                        <Route path="expense" element={<AdminSettingsExpensePestania />} />
                        <Route path="notifications" element={<AdminSettingsNotificationsPestania />} />
                        <Route path="/" element={<Navigate to="restaurant" replace />} />
                    </Routes>
                </div>

            </div>
        </div>
    )

}

export default AdminSettingsComponent;