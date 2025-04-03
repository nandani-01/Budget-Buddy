import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const TransactionList = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);  // State to hold fetched transactions
  const [loading, setLoading] = useState(true);  // State for loading indicator
  const [error, setError] = useState(null);  // State for error handling

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;

    try {
      await axios.delete(`http://localhost:4000/record/transaction/${id}`, { withCredentials: true });
      setTransactions(transactions.filter((t) => t._id !== id));  // Remove from state
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction.");
    }
  };

  useEffect(() => {

    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/record/transactions", { withCredentials: true });
        setTransactions(response.data.transactions);  // Update state with fetched transactions
        setLoading(false);
      } catch (err) {
        setError("Error fetching transactions");  // Handle errors
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Calculate Income, Expense, and Total Balance
  const totalIncome = transactions
    .filter(t => t.category === 'income')
    .reduce((acc, t) => acc + t.amount, 0)
    .toFixed(2);

  const totalExpense = transactions
    .filter(t => t.category === 'expense')
    .reduce((acc, t) => acc + t.amount, 0)
    .toFixed(2);

  const totalBalance = (totalIncome - totalExpense).toFixed(2);


  return (
    <div className="min-vh-100 w-100 bg-light text-dark">
      <div className="container-fluid p-3">
        {/* Header */}
        <h2 className="fw-bold">Transactions</h2>
        <p className="text-secondary">Welcome to your transactions</p>

        {/* Summary */}
        <div className="d-flex justify-content-between border-bottom pb-3">
          <div className="text-success fw-bold">
            ⬇️ Income <span className="ms-2">${totalIncome}</span>
          </div>
          <div>
            <button className="btn btn-primary btn-sm ms-3" onClick={() => navigate("/record")}>
              Add Transaction
            </button>

          </div>
          <div className="text-danger fw-bold">
            ⬆️ Expense <span className="ms-2">${totalExpense}</span>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="mt-4">
          {loading ? (
            <div>Loading...</div>  // Show loading state while fetching
          ) : error ? (
            <div className="text-danger">{error}</div>  // Display error message if something went wrong
          ) : transactions.length === 0 ? (
            <div className="text-center text-secondary">No transactions available.</div>  // No data case
          ) : (
            <table className="table table-light table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td>{transaction.title}</td>
                    <td>{transaction.description}</td>
                    <td>${transaction.amount.toFixed(2)}</td>
                    <td>
                      {transaction.createdAt
                        ? new Date(transaction.createdAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                        : "N/A"}
                    </td>

                    <td>{transaction.category === "income" ? "+" : "-"}</td>
                    <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(transaction._id)}>
                      🗑️ Delete
                    </button>
                    {/* <button className="btn btn-warning btn-sm ms-2" onClick={() => handleUpdate(transaction)}>
                      ✏️ Edit
                    </button> */}
                  </td>
                  </tr>
                ))}
                {/* Total Balance Row */}
                <tr className="fw-bold">
                  {/* <td colSpan="3"></td>  */}
                  <td className="text-end">Total Balance:</td>
                  <td className={totalBalance >= 0 ? "text-success" : "text-danger"}>
                    ${totalBalance}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
