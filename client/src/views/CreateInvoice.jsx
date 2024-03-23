import axios from "axios";
import InvoiceCard from "./InvoiceCard";
import { useEffect, useState } from "react";
import { formatDateJS } from "../helpers/formatDate";
import { SERVER_URL } from "../serverUrl";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateInvoice() {
  const navigate = useNavigate();

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    invoiceDate: new Date(),
    customerName: "",
    salesPersonName: "",
    notes: "",
  });

  const [invoiceId, setInvoiceId] = useState("");

  const createInvoice = async () => {
    const { data } = await axios.post(`${SERVER_URL}/invoices`);
    console.log(data);
    setInvoiceId(data.id);
    setInvoiceData({ ...invoiceData, invoiceNumber: data.id });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // console.log(event.target.invoiceNumber.value, " <<< invoiceNumber");
      console.log(event.target.invoiceDate.value, " <<< invoiceDate");
      console.log(event.target.customerName.value, " <<< customerName");
      console.log(event.target.salesPersonName.value, " <<< salesPersonName");
      console.log(event.target.notes.value, " <<< notes");

      await axios.put(`${SERVER_URL}/invoices/${invoiceId}`, invoiceData);
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: error.response.data.message[0],
      });
    }
  };

  if (!invoiceId) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <button
          onClick={createInvoice}
          className="py-1 px-2 border bg-slate-800 text-white rounded-md"
        >
          Create Invoice
        </button>
      </div>
    );
  }
  // useEffect(() => {
  //   createInvoice();
  // }, []);

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mb-5">Create Invoice</h1>
      <div className="justify-center flex">
        <form
          className="flex flex-col gap-5 border p-2"
          onSubmit={handleSubmit}
        >
          {/* <div className="flex gap-5">
            <label htmlFor="invoiceNumber" className="w-[180px]">
              Invoice Number
            </label>
            <input
              type="text"
              id="invoiceNumber"
              className="border"
              autoComplete="off"
              onChange={(event) => {
                setInvoiceData({
                  ...invoiceData,
                  invoiceNumber: event.target.value,
                });
              }}
            />
          </div> */}
          <div className="flex gap-5">
            <label htmlFor="invoiceDate" className="w-[180px]">
              Invoice Date
            </label>
            <input
              type="date"
              id="invoiceDate"
              className="border"
              autoComplete="off"
              value={formatDateJS(invoiceData.invoiceDate)}
              onChange={(event) => {
                setInvoiceData({
                  ...invoiceData,
                  invoiceDate: event.target.value,
                });
              }}
            />
          </div>
          <div className="flex gap-5">
            <label className="w-[180px]">Customer Name</label>
            <input
              type="text"
              className="border"
              id="customerName"
              autoComplete="off"
              onChange={(event) => {
                setInvoiceData({
                  ...invoiceData,
                  customerName: event.target.value,
                });
              }}
            />
          </div>
          <div className="flex gap-5">
            <label className="w-[180px]">Sales Person Name</label>
            <input
              type="text"
              className="border"
              id="salesPersonName"
              autoComplete="off"
              onChange={(event) => {
                setInvoiceData({
                  ...invoiceData,
                  salesPersonName: event.target.value,
                });
              }}
            />
          </div>
          <div className="flex gap-5">
            <label className="w-[180px]">Notes</label>
            <textarea
              className="border"
              id="notes"
              autoComplete="off"
              onChange={(event) => {
                setInvoiceData({
                  ...invoiceData,
                  notes: event.target.value,
                });
              }}
            ></textarea>
          </div>
          <button
            type="submit"
            className="border py-1 px-2 bg-slate-800 text-white rounded-md"
          >
            Create Invoice
          </button>
        </form>
        <InvoiceCard invoiceData={invoiceData} invoiceId={invoiceId} />
      </div>
      <div className="m-5" />
    </div>
  );
}
