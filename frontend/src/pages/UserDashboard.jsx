import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// --- 1. TRANSLATION DICTIONARY ---
const translations = {
  english: {
    dashboard: "Dashboard",
    savings: "Savings",
    expense: "Expense",
    settings: "Settings",
    logout: "Logout",
    totalBalance: "Total Available Balance",
    incomePlaceholder: "e.g. 50000",
    incomeLabel: "Enter your starting monthly income",
    recentSavings: "Recent Savings",
    recentExpenses: "Recent Expenses",
    savingField: "Saving Field",
    savingAmount: "Amount",
    expenseField: "Expense Field",
    expenseAmount: "Amount",
    createSaving: "Create Saving",
    createExpense: "Add Expense",
    noData: "No records found",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    selectLanguage: "Select Language:",
    selectTheme: "Select Theme:",
    light: "Light",
    dark: "Dark"
  },
  nepali: {
    dashboard: "ड्यासबोर्ड",
    savings: "बचत",
    expense: "खर्च",
    settings: "सेटिङ्स",
    logout: "लगआउट",
    totalBalance: "कुल उपलब्ध ब्यालेन्स",
    incomePlaceholder: "उदा: ५००००",
    incomeLabel: "आफ्नो सुरुवाती मासिक आम्दानी लेख्नुहोस्",
    recentSavings: "हालैका बचतहरू",
    recentExpenses: "हालैका खर्चहरू",
    savingField: "बचतको विषय",
    savingAmount: "रकम",
    expenseField: "खर्चको शीर्षक",
    expenseAmount: "रकम",
    createSaving: "बचत थप्नुहोस्",
    createExpense: "खर्च थप्नुहोस्",
    noData: "कुनै रेकर्ड भेटिएन",
    actions: "कार्यहरू",
    edit: "संपादन",
    delete: "मेटाउनुहोस्",
    selectLanguage: "भाषा चयन गर्नुहोस्:",
    selectTheme: "थिम चयन गर्नुहोस्:",
    light: "हल्का",
    dark: "गाढा"
  },
};

// --- 2. INTERNAL COMPONENTS ---

