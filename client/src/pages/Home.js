import React from "react";
// import {Link} from "react-router-dom"
import bg from "../img/front.png";

const Home = () => {
    return (
        <>
            <section className="position-relative pb-5">
                <img className="d-none d-lg-block position-absolute top-0 start-0 bottom-0 w-50 h-100 img-fluid"
                    style={{ objectFit: "cover" }}
                    src={bg}
                    alt=""
                />
                <div className="position-relative">
                    <div className="conatiner">
                        <div className="row pt-5">
                            <div className="col-12 col-lg-5 ms-auto">
                                <div className="mb-5">
                                    <h2 className="display-4 fw-bold mb-4">
                                        Control and manages your expenses easily!
                                    </h2>
                                    <p className="lead text-muted  mb-4">
                                        This is a simple and efficient personal finance application that allows you to track your daily expenses and income.
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home