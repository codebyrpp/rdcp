import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import {
  FORGOT_PASSWORD_ROUTE,
  LOGIN_ROUTE, PROJECT_ROUTE,
  PROJECT_SETTINGS_ROUTE, PROJECTS_ROUTE,
  FORM_SETTINGS_ROUTE,
  FORM_RESPONSES_ROUTE,
  FORM_RESPONSES_SUMMARY_ROUTE,
  VERIFY_OTP_ROUTE,
  FORM_EDIT_ROUTE
} from "./constants/routes";

import PageDashboard from "./pages/PageDashboard";
import PageLogin from "./pages/PageLogin";
import AppLayout from "./layouts/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import RootLayout from "./layouts/RootLayout";
import PageProject from "./pages/PageProject";
import PageProjectSettings from "./pages/PageProjectSettings";
import PageError from "./pages/PageError";
import PageFormSettings from "./pages/PageFormSettings";
import PageForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import PageVerfiyOTP from "./pages/ForgetPassword/OTPPage";
import PageFormResponses from "./pages/form_response/Page.tsx";
import FormResponseSummary from "./pages/response_summary/FormResponseSummary.tsx";
import BuilderLayout from "./components/builder/components/BuilderLayout.tsx";
import BuilderPage from "./components/builder/components/BuilderPage.tsx";
import BuilderError from "./components/builder/components/BuilderError.tsx";
import BuilderLoading from "./components/builder/components/BuilderLoading.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} errorElement={<PageError />}>
        <Route path="/" element={<PageLogin />} />
        <Route path={LOGIN_ROUTE} element={<PageLogin />} />
        <Route path={FORGOT_PASSWORD_ROUTE} element={<PageForgetPassword />} />
        <Route path={VERIFY_OTP_ROUTE} element={<PageVerfiyOTP />} />

        {/* TODO: Move route to Authenticated Routes  */}
        <Route 
            path={FORM_EDIT_ROUTE} 
            element={<BuilderLayout children={<BuilderPage />} />} 
            errorElement={<BuilderError error={new Error()} />} 
            loader={() => <BuilderLoading />}
        >
            <Route index element={<BuilderPage />} />
        </Route>
        
        {/* Authenticated Routes */}
        <Route element={<AppLayout />}>
            <Route path={PROJECTS_ROUTE} element={<PageDashboard />} />
            <Route path={PROJECT_ROUTE} element={<PageProject />} />
            <Route path={PROJECT_SETTINGS_ROUTE} element={<PageProjectSettings />} />
            <Route path={FORM_SETTINGS_ROUTE} element={<PageFormSettings />} />
            <Route path={FORM_RESPONSES_ROUTE} element={<PageFormResponses />} />
            <Route path={FORM_RESPONSES_SUMMARY_ROUTE} element={<FormResponseSummary />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

export default router;
