import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
//logout from userslices
import bg from "../../img/data.jpg";


const PrivateNavbar = () => {
    const dispatch = useDispatch();

    return (
        <>
            <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
                <div class="container-fluid">

                    <Link to="/" className="navbar-brand">
                        <style>{`
                    .img-flex {
                        max-width: 10%;
                        height: auto;
                    }
                    .rounded-2 {
                        border-radius: 0.25rem;
                    }
                `}</style>
                        <i class="bi bi-currency-exchange fs-1 text-warning">
                            <img className="img-flex me-4 rounded-2"
                                src={bg}

                                alt=""></img>
                            Budget Buddy
                        </i>
                    </Link>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-log-0">
                            <li class="nav-item">
                                <Link to="/expenses" className="btn btn-outline-info me-2">Transaction Records
                                </Link>
                            </li>
                            <li class="nav-item mb-2">
                                <Link to="/dashboard" className="btn btn-outline-warning me-2">
                                    Dashboard</Link>
                            </li>

                            <li class="nav-item">
                                <Link to="/profile" className="btn btn-outline-primary me-2">Profile</Link>
                            </li>
                        </ul>
                        <form class="d-flex">
                            <Link to="/add-expense" className="btn btn-danger me-2">New Expense</Link>
                            <Link to="/add-income" className="btn btn-success me-2">New Income</Link>
                            {/* <button onClick={()=> dispatch(logout())}
                        className="btn btn-warning me-2">
                            Logout
                        </button> */}
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default PrivateNavbar;