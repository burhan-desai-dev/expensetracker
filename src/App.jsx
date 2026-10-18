import { useState } from "react";

// Apne banaye hue 3 components import kar rahe hain
import ExpenseForm from "./components/ExpenseForm";
import ExpenseItem from "./components/ExpenseItem";
import Summary from "./components/Summary";

// Categories ki list component ke BAHAR rakhi hai kyunke ye kabhi change nahi hoti
// (agar andar rakhte to har render par dobara ban jati)
const categories = ["Food", "Transport", "Bills", "Shopping", "Other"];

function App() {

  // ---------- STATES ----------

  // expenses: saare kharchon ki list (array of objects)
  // Ye state parent (App) mein rakhi hai kyunke Form, List aur Summary
  // sab ko isi data ki zaroorat hai. Isay "Lifting State Up" kehte hain.
  // Shuru mein 2 sample expenses daale hain taake app khali na lage.
  const [expenses, setExpenses] = useState([
    { id: 1, title: "Lunch", amount: 450, category: "Food" },
    { id: 2, title: "Uber Ride", amount: 800, category: "Transport" },
  ]);

  // filter: abhi kaunsi category dekh rahe hain ("All" matlab sab)
  const [filter, setFilter] = useState("All");

  // ---------- FUNCTIONS ----------

  // Naya expense add karne ka function.
  // Ye ExpenseForm ko prop (onAdd) ke taur par diya jayega.
  function addExpense(newExpense) {
    // [newExpense, ...expenses]:
    //   ...expenses (spread operator) purani list ki saari items copy kar deta hai.
    //   newExpense ko sab se pehle likha taake naya expense list mein upar aaye.
    // NOTE: React mein state ko seedha change nahi karte (push() nahi),
    // hamesha nayi copy bana kar set karte hain.
    setExpenses([newExpense, ...expenses]);
  }

  // Expense delete karne ka function.
  function deleteExpense(id) {
    // filter(): sirf wo items rakhta hai jinki condition true ho.
    // expense.id !== id ka matlab: jis ki id match kare usay chhod kar baaqi sab rakho.
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }

  // ---------- DERIVED DATA (state se nikala hua data) ----------
  // Inhe alag state mein rakhne ki zaroorat nahi, kyunke ye expenses aur filter se
  // hamesha calculate ho sakte hain.

  // Filter ke hisab se kaun se expenses dikhane hain:
  // Agar filter "All" hai to saare, warna sirf wo jin ki category match kare.
  const visibleExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === filter);

  // Total nikalna reduce() se:
  // reduce((sum, expense) => sum + expense.amount, 0)
  //   0 = shuru ka total
  //   har expense ke liye: pichla sum + is expense ka amount
  // Aakhir mein saara total ek number ban jata hai.
  const total = visibleExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // ---------- UI ----------
  return (
    // min-h-screen: kam az kam poori screen ki height
    // max-w-2xl mx-auto: content ko beech mein rakhta hai, zyada chauda nahi hone deta
    // space-y-6: children ke darmiyan vertical gap
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            💸 Expense Tracker
          </h1>
          <p className="text-gray-500">Track where your money goes</p>
        </div>

        {/* Summary component ko 3 props de rahe hain */}
        <Summary
          total={total}
          count={visibleExpenses.length}
          filter={filter}
        />

        {/* Form ko addExpense function aur categories de rahe hain.
            Form jab submit hoga to onAdd (yaani addExpense) call karega. */}
        <ExpenseForm onAdd={addExpense} categories={categories} />

        {/* Heading aur filter dropdown ek line mein */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-700">Your Expenses</h2>

          {/* Filter dropdown: value state se judi hai, onChange par state update hoti hai */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Conditional rendering: agar list khali hai to message, warna cards dikhao */}
        {visibleExpenses.length === 0 ? (
          <p className="text-center text-gray-400 py-8">
            No expenses found. Add one above! 👆
          </p>
        ) : (
          <div className="space-y-3">
            {/* .map(): har expense ke liye ek ExpenseItem component banata hai
                key: unique id, taake React sahi se track kare kaun sa item add/delete hua */}
            {visibleExpenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onDelete={deleteExpense}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;