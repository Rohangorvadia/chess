export function Button({ onClick }) {
  return (
    <button
      className="bg-stone-100 text-black text-2xl font-bold py-4 px-8 rounded hover:bg-stone-200"
      onClick={onClick}
    >
      Play online
    </button>
  );
}
