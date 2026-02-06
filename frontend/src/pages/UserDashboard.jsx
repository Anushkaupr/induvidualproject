
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
// Translation dictionary
const translations = {
  english: {
    dashboard: "Dashboard",
    savings: "Savings",
    expense: "Expense",
    settings: "Settings",
    logout: "Logout",
    totalBalance: "Total Available Balance",
    quickUpdate: "Quick Update",
    amountPlaceholder: "Amount (e.g. 50)",
    income: "Income (+)",
    expenseType: "Expense (-)",
    updateBalance: "Update Balance",
    moneyFlow: "Money Flow Analysis",
    salary: "Salary",
    primarySource: "Primary Source",
    dividends: "Dividends",
    passive: "Passive",
    housing: "Housing",
    fixedExpense: "Fixed Expense",
    lifestyle: "Lifestyle",
    variable: "Variable",
    selectLanguage: "Select Language:",
    currentLanguage: "Current Language",
    createIncome: "Add Income",
incomeField: "Income Source",
incomeAmount: "Amount",
noIncome: "No income added yet",

    createSaving: "Create Saving",
    savingField: "Saving Field",
    savingAmount: "Amount",
    edit: "Edit",
    delete: "Delete",
    noSavings: "No savings created yet",
      createExpense: "Add Expense",
      expenses: "Expenses",
  expenseField: "Expense Field",
  expenseAmount: "Amount",
  actions: "Actions",
  create: "Create",
  noExpenses: "No expenses  yet", 
    selectTheme: "Select Theme:",
    light: "Light",
    dark: "Dark",
  },
  nepali: {
    dashboard: "ड्यासबोर्ड",
    savings: "बचत",
    expense: "खर्च",
    settings: "सेटिङ्स",
    logout: "लगआउट",
    totalBalance: "कुल उपलब्ध ब्यालेन्स",
    quickUpdate: "छिटो अपडेट",
    amountPlaceholder: "रकम (जस्तै ५०)",
    income: "आय (+)",
    expenseType: "खर्च (-)",
    updateBalance: "ब्यालेन्स अपडेट गर्नुहोस्",
    moneyFlow: "पैसाको प्रवाह विश्लेषण",
    salary: "तलब",
    primarySource: "मुख्य स्रोत",
    dividends: "डिभिडेन्ड्स",
    passive: "निष्क्रिय",
    housing: "आवास",
    fixedExpense: "स्थिर खर्च",
    lifestyle: "जीवनशैली",
    variable: "परिवर्तनीय",
    selectLanguage: "भाषा चयन गर्नुहोस्:",
    currentLanguage: "वर्तमान भाषा",
    createIncome: "आय थप्नुहोस्",
incomeField: "आयको स्रोत",
incomeAmount: "रकम",
noIncome: "अहिलेसम्म कुनै आय छैन",

    createSaving: "बचत सिर्जना गर्नुहोस्",
    savingField: "बचतको विषय",
    savingAmount: "रकम",
    edit: "संपादन गर्नुहोस्",
    delete: "मेटाउनुहोस्",
    noSavings: "अहिलेसम्म कुनै बचत छैन",
    createExpense: "खर्च थप्नुहोस्",
     expenses: "खर्चहरू",
  expenseField: "खर्चको शीर्षक",
  expenseAmount: "रकम",
  actions: "कार्यहरू",
  create: "सिर्जना गर्नुहोस्",
  noExpenses: "अहिलेसम्म कुनै खर्च छैन",

    selectTheme: "थिम चयन गर्नुहोस्:",
    light: "हल्का",
    dark: "गाढा",
  },
};

