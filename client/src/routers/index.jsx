import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import CreateInvoice from "../views/CreateInvoice";
import InvoiceList from "../views/InvoiceList";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      { path: "/", element: <h1>Home</h1> },
      { path: "/create", element: <CreateInvoice /> },
      { path: "/invoice-list", element: <InvoiceList /> },
    ],
  },
]);

export default router;
