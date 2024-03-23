import axios from "axios";
import { useEffect, useState } from "react";
import formatDate from "../helpers/formatDate";
import formatRupiah from "../helpers/formatRupiah";
import { useNavigate } from "react-router-dom";

export default function InvoiceList() {
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    const fetchInvoices = async () => {
      const { data } = await axios.get("http://localhost:3000/invoices");
      setInvoices(data);
    };
    fetchInvoices();
  }, []);

  const sum = (arr) => {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      total += Number(arr[i].totalPrice);
    }
    return total;
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mb-5">Invoice List</h1>
      {/* <h1>{JSON.stringify(invoices, null, 2)}</h1> */}
      <div className="flex flex-col gap-2">
        {invoices?.map((invoice) => (
          <div className="flex flex-col gap-2 border p-2" key={invoice.id}>
            <p>Invoice Number: {invoice.id}</p>
            <p>Invoice Date: {formatDate(invoice.date)}</p>
            <p>Customer Name: {invoice.customerName}</p>
            <p>Sales Person Name: {invoice.salesPersonName}</p>
            <p>
              Total Amount Paid:{" "}
              {invoice.ProductSolds?.length > 0
                ? formatRupiah(sum(invoice.ProductSolds))
                : null}
            </p>
            <p>Notes: {invoice.notes}</p>
            <button
              className="border rounded-md bg-slate-800 text-white py-1 px-2"
              onClick={() => navigate(`/invoice-detail/${invoice.id}`)}
            >
              View Detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
