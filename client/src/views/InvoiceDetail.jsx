import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../serverUrl";
import formatRupiah from "../helpers/formatRupiah";
import formatDate from "../helpers/formatDate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function InvoiceDetail() {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({});

  const fetchInvoiceDetail = async () => {
    const { data } = await axios.get(`${SERVER_URL}/invoices/${invoiceId}`);
    console.log(data, " <<< data");
    setInvoice(data);
  };

  const downloadPDF = async () => {
    const element = document.getElementById("invoice");
    const captured = await html2canvas(element);
    const imgData = captured.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const componentWidth = pdf.internal.pageSize.getWidth();

    pdf.addImage(imgData, "PNG", 0, 0, componentWidth, 0);
    pdf.save(`invoice-${invoiceId}.pdf`);
  };

  useEffect(() => {
    fetchInvoiceDetail();
  }, []);
  let total = 0;
  return (
    <div className=" w-screen flex flex-col items-center justify-center">
      <div className="w-[70%] border p-2" id="invoice">
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
            <h2>Invoice No. : {invoice?.id}</h2>
            <h2>Date : {formatDate(invoice?.date)}</h2>
          </div>
          <div className="w-full flex flex-col gap-2 my-2">
            <h2>Customer Name : {invoice?.customerName}</h2>
            <h2>Sales Person Name : {invoice?.salesPersonName}</h2>
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
              {invoice?.ProductSolds?.map((order, idx) => {
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
          <h1 className="self-end text-3xl font-semibold">
            Total : {formatRupiah(+total)}
          </h1>

          {/* FOOTER */}
          <div className="self-start">
            <h1>Notes :</h1>
            <p className="text-justify">{invoice?.notes}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-5 my-2">
        <button
          className="border rounded-md bg-slate-800 text-white py-1 px-2"
          onClick={downloadPDF}
        >
          PRINT
        </button>

        <button
          className="border rounded-md bg-slate-800 text-white  py-1 px-2"
          onClick={() => navigate("/invoice-list")}
        >
          BACK
        </button>
      </div>
    </div>
  );
}
