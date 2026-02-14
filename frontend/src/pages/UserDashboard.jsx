import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// --- 1. TRANSLATION DICTIONARY ---
const translations = {
  english: {
    dashboard: "Dashboard",
    savings: "Savings",
    expense: "Expense",
    income: "Income",
    settings: "Settings",
    logout: "Logout",
    totalBalance: "Total Available Balance",
    incomePlaceholder: "e.g. 50000",
    incomeLabel: "Manage your Income Sources",
    recentIncome: "Recent Income",
    recentSavings: "Recent Savings",
    recentExpenses: "Recent Expenses",
    incomeField: "Income Source",
    incomeAmount: "Amount",
    savingField: "Saving Field",
    savingAmount: "Amount",
    expenseField: "Expense Field",
    expenseAmount: "Amount",
    createIncome: "Add Income",
    createSaving: "Create Saving",
    createExpense: "Add Expense",
    noData: "No records found",
    noIncome: "No income records",
    noSavings: "No savings records",
    noExpenses: "No expense records",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    selectLanguage: "Select Language:",
    selectTheme: "Select Theme:",
    light: "Light",
    dark: "Dark",
    wishlist: "My Wishlist",
    addWish: "Add Wish",
    wishNote: "What are you wishing for?",
    uploadPhoto: "Add Photo",
    savingFor: "Saving for this..."
  },
  nepali: {
    dashboard: "ड्यासबोर्ड",
    savings: "बचत",
    expense: "खर्च",
    income: "आम्दानी",
    settings: "सेटिङ्स",
    logout: "लगआउट",
    totalBalance: "कुल उपलब्ध ब्यालेन्स",
    incomePlaceholder: "उदा: ५००००",
    incomeLabel: "आफ्नो आम्दानीका स्रोतहरू व्यवस्थापन गर्नुहोस्",
    recentIncome: "हालैका आम्दानीहरू",
    recentSavings: "हालैका बचतहरू",
    recentExpenses: "हालैका खर्चहरू",
    incomeField: "आम्दानीको स्रोत",
    incomeAmount: "रकम",
    savingField: "बचतको विषय",
    savingAmount: "रकम",
    expenseField: "खर्चको शीर्षक",
    expenseAmount: "रकम",
    createIncome: "आम्दानी थप्नुहोस्",
    createSaving: "बचत थप्नुहोस्",
    createExpense: "खर्च थप्नुहोस्",
    noData: "कुनै रेकर्ड भेटिएन",
    noIncome: "कुनै आम्दानी भेटिएन",
    noSavings: "कुनै बचत भेटिएन",
    noExpenses: "कुनै खर्च भेटिएन",
    actions: "कार्यहरू",
    edit: "संपादन",
    delete: "मेटाउनुहोस्",
    selectLanguage: "भाषा चयन गर्नुहोस्:",
    selectTheme: "थिम चयन गर्नुहोस्:",
    light: "हल्का",
    dark: "गाढा",
    wishlist: "इच्छा सूची",
    addWish: "थप्नुहोस्",
    wishNote: "तपाईं के चाहनुहुन्छ?",
    uploadPhoto: "फोटो राख्नुहोस्",
    savingFor: "यसको लागि बचत गर्दै..."
  },
};

// --- 2. INTERNAL COMPONENTS ---

// This component is now rendered inside the Balance Card
function WishlistInsideCard({ language, wishes, fetchWishes }) {
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  const API_BASE = "http://localhost:3000/api/wishlist";

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !note) return toast.error("Provide image and note");
    const formData = new FormData();
    formData.append("wishlistImage", file);
    formData.append("note", note);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(API_BASE, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      if (res.data.success) {
        toast.success("Added!");
        setNote(""); setFile(null);
        fetchWishes(); 
      }
    } catch (err) { toast.error("Failed"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this wish permanently?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        toast.success("Deleted permanently");
        fetchWishes();
      }
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-white/20">
      <h3 className="text-xs font-bold mb-3 uppercase tracking-widest opacity-90">{translations[language].wishlist}</h3>
      
      {/* Mini Upload Form */}
      <form onSubmit={handleUpload} className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={note} 
          onChange={(e) => setNote(e.target.value)} 
          placeholder={translations[language].wishNote}
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-xs focus:outline-none placeholder:text-white/50" 
        />
        <input 
          type="file" 
          id="wish-file" 
          className="hidden" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
        <label htmlFor="wish-file" className="bg-white/20 p-2 rounded-lg cursor-pointer hover:bg-white/30 transition text-[10px]">
          <i className="fas fa-camera"></i>
        </label>
        <button type="submit" className="bg-white text-indigo-700 px-3 py-1 rounded-lg text-xs font-bold">
          {translations[language].addWish}
        </button>
      </form>

      {/* Horizontal List */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {wishes.length > 0 ? wishes.map((wish) => (
          <div key={wish.id} className="relative group flex-shrink-0 w-20">
            {/* Permanent Delete Button */}
            <button 
              onClick={() => handleDelete(wish.id)}
              className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-[10px] z-20 opacity-0 group-hover:opacity-100 transition shadow-lg"
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white/30 shadow-lg">
              <img src={`http://localhost:3000/${wish.imageUrl}`} className="w-full h-full object-cover" alt="Wish" />
            </div>
            <p className="text-[10px] mt-1 text-center truncate font-medium">{wish.note}</p>
          </div>
        )) : (
            <p className="text-[10px] italic opacity-60">No wishes yet...</p>
        )}
      </div>
    </div>
  );
}

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

