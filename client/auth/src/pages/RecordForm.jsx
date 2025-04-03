import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const RecordForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    category: "",
  });

  const { title, description, amount, category } = formData;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, { position: "bottom-left" });

  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-left" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/record", // Backend endpoint for transactions
        formData,
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/record/transactions");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      if (error.response) {
        handleError(error.response.data.message || "Something went wrong");
      } else if (error.request) {
        handleError("No response from server");
      } else {
        handleError("An error occurred");
      }
    }

    setFormData({
      title: "",
      description: "",
      amount: "",
      category: "",
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Record New Transaction</h2>
      <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-light">
        
        {/* Title and Amount Side by Side */}
        <div className="form-row row">
          <div className="form-group col-md-6">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              placeholder="Enter title"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              value={amount}
              placeholder="Enter amount"
              onChange={handleOnChange}
              required
            />
          </div>
        </div>

        {/* Description Field */}
        <div className="form-group mt-2">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={description}
            placeholder="Enter description"
            onChange={handleOnChange}
            required
          />
        </div>

        {/* Category Dropdown */}
        <div className="form-group mt-2">
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            id="category"
            name="category"
            value={category}
            onChange={handleOnChange}
            required
          >
            <option value="">Select Category...</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success w-100 mt-3">Add Transaction</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RecordForm;
