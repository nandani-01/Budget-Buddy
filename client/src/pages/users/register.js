import React, { useState, useContext, useEffect } from 'react';
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup";
import { registerUserAction } from '../../redux/slices/users/usersSlices';
import DisabledButton from '../../components/DissabledButton';


const formSchema = Yup.object({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const Register = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();


    //getdata from store
    const user = useSelector(state => state?.users);
    const { userAppErr, userServerErr, userLoading, userAuth } = user;


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            firstname: "",
            lastname: "",
        },
        onSubmit: (values) => {
            dispatch(registerUserAction(values))
        },
        validationSchema: formSchema,
    });

    useEffect(() => {
        if (userAuth) navigate("/")
    }, [userAuth])

    return (
        <section style={{ height: "100vh" }}
            className="position-relative py-5 overflow-hidden bg-warning"
        >
            <div className="d-none d-md-block position-absolute top-0 start-0 bg-dark w-75 h-100"></div>
            <div className="d-md-none position-absolute top-0 start-0 bg-primary w-100 h-100"></div>
            <div className="conatiner position-relative mx-auto">
                <div className="row align-items-center">
                    <div className="col-12 col-lg-5 mb-5">
                        <div>
                            <h2 className="display-5 fw-bold mb-4 text-white">
                                keep track of what you are spending
                            </h2>
                            <hr className="text-warning w-100" />
                        </div>
                    </div>
                    <div className="col-12 col-lg-5 ms-auto">
                        <div className="p-5 bg-light rounded text-center">
                            <h3 className="fw-bold mb-5">Create your account</h3>
                            {userAppErr || userServerErr ?
                                <div class="alert alert-danger" role="alert" >
                                    {userServerErr}{userAppErr}
                                </div> : null}
                            <form onSubmit={formik.handleSubmit}>
                                <input
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange('firstname')}
                                    onBlur={formik.handleBlur('firstname')}
                                    className="form-control mb-2" type="text" placeholder="First Name" />
                                <div className="text-danger mb-2">
                                    {formik.touched.firstname && formik.errors.firstname}
                                </div>
                                <input
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange('lastname')}
                                    onBlur={formik.handleBlur('lastname')}
                                    className="form-control mb-2" type="text" placeholder="Last Name" />
                                <div className="text-danger mb-2">
                                    {formik.touched.lastname && formik.errors.lastname}
                                </div>
                                <input
                                    value={formik.values.email}
                                    onChange={formik.handleChange('email')}
                                    onBlur={formik.handleBlur('email')}
                                    className="form-control mb-2" type="email" placeholder="Email address" />
                                <div className="text-danger mb-2">
                                    {formik.touched.email && formik.errors.email}
                                </div>
                                <input
                                    value={formik.values.password}
                                    onChange={formik.handleChange('password')}
                                    onBlur={formik.handleBlur('password')}
                                    className="form-control mb-2" type="password" placeholder="Password" />
                                <div className="text-danger mb-2">
                                    {formik.touched.password && formik.errors.password}
                                </div>

                                <div>
                                    {userLoading ? <DisabledButton /> : <button type="submit"
                                        className="btn btn-primary py-2 w-100 mb-4">
                                        Sign up
                                    </button>
                                    }
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register