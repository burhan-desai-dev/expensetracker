// Ye component total kharcha dikhata hai.
// Props:
// total  -> kul rakam (number)
// count  -> kitne expenses hain
// filter -> abhi kaunsi category selected hai ("All" ya koi category)
function Summary({ total, count, filter }) {
  return (
    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl shadow-md p-6 text-center">

      {/* Ternary operator: condition ? agar_sahi : agar_ghalat
          Agar filter "All" hai to "Total Spent", warna "Total Spent on Food" jaisa likho */}
      <p className="text-sm opacity-90">
        {filter === "All" ? "Total Spent" : `Total Spent on ${filter}`}
      </p>

      <h2 className="text-4xl font-extrabold mt-1">
        Rs {total.toLocaleString()}
      </h2>

      {/* Agar count 1 hai to "expense", warna "expenses" (grammar sahi rakhne ke liye) */}
      <p className="text-sm opacity-90 mt-1">
        {count} {count === 1 ? "expense" : "expenses"}
      </p>
    </div>
  );
}

export default Summary;