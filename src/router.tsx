import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import PageDashboard from "./pages/PageDashboard";
import PageLogin from "./pages/PageLogin";
import AppLayout from "./layouts/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import RootLayout from "./layouts/RootLayout";
import PageForgetPassword from "./pages/PageForgetPassword";
import { FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE, PROJECT_ROUTE, PROJECTS_ROUTE } from "./constants/routes";
import PageProject from "./pages/PageProject";

const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<RootLayout/>} errorElement={<PageNotFound/>}>
        <Route path={LOGIN_ROUTE} element={<PageLogin/>}/>
        <Route path={FORGOT_PASSWORD_ROUTE} element={<PageForgetPassword/>}/>
        <Route element={<AppLayout/>}>
            <Route path={PROJECTS_ROUTE} element={<PageDashboard />} />
            <Route path={PROJECT_ROUTE} element={<PageProject />} />
        </Route>
    </Route>
));

export default router;