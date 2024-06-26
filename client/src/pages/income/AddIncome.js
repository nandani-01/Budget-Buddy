import React from "react";
import { useFormik } from "formik"
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";


const formSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    Amount: Yup.number().required("Amount is required"),
});


const AddIncome = () => {

    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            title: "",
            decription: "",
            Amount: "",
        },
        onSubmit: (values) => {
            // dispatch(createExpAction(values));
        },
        validationSchema: formSchema,
    });
    return (
        <>
            <section className="py-5 bg-success vh-100">
                <div className="container text-center">
                    <a className="d-inline-block mb-5">
                        {/* <img
                    className="img-fluid"
                    src={ }
                    alt="SVGeXPENSES"
                    width="200"
                    /> */}
                    </a>
                    <div className="row mb-4">
                        <div className="col-12 col-md-8 col-lg-5 mx-auto">
                            <div className="p-4 shadow-sm rounded bg-white">
                                {/* {userAppErr || userServerErr? 
                            <div class ="alert alert-danger" role="alert" >
                                {userServerErr}{userAppErr}
                                </div> :null} */}
                                <form onSubmit={formik.handleSubmit}>
                                    <span className="text-muted">Income</span>
                                    <h2 className="mb-4 fw-light"> Record New Income</h2>

                                    <div className="mb-3 input-group">
                                        <input
                                            value={formik.values.title}
                                            onChange={formik.handleChange('title')}
                                            onBlur={formik.handleBlur('title')}
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter Title" />
                                    </div>
                                    <div className="text-danger mb-2">
                                        {formik.touched.title && formik.errors.title}
                                    </div>
                                    <div className="mb-3 input-group">
                                        <input
                                            value={formik.values.description}
                                            onChange={formik.handleChange('description')}
                                            onBlur={formik.handleBlur('description')}
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter Description" />
                                    </div>
                                    <div className="text-danger mb-2">
                                        {formik.touched.description && formik.errors.description}
                                    </div>
                                    <div className="mb-3 input-group">
                                        <input
                                            value={formik.values.amount}
                                            onChange={formik.handleChange('amount')}
                                            onBlur={formik.handleBlur('amount')}
                                            className="form-control"
                                            type="number"
                                            placeholder="Enter Amount" />
                                    </div>
                                    <div className="text-danger mb-2">
                                        {formik.touched.amount && formik.errors.amount}
                                    </div>
                                    <button type="submit" className="btn btn-success mb-4 w-100">
                                        Record Income
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};

export default AddIncome;
