import { useEffect, useState } from "react";
import formatDate from "../helpers/formatDate";
import AddItemModal from "../components/AddItemModal";
import axios from "axios";
import { SERVER_URL } from "../serverUrl";
import QuantityModal from "../components/QuantityModal";
import formatRupiah from "../helpers/formatRupiah";
import Swal from "sweetalert2";

export default function InvoiceCard({ invoiceData, invoiceId }) {
  let total = 0;
  const [addItemModal, setAddItemModal] = useState(false);
  const [quantityModal, setQuantityModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState(0);
  const [ordered, setOrdered] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const fetchProducts = async () => {
    const { data } = await axios.get(`${SERVER_URL}/products`);
    console.log(data, " <<< data");
    setProducts(data);
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    console.log(+e.target.quantity.value, " <<< quantity");
    console.log(productId, " <<< productId");
    console.log(price, " <<< price");
    console.log(invoiceId, " <<< invoiceId");
    try {
      await axios.post(`${SERVER_URL}/addProductToInvoice/${invoiceId}`, {
        ProductId: productId,
        quantity: +e.target.quantity.value,
        totalCogs: e.target.quantity.value * price * 0.7,
        totalPrice: e.target.quantity.value * price,
      });

      const { data } = await axios.get(
        `${SERVER_URL}/orderedProducts/${invoiceId}`
      );
      setOrdered(data);
      setQuantityModal(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className=" w-screen flex flex-col items-center justify-center">
      <div className="w-[70%] border p-2">
        {/* HEADERS */}
        <div className="flex flex-col gap-5">
          <div className="self-end">
            <h1 className="text-4xl font-bold text-right">WidaTech</h1>
            <p>
              Jl. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
              iusto.
            </p>
          </div>
          <h1 className="text-5xl font-bold">INVOICE</h1>
        </div>

        {/* INVOICE DETAILS */}
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-between w-full">
            <h2>Invoice No. : {invoiceData?.invoiceNumber}</h2>
            <h2>Date : {formatDate(invoiceData?.invoiceDate)}</h2>
          </div>
          <div className="w-full flex flex-col gap-2 my-2">
            <h2>Customer Name : {invoiceData?.customerName}</h2>
            <h2>Sales Person Name : {invoiceData?.salesPersonName}</h2>
          </div>

          <table className="w-[95%] border text-center">
            <thead className="border-b">
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {ordered?.map((order, idx) => {
                total += +order.totalPrice;
                return (
                  <tr key={idx}>
                    <td>{order.Product.name}</td>
                    <td>{order.quantity}</td>
                    <td>{formatRupiah(+order.Product.price)}</td>
                    <td>{formatRupiah(order.totalPrice)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* ADD ITEM BUTTON */}
          <button
            className="border py-1 px-2 my-2 rounded-md bg-slate-800 text-white"
            onClick={() => setAddItemModal(!addItemModal)}
          >
            Add Item
          </button>
          <h1 className="self-end text-3xl font-semibold">
            Total : {formatRupiah(+total)}
          </h1>
          {addItemModal && (
            <AddItemModal
              setAddItemModal={setAddItemModal}
              products={products}
              setProductId={setProductId}
              setQuantityModal={setQuantityModal}
              setPrice={setPrice}
            />
          )}
          {quantityModal && (
            <QuantityModal
              handleSubmitProduct={handleSubmitProduct}
              setOrdered={setOrdered}
            />
          )}

          {/* FOOTER */}
          <div className="self-start">
            <h1>Notes :</h1>
            <p className="text-justify">{invoiceData?.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
