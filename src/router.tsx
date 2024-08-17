import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import PageDashboard from "./pages/PageDashboard";
import PageLogin from "./pages/PageLogin";
import AppLayout from "./layouts/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<RootLayout/>} errorElement={<PageNotFound/>}>
        <Route path="/login" element={<PageLogin/>}/>
        <Route element={<AppLayout/>}>
            <Route path="/projects" element={<PageDashboard />} />
        </Route>
    </Route>
));

export default router;