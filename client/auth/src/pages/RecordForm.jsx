import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";

const RecordForm = () => {
  const [customTitle, setCustomTitle] = useState("");
  const { isDarkTheme } = useThemeContext();
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
    const finalTitle = title === "other" ? customTitle : title;
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/record",
        { ...formData, title: finalTitle },
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
    setCustomTitle("");
  };

  return (
    <div
      className="container mt-4"
      style={{
        backgroundColor: isDarkTheme ? "#121212" : "#ffffff",
        color: isDarkTheme ? "#ffffff" : "#000000",
        padding: "20px",
        borderRadius: "8px",
        minHeight: "100vh",
      }}
    >
      <h2 className="mb-3">Record New Transaction</h2>
      <form
        onSubmit={handleSubmit}
        className="p-3 border rounded shadow-sm"
        style={{
          backgroundColor: isDarkTheme ? "#1e1e1e" : "#f8f9fa",
          color: isDarkTheme ? "#ffffff" : "#000000",
        }}
      >
        <div className="form-row row">
          <div className="form-group col-md-6">
            <label htmlFor="title">Title</label>
            <select
              className="form-control"
              id="title"
              name="title"
              value={title}
              onChange={handleOnChange}
              required
              style={{
                backgroundColor: isDarkTheme ? "#333" : "#fff",
                color: isDarkTheme ? "#fff" : "#000",
              }}
            >
              <option value="" disabled >Select Title</option>
              <option value="education">Education</option>
              <option value="groceries">Groceries</option>
              <option value="health">Health</option>
              <option value="subscriptions">Subscriptions</option>
              <option value="takeaways">Takeaways</option>
              <option value="clothing">Clothing</option>
              <option value="travelling">Travelling</option>
              <option value="other">Other</option>
            </select>

            {title === "other" && (
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Enter custom title"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                required
                style={{
                  backgroundColor: isDarkTheme ? "#333" : "#fff",
                  color: isDarkTheme ? "#fff" : "#000",
                }}
              />
            )}
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
              style={{
                backgroundColor: isDarkTheme ? "#333" : "#fff",
                color: isDarkTheme ? "#fff" : "#000",
              }}
            />
          </div>
        </div>

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
            style={{
              backgroundColor: isDarkTheme ? "#333" : "#fff",
              color: isDarkTheme ? "#fff" : "#000",
            }}
          />
        </div>

        <div className="form-group mt-2">
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            id="category"
            name="category"
            value={category}
            onChange={handleOnChange}
            required
            style={{
              backgroundColor: isDarkTheme ? "#333" : "#fff",
              color: isDarkTheme ? "#fff" : "#000",
            }}
          >
            <option value="">Select Category...</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success w-100 mt-3">
          Add Transaction
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RecordForm;