// Settings component
function Settings({ language, setLanguage, theme, setTheme }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">
        {translations[language].settings}
      </h2>

      {/* Language */}
      <div className="mb-6">
        <p className="text-slate-700 dark:text-slate-200 font-medium mb-2">
          {translations[language].selectLanguage}
        </p>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-xl border font-medium transition ${
              language === "english"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-indigo-50"
            }`}
            onClick={() => setLanguage("english")}
          >
            English
          </button>
          <button
            className={`px-4 py-2 rounded-xl border font-medium transition ${
              language === "nepali"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-indigo-50"
            }`}
            onClick={() => setLanguage("nepali")}
          >
            नेपाली
          </button>
        </div>
        <p className="text-slate-500 dark:text-slate-400 mt-4">
          {translations[language].currentLanguage}:{" "}
          <span className="font-bold">{language === "english" ? "English" : "Nepali"}</span>
        </p>
      </div>

      {/* Theme */}
      <div>
        <p className="text-slate-700 dark:text-slate-200 font-medium mb-2">
          {translations[language].selectTheme}
        </p>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-xl border font-medium transition ${
              theme === "light"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-indigo-50"
            }`}
            onClick={() => setTheme("light")}
          >
            {translations[language].light}
          </button>
          <button
            className={`px-4 py-2 rounded-xl border font-medium transition ${
              theme === "dark"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-indigo-50"
            }`}
            onClick={() => setTheme("dark")}
          >
            {translations[language].dark}
          </button>
        </div>
      </div>
    </div>
  );
}

