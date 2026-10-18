// Ye component sirf EK expense ki card dikhata hai.
// Props:
// expense  -> ek object { id, title, amount, category }
// onDelete -> parent ka function jo expense delete karta hai
function ExpenseItem({ expense, onDelete }) {
  return (
    // flex + justify-between: left side title, right side amount aur delete button
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition-shadow">

      {/* Left side: title aur category */}
      <div>
        {/* {expense.title}: curly braces ke andar JavaScript value likhte hain */}
        <h3 className="font-semibold text-gray-800">{expense.title}</h3>

        {/* Category ka chhota badge */}
        <span className="inline-block mt-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
          {expense.category}
        </span>
      </div>

      {/* Right side: amount aur delete button */}
      <div className="flex items-center gap-4">
        {/* toLocaleString(): 1500 ko 1,500 bana deta hai (padhne mein asaan) */}
        <span className="font-bold text-gray-800">
          Rs {expense.amount.toLocaleString()}
        </span>

        {/* Delete button */}
        {/* onClick={() => onDelete(expense.id)}: click par parent ka delete function chalao
            aur usay is expense ki id bhejo taake pata chale kaun sa delete karna hai.
            Arrow function () => isliye likha ke direct onDelete(expense.id) likhte to
            wo page load hote hi chal jata, click ka intezar nahi karta */}
        <button
          onClick={() => onDelete(expense.id)}
          className="text-red-500 hover:text-red-700 text-lg"
          title="Delete"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;