import React, { useState, useEffect } from "react";

function Expense({ language }) {
  const [field, setField] = useState("");
  const [amount, setAmount] = useState("");
  const [expensesList, setExpensesList] = useState([]);

  const API_BASE = "http://localhost:3000/api/expenses";

  // 🔐 Centralized auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // FETCH expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch(API_BASE, {
          headers: getAuthHeaders(),
        });

        if (res.status === 401) {
          alert("Session expired. Please login again.");
          return;
        }

        const data = await res.json();
        if (data.success) {
          setExpensesList(data.data);
        }
      } catch (err) {
        console.error("Error fetching expenses:", err.message);
      }
    };

    fetchExpenses();
  }, []);

  // CREATE expense
  const handleCreate = async () => {
    if (!field || !amount || parseFloat(amount) <= 0) {
      alert("Please enter valid field and amount");
      return;
    }

    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          description: field,
          amount: parseFloat(amount),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setExpensesList([data.data, ...expensesList]);
        setField("");
        setAmount("");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error creating expense");
    }
  };

  // DELETE expense
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await res.json();

      if (data.success) {
        setExpensesList(expensesList.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting expense");
    }
  };

  // EDIT expense
  const handleEdit = async (id) => {
    const expense = expensesList.find((e) => e.id === id);
    if (!expense) return;

    const newField = prompt(
      translations[language].expenseField,
      expense.description
    );
    const newAmount = prompt(
      translations[language].expenseAmount,
      expense.amount
    );

    if (!newField || isNaN(parseFloat(newAmount))) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          description: newField,
          amount: parseFloat(newAmount),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setExpensesList(
          expensesList.map((e) => (e.id === id ? data.data : e))
        );
      }
    } catch (err) {
      console.error(err);
      alert("Error updating expense");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-4">
        {translations[language].expense}
      </h2>

      {/* Create Expense */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder={translations[language].expenseField}
          className="p-3 rounded-xl border border-slate-300 dark:border-slate-600 flex-1"
          value={field}
          onChange={(e) => setField(e.target.value)}
        />
        <input
          type="number"
          placeholder={translations[language].expenseAmount}
          className="p-3 rounded-xl border border-slate-300 dark:border-slate-600 w-40"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-500 transition font-bold"
        >
          {translations[language].createExpense}
        </button>
      </div>

      {/* Expenses Table */}
      <table className="w-full table-auto border-collapse border border-slate-300 dark:border-slate-600">
        <thead>
          <tr className="bg-slate-100 dark:bg-slate-700 text-left">
            <th className="p-3 border border-slate-300 dark:border-slate-600">
              {translations[language].expenseField}
            </th>
            <th className="p-3 border border-slate-300 dark:border-slate-600">
              {translations[language].expenseAmount}
            </th>
            <th className="p-3 border border-slate-300 dark:border-slate-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {expensesList.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center p-3 text-slate-500">
                {translations[language].noExpenses}
              </td>
            </tr>
          )}
          {expensesList.map((e) => (
            <tr key={e.id}>
              <td className="p-3 border">{e.description}</td>
              <td className="p-3 border">
                {Number(e.amount).toLocaleString()}
              </td>
              <td className="p-3 border flex gap-2">
                <button
                  onClick={() => handleEdit(e.id)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded"
                >
                  {translations[language].edit}
                </button>
                <button
                  onClick={() => handleDelete(e.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  {translations[language].delete}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}