import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import CreateInvoice from "../views/CreateInvoice";
import InvoiceList from "../views/InvoiceList";
import InvoiceDetail from "../views/InvoiceDetail";
import LandingPage from "../views/LandingPage";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/create", element: <CreateInvoice /> },
      { path: "/invoice-list", element: <InvoiceList /> },
      { path: "/invoice-detail/:invoiceId", element: <InvoiceDetail /> },
    ],
  },
]);

export default router;