function Settings({ language, setLanguage, theme, setTheme }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-6">{translations[language].settings}</h2>
      <div className="mb-6">
        <p className="font-medium mb-2">{translations[language].selectLanguage}</p>
        <div className="flex gap-4">
          <button onClick={() => setLanguage("english")} className={`px-4 py-2 rounded-xl border transition ${language === "english" ? "bg-indigo-600 text-white" : "bg-white text-slate-700"}`}>English</button>
          <button onClick={() => setLanguage("nepali")} className={`px-4 py-2 rounded-xl border transition ${language === "nepali" ? "bg-indigo-600 text-white" : "bg-white text-slate-700"}`}>नेपाली</button>
        </div>
      </div>
      <div>
        <p className="font-medium mb-2">{translations[language].selectTheme}</p>
        <div className="flex gap-4">
          <button onClick={() => setTheme("light")} className={`px-4 py-2 rounded-xl border transition ${theme === "light" ? "bg-indigo-600 text-white" : "bg-white text-slate-700"}`}>{translations[language].light}</button>
          <button onClick={() => setTheme("dark")} className={`px-4 py-2 rounded-xl border transition ${theme === "dark" ? "bg-indigo-600 text-white" : "bg-white text-slate-700"}`}>{translations[language].dark}</button>
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


// --- 3. MAIN DASHBOARD ---

export default function UserDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [language, setLanguage] = useState("english");
  const [theme, setTheme] = useState("light");
  const [typedIncome, setTypedIncome] = useState(""); 
  const [savingsList, setSavingsList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchDashboardData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const [savRes, expRes] = await Promise.all([
        fetch("http://localhost:3000/api/savings", { headers }),
        fetch("http://localhost:3000/api/expenses", { headers })
      ]);
      const savData = await savRes.json();
      const expData = await expRes.json();
      if (savData.success) setSavingsList(savData.data);
      if (expData.success) setExpensesList(expData.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [activePage]);

  const totalSavings = savingsList.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpenses = expensesList.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const liveIncomeDisplay = (Number(typedIncome) || 0) + totalSavings - totalExpenses;

  const NavItem = ({ id, label, icon }) => (
    <button
      onClick={() => setActivePage(id)}
      className={`w-full flex items-center gap-3 px-6 py-4 transition-all duration-200 ${
        activePage === id ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
      }`}
    >
      <i className={`fas ${icon} w-5`}></i>
      <span className="font-semibold">{label}</span>
    </button>
  );

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}>
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed h-full z-10">
        <div className="p-8 flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-10 h-10 object-contain" 
            onError={(e) => { e.target.style.display = 'none'; }} 
          />
          <div className="text-2xl font-black text-indigo-600 tracking-tighter uppercase">MONEYMATE</div>
        </div>
        
        <nav className="flex-1 mt-4">
          <NavItem id="dashboard" label={translations[language].dashboard} icon="fa-th-large" />
          <NavItem id="savings" label={translations[language].savings} icon="fa-piggy-bank" />
          <NavItem id="expense" label={translations[language].expense} icon="fa-wallet" />
          <NavItem id="settings" label={translations[language].settings} icon="fa-cog" />
        </nav>
        
        <div className="p-6 border-t dark:border-slate-800">
           <button onClick={handleLogout} className="w-full bg-red-50 py-3 rounded-xl text-red-600 font-bold hover:bg-red-100 transition flex items-center justify-center gap-2">
             <i className="fas fa-sign-out-alt"></i>
             {translations[language].logout}
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold uppercase tracking-wide">{translations[language][activePage]}</h1>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">U</div>
             <span className="font-medium">User</span>
          </div>
        </header>

        {activePage === "dashboard" && (
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* 1. INCOME INPUT SECTION */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
               <div>
                  <h4 className="font-bold text-indigo-600 text-sm uppercase">{translations[language].incomeLabel}</h4>
                  <p className="text-xs text-slate-400">Set your starting monthly balance</p>
               </div>
               <div className="relative w-full md:w-64">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rs.</span>
                 <input 
                  type="number" 
                  placeholder={translations[language].incomePlaceholder}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-100 dark:bg-slate-900 dark:border-slate-700 outline-none focus:border-indigo-500 transition font-bold"
                  value={typedIncome}
                  onChange={(e) => setTypedIncome(e.target.value)}
                />
               </div>
            </div>

            {/* 2. TOTAL BALANCE CARD */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-sm uppercase tracking-widest opacity-80 font-bold">{translations[language].totalBalance}</h2>
                  <h1 className="text-6xl font-black mt-2">Rs. {liveIncomeDisplay.toLocaleString()}</h1>
                  <div className="flex flex-wrap gap-4 mt-8">
                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                      <p className="text-[10px] uppercase opacity-60">Base Income</p>
                      <p className="font-bold">{Number(typedIncome || 0).toLocaleString()}</p>
                    </div>
                    <div className="bg-green-400/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-green-400/20">
                      <p className="text-[10px] uppercase opacity-60">Total Savings</p>
                      <p className="font-bold">+{totalSavings.toLocaleString()}</p>
                    </div>
                    <div className="bg-red-400/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-red-400/20">
                      <p className="text-[10px] uppercase opacity-60">Total Expenses</p>
                      <p className="font-bold">-{totalExpenses.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* 3. ACTIVITY LISTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Recent Savings */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border dark:border-slate-700">
                <h3 className="font-bold text-lg flex items-center gap-2 mb-6">
                  <span className="p-2 bg-green-100 text-green-600 rounded-lg text-xs"><i className="fas fa-arrow-up"></i></span>
                  {translations[language].recentSavings}
                </h3>
                <div className="space-y-4">
                  {savingsList.length > 0 ? savingsList.slice(0, 5).map((s) => (
                    <div key={s.id} className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700">
                      <div>
                        <p className="font-bold text-slate-700 dark:text-slate-200">{s.description}</p>
                        <p className="text-[10px] text-slate-400">Entry Saved</p>
                      </div>
                      <p className="font-black text-green-600">+ Rs. {Number(s.amount).toLocaleString()}</p>
                    </div>
                  )) : <p className="text-center py-6 text-slate-400 text-sm italic">{translations[language].noData}</p>}
                </div>
              </div>

              {/* Recent Expenses */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border dark:border-slate-700">
                <h3 className="font-bold text-lg flex items-center gap-2 mb-6">
                  <span className="p-2 bg-red-100 text-red-600 rounded-lg text-xs"><i className="fas fa-arrow-down"></i></span>
                  {translations[language].recentExpenses}
                </h3>
                <div className="space-y-4">
                  {expensesList.length > 0 ? expensesList.slice(0, 5).map((e) => (
                    <div key={e.id} className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700">
                      <div>
                        <p className="font-bold text-slate-700 dark:text-slate-200">{e.description}</p>
                        <p className="text-[10px] text-slate-400">Entry Spent</p>
                      </div>
                      <p className="font-black text-red-600">- Rs. {Number(e.amount).toLocaleString()}</p>
                    </div>
                  )) : <p className="text-center py-6 text-slate-400 text-sm italic">{translations[language].noData}</p>}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SUB-PAGES */}
        {activePage === "savings" && <Saving language={language} />}
        {activePage === "expense" && <Expense language={language} />}
        {activePage === "settings" && <Settings language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} />}
      </main>
    </div>
  );
}