function Income({ language }) {
  const [field, setField] = useState("");
  const [amount, setAmount] = useState("");
  const [incomeList, setIncomeList] = useState([]);
  const API_BASE = "http://localhost:3000/api/income";

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  };

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const res = await fetch(API_BASE, { headers: getAuthHeaders() });
        const data = await res.json();
        if (data.success) setIncomeList(data.data);
      } catch (err) { console.error(err); }
    };
    fetchIncome();
  }, []);

  const handleCreate = async () => {
    if (!field || !amount || parseFloat(amount) <= 0) return alert("Invalid data");
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ description: field, amount: parseFloat(amount) }),
      });
      const data = await res.json();
      if (data.success) {
        setIncomeList([data.data, ...incomeList]);
        setField(""); setAmount("");
      }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this income?")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE", headers: getAuthHeaders() });
      const data = await res.json();
      if (data.success) setIncomeList(incomeList.filter((i) => i.id !== id));
    } catch (err) { console.error(err); }
  };

  const handleEdit = async (id) => {
    const item = incomeList.find((i) => i.id === id);
    const newField = prompt(translations[language].incomeField, item.description);
    const newAmount = prompt(translations[language].incomeAmount, item.amount);
    if (!newField || isNaN(parseFloat(newAmount))) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ description: newField, amount: parseFloat(newAmount) }),
      });
      const data = await res.json();
      if (data.success) setIncomeList(incomeList.map((i) => (i.id === id ? data.data : i)));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-4">{translations[language].income}</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input type="text" placeholder={translations[language].incomeField} className="p-3 rounded-xl border border-slate-300 dark:border-slate-600 flex-1 dark:bg-slate-900" value={field} onChange={(e) => setField(e.target.value)} />
        <input type="number" placeholder={translations[language].incomeAmount} className="p-3 rounded-xl border border-slate-300 dark:border-slate-600 w-40 dark:bg-slate-900" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={handleCreate} className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-500 transition font-bold">{translations[language].createIncome}</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-slate-300 dark:border-slate-600">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-700 text-left">
              <th className="p-3 border">{translations[language].incomeField}</th>
              <th className="p-3 border">{translations[language].incomeAmount}</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incomeList.length === 0 && <tr><td colSpan="3" className="text-center p-3">{translations[language].noIncome}</td></tr>}
            {incomeList.map((i) => (
              <tr key={i.id}>
                <td className="p-3 border">{i.description}</td>
                <td className="p-3 border">{Number(i.amount).toLocaleString()}</td>
                <td className="p-3 border flex gap-2">
                  <button onClick={() => handleEdit(i.id)} className="bg-yellow-400 text-white px-3 py-1 rounded">{translations[language].edit}</button>
                  <button onClick={() => handleDelete(i.id)} className="bg-red-500 text-white px-3 py-1 rounded">{translations[language].delete}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Saving({ language }) {
  const [field, setField] = useState("");
  const [amount, setAmount] = useState("");
  const [savingsList, setSavingsList] = useState([]);
  const API_BASE = "http://localhost:3000/api/savings";

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  };

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const res = await fetch(API_BASE, { headers: getAuthHeaders() });
        const data = await res.json();
        if (data.success) setSavingsList(data.data);
      } catch (err) { console.error(err); }
    };
    fetchSavings();
  }, []);

  const handleCreate = async () => {
    if (!field || !amount || parseFloat(amount) <= 0) return alert("Invalid data");
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ description: field, amount: parseFloat(amount) }),
      });
      const data = await res.json();
      if (data.success) {
        setSavingsList([data.data, ...savingsList]);
        setField(""); setAmount("");
      }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this saving?")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE", headers: getAuthHeaders() });
      const data = await res.json();
      if (data.success) setSavingsList(savingsList.filter((s) => s.id !== id));
    } catch (err) { console.error(err); }
  };

  const handleEdit = async (id) => {
    const item = savingsList.find((s) => s.id === id);
    const newField = prompt(translations[language].savingField, item.description);
    const newAmount = prompt(translations[language].savingAmount, item.amount);
    if (!newField || isNaN(parseFloat(newAmount))) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ description: newField, amount: parseFloat(newAmount) }),
      });
      const data = await res.json();
      if (data.success) setSavingsList(savingsList.map((s) => (s.id === id ? data.data : s)));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-4">{translations[language].savings}</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input type="text" placeholder={translations[language].savingField} className="p-3 rounded-xl border border-slate-300 dark:border-slate-600 flex-1 dark:bg-slate-900" value={field} onChange={(e) => setField(e.target.value)} />
        <input type="number" placeholder={translations[language].savingAmount} className="p-3 rounded-xl border border-slate-300 dark:border-slate-600 w-40 dark:bg-slate-900" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={handleCreate} className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-500 transition font-bold">{translations[language].createSaving}</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-slate-300 dark:border-slate-600">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-700 text-left">
              <th className="p-3 border">{translations[language].savingField}</th>
              <th className="p-3 border">{translations[language].savingAmount}</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {savingsList.length === 0 && <tr><td colSpan="3" className="text-center p-3">{translations[language].noSavings}</td></tr>}
            {savingsList.map((s) => (
              <tr key={s.id}>
                <td className="p-3 border">{s.description}</td>
                <td className="p-3 border">{Number(s.amount).toLocaleString()}</td>
                <td className="p-3 border flex gap-2">
                  <button onClick={() => handleEdit(s.id)} className="bg-yellow-400 text-white px-3 py-1 rounded">{translations[language].edit}</button>
                  <button onClick={() => handleDelete(s.id)} className="bg-red-500 text-white px-3 py-1 rounded">{translations[language].delete}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Expense({ language }) {
  const [field, setField] = useState("");
  const [amount, setAmount] = useState("");
  const [expensesList, setExpensesList] = useState([]);
  const API_BASE = "http://localhost:3000/api/expenses";

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch(API_BASE, { headers: getAuthHeaders() });
        const data = await res.json();
        if (data.success) setExpensesList(data.data);
      } catch (err) { console.error(err); }
    };
    fetchExpenses();
  }, []);

  const handleCreate = async () => {
    if (!field || !amount || parseFloat(amount) <= 0) return alert("Invalid data");
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ description: field, amount: parseFloat(amount) }),
      });
      const data = await res.json();
      if (data.success) {
        setExpensesList([data.data, ...expensesList]);
        setField(""); setAmount("");
      }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE", headers: getAuthHeaders() });
      const data = await res.json();
      if (data.success) setExpensesList(expensesList.filter((e) => e.id !== id));
    } catch (err) { console.error(err); }
  };

  const handleEdit = async (id) => {
    const item = expensesList.find((e) => e.id === id);
    const newField = prompt(translations[language].expenseField, item.description);
    const newAmount = prompt(translations[language].expenseAmount, item.amount);
    if (!newField || isNaN(parseFloat(newAmount))) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ description: newField, amount: parseFloat(newAmount) }),
      });
      const data = await res.json();
      if (data.success) setExpensesList(expensesList.map((e) => (e.id === id ? data.data : e)));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-4">{translations[language].expense}</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input type="text" placeholder={translations[language].expenseField} className="p-3 rounded-xl border border-slate-300 dark:border-slate-600 flex-1 dark:bg-slate-900" value={field} onChange={(e) => setField(e.target.value)} />
        <input type="number" placeholder={translations[language].expenseAmount} className="p-3 rounded-xl border border-slate-300 dark:border-slate-600 w-40 dark:bg-slate-900" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={handleCreate} className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-500 transition font-bold">{translations[language].createExpense}</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-slate-300 dark:border-slate-600">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-700 text-left">
              <th className="p-3 border">{translations[language].expenseField}</th>
              <th className="p-3 border">{translations[language].expenseAmount}</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expensesList.length === 0 && <tr><td colSpan="3" className="text-center p-3">{translations[language].noExpenses}</td></tr>}
            {expensesList.map((e) => (
              <tr key={e.id}>
                <td className="p-3 border">{e.description}</td>
                <td className="p-3 border">{Number(e.amount).toLocaleString()}</td>
                <td className="p-3 border flex gap-2">
                  <button onClick={() => handleEdit(e.id)} className="bg-yellow-400 text-white px-3 py-1 rounded">{translations[language].edit}</button>
                  <button onClick={() => handleDelete(e.id)} className="bg-red-500 text-white px-3 py-1 rounded">{translations[language].delete}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- 3. MAIN DASHBOARD ---

export default function UserDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [language, setLanguage] = useState("english");
  const [theme, setTheme] = useState("light");
  const [incomeList, setIncomeList] = useState([]);
  const [savingsList, setSavingsList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [wishes, setWishes] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchWishes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) setWishes(res.data.data);
    } catch (err) { console.error(err); }
  };

  const fetchDashboardData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const [incRes, savRes, expRes] = await Promise.all([
        fetch("http://localhost:3000/api/income", { headers }),
        fetch("http://localhost:3000/api/savings", { headers }),
        fetch("http://localhost:3000/api/expenses", { headers })
      ]);
      const incData = await incRes.json();
      const savData = await savRes.json();
      const expData = await expRes.json();
      
      if (incData.success) setIncomeList(incData.data);
      if (savData.success) setSavingsList(savData.data);
      if (expData.success) setExpensesList(expData.data);
      fetchWishes();
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [activePage]);

  const totalIncome = incomeList.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalSavings = savingsList.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpenses = expensesList.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const liveIncomeDisplay = totalIncome + totalSavings - totalExpenses;

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
          <div className="text-2xl font-black text-indigo-600 tracking-tighter uppercase">MONEYMATE</div>
        </div>
        
        <nav className="flex-1 mt-4">
          <NavItem id="dashboard" label={translations[language].dashboard} icon="fa-th-large" />
          <NavItem id="income" label={translations[language].income} icon="fa-hand-holding-usd" />
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
            
            {/* 1. TOP SECTION (BALANCE CARD WITH INTEGRATED WISHLIST) */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-sm uppercase tracking-widest opacity-80 font-bold">{translations[language].totalBalance}</h2>
                  <h1 className="text-4xl md:text-6xl font-black mt-2">Rs. {liveIncomeDisplay.toLocaleString()}</h1>
                  
                  <div className="flex flex-wrap gap-4 mt-8">
                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                      <p className="text-[10px] uppercase opacity-60">Income</p>
                      <p className="font-bold">{totalIncome.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                      <p className="text-[10px] uppercase opacity-60">Savings</p>
                      <p className="font-bold">+{totalSavings.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                      <p className="text-[10px] uppercase opacity-60">Expenses</p>
                      <p className="font-bold">-{totalExpenses.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* WISHLIST SECTION - NOW INSIDE THE CARD */}
                  <WishlistInsideCard 
                    language={language} 
                    wishes={wishes} 
                    fetchWishes={fetchWishes} 
                  />
                </div>
                
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl"></div>
            </div>

            {/* 2. ACTIVITY LISTS (3-COLUMN GRID) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Income */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border dark:border-slate-700">
                <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                  <span className="p-2 bg-blue-100 text-blue-600 rounded-lg text-xs"><i className="fas fa-plus"></i></span>
                  {translations[language].recentIncome}
                </h3>
                <div className="space-y-3">
                  {incomeList.length > 0 ? incomeList.slice(0, 5).map((i) => (
                    <div key={i.id} className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700">
                      <p className="font-bold text-xs text-slate-700 dark:text-slate-200">{i.description}</p>
                      <p className="font-black text-blue-600 text-xs">Rs. {Number(i.amount).toLocaleString()}</p>
                    </div>
                  )) : <p className="text-center py-6 text-slate-400 text-xs italic">{translations[language].noData}</p>}
                </div>
              </div>

              {/* Recent Savings */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border dark:border-slate-700">
                <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                  <span className="p-2 bg-green-100 text-green-600 rounded-lg text-xs"><i className="fas fa-arrow-up"></i></span>
                  {translations[language].recentSavings}
                </h3>
                <div className="space-y-3">
                  {savingsList.length > 0 ? savingsList.slice(0, 5).map((s) => (
                    <div key={s.id} className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700">
                      <p className="font-bold text-xs text-slate-700 dark:text-slate-200">{s.description}</p>
                      <p className="font-black text-green-600 text-xs">+ Rs. {Number(s.amount).toLocaleString()}</p>
                    </div>
                  )) : <p className="text-center py-6 text-slate-400 text-xs italic">{translations[language].noData}</p>}
                </div>
              </div>

              {/* Recent Expenses */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border dark:border-slate-700">
                <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                  <span className="p-2 bg-red-100 text-red-600 rounded-lg text-xs"><i className="fas fa-arrow-down"></i></span>
                  {translations[language].recentExpenses}
                </h3>
                <div className="space-y-3">
                  {expensesList.length > 0 ? expensesList.slice(0, 5).map((e) => (
                    <div key={e.id} className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700">
                      <p className="font-bold text-xs text-slate-700 dark:text-slate-200">{e.description}</p>
                      <p className="font-black text-red-600 text-xs">- Rs. {Number(e.amount).toLocaleString()}</p>
                    </div>
                  )) : <p className="text-center py-6 text-slate-400 text-xs italic">{translations[language].noData}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB-PAGES */}
        {activePage === "income" && <Income language={language} />}
        {activePage === "savings" && <Saving language={language} />}
        {activePage === "expense" && <Expense language={language} />}
        {activePage === "settings" && <Settings language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} />}
      </main>
    </div>
  );
}