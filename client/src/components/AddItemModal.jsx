import formatRupiah from "../helpers/formatRupiah";

export default function AddItemModal({
  setAddItemModal,
  products,
  setProductId,
  setQuantityModal,
  setPrice,
}) {
  return (
    <div className="border w-[70%] min-h-[50%] bg-white absolute z-10 p-2">
      <h1>INI ADD ITEM MODAL</h1>
      <form action="">
        <input type="search" name="" id="" className="border" />
      </form>
      <div className="flex flex-col">
        {products?.map((product, idx) => {
          return (
            <div className="flex gap-5 my-3" key={idx}>
              <h1>{product.name}</h1>
              <img src={product.image} alt="" />
              <h1>{product.stock}</h1>
              <h1>{formatRupiah(product.price)}</h1>

              <button
                className="border bg-slate-800 text-white px-2 rounded-md"
                onClick={() => {
                  setProductId(product.id);
                  setPrice(product.price);
                  setAddItemModal(false);
                  setQuantityModal(true);
                }}
              >
                Add
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
