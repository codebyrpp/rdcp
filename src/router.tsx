import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import PageDashboard from "./pages/PageDashboard";
import PageLogin from "./pages/PageLogin";
import AppLayout from "./pages/response_summary/FormResponseSummary.tsx";
import PageNotFound from "./pages/PageNotFound";
import RootLayout from "./layouts/RootLayout";
import Page from "./pages/form_response/Page.tsx";
import FormResponseSummary from "./pages/response_summary/FormResponseSummary.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} errorElement={<PageNotFound />}>
      <Route path="/login" element={<PageLogin />} />
      <Route path="/response" element={<Page />} />
      <Route path="/summary" element={<FormResponseSummary />} />
      <Route element={<AppLayout />}>
        <Route path="/projects" element={<PageDashboard />} />
      </Route>
    </Route>
  )
);

export default router;
