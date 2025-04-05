import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const TransactionList = () => {
  const navigate = useNavigate();
  const { isDarkTheme } = useThemeContext();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/record/transactions", { withCredentials: true });

        const sortedTransactions = response.data.transactions.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setTransactions(sortedTransactions);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("Error fetching transactions");

        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;

    try {
      await axios.delete(`http://localhost:4000/record/transaction/${id}`, { withCredentials: true });
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction.");
    }
  };

  const groupByMonth = (transactions) => {
    return transactions.reduce((groups, transaction) => {
      const monthYear = new Date(transaction.createdAt).toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      });

      if (!groups[monthYear]) {
        groups[monthYear] = { transactions: [], income: 0, expense: 0 };
      }
      groups[monthYear].transactions.push(transaction);

      if (transaction.category === "income") {
        groups[monthYear].income += transaction.amount;
      } else if (transaction.category === "expense") {
        groups[monthYear].expense += transaction.amount;
      }

      return groups;
    }, {});
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Transaction History", 14, 10);
    let startY = 20;
    const groupedTransactions = groupByMonth(transactions);

    Object.entries(groupedTransactions).forEach(([monthYear, data]) => {
      doc.text(`${monthYear} - Balance: $${(data.income - data.expense).toFixed(2)}`, 14, startY);
      startY += 5;

      autoTable(doc, {
        startY,
        head: [["Title", "Description", "Amount", "Date", "Category"]],
        body: data.transactions.map((transaction) => [
          transaction.title,
          transaction.description,
          `$${transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
          new Date(transaction.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          transaction.category,
        ]),
      });

      startY = doc.lastAutoTable.finalY + 10;
    });

    doc.save("transaction_history.pdf");
  };

  const groupedTransactions = groupByMonth(transactions);

  const totalIncome = transactions
    .filter((t) => t.category === "income")
    .reduce((acc, t) => acc + t.amount, 0)
    .toLocaleString("en-US", { minimumFractionDigits: 2 });

  const totalExpense = transactions
    .filter((t) => t.category === "expense")
    .reduce((acc, t) => acc + t.amount, 0)
    .toLocaleString("en-US", { minimumFractionDigits: 2 });

  return (
    <div
      style={{
        backgroundColor: isDarkTheme ? "#121212" : "#fff",
        color: isDarkTheme ? "#f8f9fa" : "#000",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="container-fluid p-3">
        <h2 className="fw-bold">Transactions</h2>
        <p className="text-secondary">Welcome to your transactions</p>

        <div className="d-flex justify-content-between border-bottom pb-3">
          <div className="text-success fw-bold">
            ⬇️ Income <span className="ms-2">${totalIncome}</span>
          </div>
          <div>
            <button className="btn btn-primary btn-sm ms-3" onClick={() => navigate("/record")}>
              Add Transaction
            </button>
            <button className="btn btn-success btn-sm ms-3" onClick={downloadPDF}>
              📄 Download PDF
            </button>
          </div>
          <div className="text-danger fw-bold">
            ⬆️ Expense <span className="ms-2">${totalExpense}</span>
          </div>
        </div>

        <div className="mt-4">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-danger">{error}</div>
          ) : transactions.length === 0 ? (
            <div className="text-center text-secondary">No transactions available.</div>
          ) : (
            Object.entries(groupedTransactions).map(([monthYear, data]) => (
              <div key={monthYear} className="mt-4">
                {/* Month & Balance */}
                <div className="d-flex justify-content-between align-items-center bg-secondary text-white p-2 rounded">
                  <h5 className="fw-bold m-0">{monthYear}</h5>
                  <h6 className={`fw-bold m-0 ${data.income - data.expense >= 0 ? "text-light" : "text-warning"}`}>
                    Balance: ${(data.income - data.expense).toFixed(2)}
                  </h6>
                </div>

                <table className={`table ${isDarkTheme ? "table-dark" : "table-light"} table-striped`}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.transactions.map((transaction) => (
                      <tr key={transaction._id}>
                        <td>{transaction.title}</td>
                        <td>{transaction.description}</td>
                        <td>${transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                        <td>
                          {new Date(transaction.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </td>
                        <td>{transaction.category}</td>
                        <td>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(transaction._id)}>
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