function Saving({ language }) {
  const [field, setField] = useState("");
  const [amount, setAmount] = useState("");
  const [savingsList, setSavingsList] = useState([]);

  const API_BASE = "http://localhost:3000/api/savings";

  // 🔐 Centralized auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // FETCH savings
  useEffect(() => {
    const fetchSavings = async () => {
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
          setSavingsList(data.data);
        }
      } catch (err) {
        console.error("Error fetching savings:", err.message);
      }
    };

    fetchSavings();
  }, []);

  // CREATE saving
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
        setSavingsList([data.data, ...savingsList]);
        setField("");
        setAmount("");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error creating saving");
    }
  };

  // DELETE saving
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this saving?")) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await res.json();

      if (data.success) {
        setSavingsList(savingsList.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting saving");
    }
  };

  // EDIT saving
  const handleEdit = async (id) => {
    const saving = savingsList.find((s) => s.id === id);
    if (!saving) return;

    const newField = prompt(
      translations[language].savingField,
      saving.description
    );
    const newAmount = prompt(
      translations[language].savingAmount,
      saving.amount
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
        setSavingsList(
          savingsList.map((s) => (s.id === id ? data.data : s))
        );
      }
    } catch (err) {
      console.error(err);
      alert("Error updating saving");
    }
  };


  return (
    <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-4">
        {translations[language].savings}
      </h2>

      {/* Create Saving */}
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
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-500 transition font-bold"
        >
          {translations[language].createSaving}
        </button>
      </div>

      {/* Savings Table */}
      <table className="w-full table-auto border-collapse border border-slate-300 dark:border-slate-600">
        <thead>
          <tr className="bg-slate-100 dark:bg-slate-700 text-left">
            <th className="p-3 border border-slate-300 dark:border-slate-600">
              {translations[language].savingField}
            </th>
            <th className="p-3 border border-slate-300 dark:border-slate-600">
              {translations[language].savingAmount}
            </th>
            <th className="p-3 border border-slate-300 dark:border-slate-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {savingsList.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center p-3 text-slate-500">
                {translations[language].noSavings}
              </td>
            </tr>
          )}
          {savingsList.map((s) => (
            <tr key={s.id}>
              <td className="p-3 border">{s.description}</td>
              <td className="p-3 border">
                {Number(s.amount).toLocaleString()}
              </td>
              <td className="p-3 border flex gap-2">
                <button
                  onClick={() => handleEdit(s.id)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded"
                >
                  {translations[language].edit}
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
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


// Main Dashboard
export default function UserDashboard() {
  
  const [currentBalance, setCurrentBalance] = useState(12450.8);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [activePage, setActivePage] = useState("dashboard");
  const [language, setLanguage] = useState("english");
  const [theme, setTheme] = useState("light");
  

  const user = { name: "John Doe", initials: "JD", email: "john@example.com" };
   const navigate = useNavigate();

  // 🔴 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully");
    navigate("/login");
  };
  
  
  

  const updateFinance = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return alert("Please enter a valid amount");
    const newBalance = type === "income" ? currentBalance + amt : currentBalance - amt;
    setCurrentBalance(newBalance);
    setAmount("");
  };
  

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className={`flex min-h-screen font-sans ${theme === "light" ? "bg-slate-50 text-slate-900" : "bg-slate-900 text-slate-100"}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2 mb-8">
            <i className="fas fa-wallet"></i> Moneymate
          </h1>
          <nav className="space-y-4">
            <button
              onClick={() => setActivePage("dashboard")}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-700 transition font-medium"
            >
              <i className="fas fa-home"></i> {translations[language].dashboard}
            </button>
            <button
              onClick={() => setActivePage("savings")}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-700 transition font-medium"
            >
              <i className="fas fa-piggy-bank"></i> {translations[language].savings}
            </button>
            <button
              onClick={() => setActivePage("expense")}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-700 transition font-medium"
            >
              <i className="fas fa-money-bill-wave"></i> {translations[language].expense}
            </button>
            <button
              onClick={() => setActivePage("settings")}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-700 transition font-medium"
            >
              <i className="fas fa-cog"></i> {translations[language].settings}
            </button>
          </nav>
        </div>
         <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold capitalize">{activePage}</h2>
          </div>
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-700 rounded-full flex items-center justify-center text-indigo-700 dark:text-white font-bold">
              {user.initials}
            </div>
          </div>
        </div>

        {/* Dashboard content inserted here */}
        {activePage === "dashboard" && (
          <div>
            {/* Balance & Quick Update */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-center">
                <span className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider text-sm">
                  {translations[language].totalBalance}
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight balance-glow">
                    ${currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h3>
                  <span className="text-green-500 font-bold"><i className="fas fa-caret-up"></i> 12%</span>
                </div>
              </div>

              {/* Quick Update */}
              <div className="bg-indigo-600 p-6 rounded-3xl shadow-lg text-white">
                <h4 className="font-bold mb-4">{translations[language].quickUpdate}</h4>
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder={translations[language].amountPlaceholder}
                    className="w-full p-3 rounded-xl border-none text-slate-900 outline-none"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <select
                    className="w-full p-3 rounded-xl border-none text-slate-900 outline-none"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="income">{translations[language].income}</option>
                    <option value="expense">{translations[language].expenseType}</option>
                  </select>
                  <button
                    onClick={updateFinance}
                    className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-50 transition"
                  >
                    {translations[language].updateBalance}
                  </button>
                </div>
              </div>
            </div>

            {/* Money Flow Analysis */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 mb-8">
              <h4 className="font-bold text-lg mb-6">{translations[language].moneyFlow}</h4>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="w-full md:w-1/3 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900 rounded-2xl border border-green-100 dark:border-green-700 flow-card">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white"><i className="fas fa-briefcase"></i></div>
                      <div>
                        <p className="text-sm font-bold">{translations[language].salary}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{translations[language].primarySource}</p>
                      </div>
                    </div>
                    <span className="font-bold text-green-600">+Rs.8,000</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900 rounded-2xl border border-emerald-100 dark:border-emerald-700 flow-card">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white"><i className="fas fa-chart-line"></i></div>
                      <div>
                        <p className="text-sm font-bold">{translations[language].dividends}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{translations[language].passive}</p>
                      </div>
                    </div>
                    <span className="font-bold text-emerald-600">+Rs.450</span>
                  </div>
                </div>

                {/* Net Flow */}
                <div className="hidden md:flex flex-1 flex-col items-center">
                  <div className="w-full h-1 bg-gradient-to-r from-green-400 via-indigo-400 to-red-400 rounded-full relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-4 py-1 border rounded-full text-xs font-bold shadow-sm">NET FLOW</div>
                  </div>
                </div>

                <div className="w-full md:w-1/3 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900 rounded-2xl border border-red-100 dark:border-red-700 flow-card">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white"><i className="fas fa-home"></i></div>
                      <div>
                        <p className="text-sm font-bold">{translations[language].housing}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{translations[language].fixedExpense}</p>
                      </div>
                    </div>
                    <span className="font-bold text-red-600">-Rs.2,100</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900 rounded-2xl border border-orange-100 dark:border-orange-700 flow-card">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white"><i className="fas fa-shopping-cart"></i></div>
                      <div>
                        <p className="text-sm font-bold">{translations[language].lifestyle}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{translations[language].variable}</p>
                      </div>
                    </div>
                    <span className="font-bold text-orange-600">-Rs.850</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === "settings" && (
          <Settings language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} />
        )}
        {activePage === "savings" && <Saving language={language} />}
        {activePage === "expense" && <Expense language={language} />}
      </main>
    </div>
    
  );
}
