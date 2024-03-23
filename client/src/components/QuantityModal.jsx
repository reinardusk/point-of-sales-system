export default function QuantityModal({ handleSubmitProduct }) {
  return (
    <div className="border w-[70%] min-h-[50%] bg-white absolute z-10 p-2 flex flex-col justify-center items-center shadow-xl">
      <form onSubmit={(e) => handleSubmitProduct(e)}>
        <input
          type="number"
          name=""
          id="quantity"
          className="border px-2"
          placeholder="Quantity"
        />
        <button
          type="submit"
          className="border bg-slate-800 text-white px-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
