// useState: React ka hook jo component ke andar data (state) yaad rakhta hai
import { useState } from "react";

// Ye component 2 props receive kar raha hai:
// onAdd      -> ek function jo parent (App) ne diya hai, naya expense add karne ke liye
// categories -> categories ki list (Food, Transport etc.)
// { onAdd, categories } ko "destructuring" kehte hain (props se seedha values nikalna)
function ExpenseForm({ onAdd, categories }) {

  // ---------- STATES (har input ki apni state) ----------
  // useState("") ka matlab: shuru mein value khali string hai
  // title = current value, setTitle = usay change karne wala function
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  // category ki default value list ki pehli category (Food) rakhi hai
  const [category, setCategory] = useState(categories[0]);

  // ---------- FORM SUBMIT HONE PAR ----------
  function handleSubmit(e) {
    // Form submit hone par browser by default page reload karta hai.
    // preventDefault() us reload ko rok deta hai.
    e.preventDefault();

    // Validation: agar title khali hai ya amount 0 ya us se kam hai to ruk jao
    // trim() = shuru aur aakhir ki khali jagah hata deta hai
    // Number(amount) = string ko number mein convert karta hai
    if (title.trim() === "" || Number(amount) <= 0) {
      alert("Please enter a valid title and amount!");
      return; // function yahin ruk jaye, aage ka code na chale
    }

    // Parent (App) ke diye hue onAdd function ko call kar rahe hain
    // aur naya expense object bhej rahe hain
    onAdd({
      id: Date.now(),          // current time ka number, ye unique id ka kaam karta hai
      title: title.trim(),     // title (extra spaces hata kar)
      amount: Number(amount),  // amount ko number bana kar
      category: category,      // selected category
    });

    // Expense add hone ke baad form ko dobara khali kar do
    setTitle("");
    setAmount("");
    setCategory(categories[0]);
  }

  // ---------- UI (jo screen par dikhega) ----------
  return (
    // onSubmit: jab form submit ho (button dabane par) to handleSubmit chale
    // grid + md:grid-cols-3: chhoti screen par 1 column, medium+ par 3 columns
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-6 grid gap-4 md:grid-cols-3"
    >
      {/* Title input */}
      {/* value={title}: input mein wahi dikhega jo state mein hai */}
      {/* onChange: jab user type kare to state update ho (e.target.value = jo user ne likha) */}
      {/* Value + onChange dono milkar "Controlled Input" banate hain */}
      <input
        type="text"
        placeholder="Expense title (e.g. Lunch)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 md:col-span-3"
      />

      {/* Amount input (type="number" sirf numbers allow karta hai) */}
      <input
        type="number"
        placeholder="Amount (Rs)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 md:col-span-2"
      />

      {/* Category dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        {/* .map() har category ke liye ek <option> bana deta hai */}
        {/* key: React ko har item pehchanne ke liye unique value chahiye hoti hai */}
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* type="submit": is button ko dabane se form submit hoga */}
      <button
        type="submit"
        className="md:col-span-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition-colors"
      >
        + Add Expense
      </button>
    </form>
  );
}

// export default: taake dusri files (App.jsx) is component ko import kar sakein
export default ExpenseForm;