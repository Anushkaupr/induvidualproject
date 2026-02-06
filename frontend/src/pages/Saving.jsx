import React, { useState, useEffect } from "react";
// optional if you keep translations

export default function Saving({ language = "en" }) {
  const [field, setField] = useState("");
  const [amount, setAmount] = useState("");
  const [savingsList, setSavingsList] = useState([]);

  // Fetch savings from backend on component load
  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/savings");
        const data = await res.json();
        if (data.success) {
          setSavingsList(data.data);
        }
      } catch (err) {
        console.error("Error fetching savings:", err);
      }
    };

    fetchSavings();
  }, []);

  // Create new saving
  const handleCreate = async () => {
    if (!field || !amount || parseFloat(amount) <= 0) {
      alert("Please enter valid field and amount");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/savings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: field, amount: parseFloat(amount) }),
      });

      const data = await res.json();
      if (data.success) {
        setSavingsList([data.data, ...savingsList]);
        setField("");
        setAmount("");
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    }
  };

  // Delete saving
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/savings/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setSavingsList(savingsList.filter((s) => s.id !== id));
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting saving");
    }
  };

  // Edit saving
  const handleEdit = async (id) => {
    const saving = savingsList.find((s) => s.id === id);
    if (!saving) return;

    const newField = prompt("Edit Description/Title", saving.description);
    const newAmount = prompt("Edit Amount", saving.amount);

    if (newField && newAmount && !isNaN(parseFloat(newAmount))) {
      try {
        const res = await fetch(`http://localhost:3000/api/savings/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: newField, amount: parseFloat(newAmount) }),
        });

        const data = await res.json();
        if (data.success) {
          setSavingsList(
            savingsList.map((s) => (s.id === id ? data.data : s))
          );
        } else {
          alert("Error: " + data.message);
        }
      } catch (err) {
        console.error(err);
        alert("Error updating saving");
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-4">{translations[language].savings}</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder={translations[language].savingField}
          className="p-3 rounded-xl border border-slate-300 dark:border-slate-600 flex-1"
          value={field}
          onChange={(e) => setField(e.target.value)}
        />
        <input
          type="number"
          placeholder={translations[language].savingAmount}
          className="p-3 rounded-xl border border-slate-300 dark:border-slate-600 w-40"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-500 transition font-bold"
        >
          {translations[language].create}
        </button>
      </div>

      <table className="w-full table-auto border-collapse border border-slate-300 dark:border-slate-600">
        <thead>
          <tr className="bg-slate-100 dark:bg-slate-700 text-left">
            <th className="p-3 border border-slate-300 dark:border-slate-600">{translations[language].savingField}</th>
            <th className="p-3 border border-slate-300 dark:border-slate-600">{translations[language].savingAmount}</th>
            <th className="p-3 border border-slate-300 dark:border-slate-600">{translations[language].actions}</th>
          </tr>
        </thead>
        <tbody>
          {savingsList.length > 0 ? (
            savingsList.map((s) => (
              <tr key={s.id} className="even:bg-slate-50 dark:even:bg-slate-700">
                <td className="p-3 border border-slate-300 dark:border-slate-600">{s.description}</td>

                <td className="p-3 border border-slate-300 dark:border-slate-600">{s.amount.toLocaleString()}</td>
                <td className="p-3 border border-slate-300 dark:border-slate-600 flex gap-2">
                  <button
                    onClick={() => handleEdit(s.id)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-300 transition"
                  >
                    {translations[language].edit}
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 transition"
                  >
                    {translations[language].delete}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-3 text-slate-500 dark:text-slate-400">
                No savings created yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
