import formatRupiah from "../helpers/formatRupiah";

export default function AddItemModal({
  setAddItemModal,
  products,
  setProductId,
  setQuantityModal,
  setPrice,
}) {
  return (
    <div className="border w-[70%] min-h-[50%] bg-white absolute z-10 p-2 flex flex-col">
      <button
        className="self-end px-5 text-red-500 font-semibold"
        onClick={() => setAddItemModal(false)}
      >
        BACK
      </button>
      <div className="flex flex-col max-h-[500px] overflow-auto">
        {products?.map((product, idx) => {
          return (
            <>
              <div
                className="flex gap-5 my-3 items-center overflow justify-around"
                key={idx}
              >
                <h1 className="w-[300px]">{product.name}</h1>
                <img src={product.image} alt="" />
                <img
                  src={product.picture}
                  alt=""
                  className="w-20 h-15 rounded-md"
                />
                <h1>{product.stock}</h1>
                <h1>{formatRupiah(product.price)}</h1>

                <button
                  className="border bg-slate-800 text-white px-2 rounded-md w-20 h-10"
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
            </>
          );
        })}
      </div>
    </div>
  );
}
