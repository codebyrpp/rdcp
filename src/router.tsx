import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import PageDashboard from "./pages/PageDashboard";
import PageLogin from "./pages/PageLogin";
import AppLayout from "./layouts/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import RootLayout from "./layouts/RootLayout";
import PageForgetPassword from "./pages/PageForgetPassword";
import PageProject from "./pages/PageProject";
import PageProjectSettings from "./pages/PageProjectSettings";
import PageError from "./pages/PageError";
import PageFormSettings from "./pages/PageFormSettings";
import ForgetPasswordPage from "./pages/ForgetPassword/ForgetPassword";
import OTPPage from "./pages/ForgetPassword/OTPPage";

import {
  FORGOT_PASSWORD_ROUTE,
  FORM_SETTINGS_ROUTE,
  LOGIN_ROUTE,
  PROJECT_ROUTE,
  PROJECT_SETTINGS_ROUTE,
  PROJECTS_ROUTE,
} from "./constants/routes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} errorElement={<PageError />}>
      <Route path="/" element={<PageLogin />} />
      <Route path={LOGIN_ROUTE} element={<PageLogin />} />

      <Route path="/forgot-password" element={<ForgetPasswordPage />} />
      <Route path="/forgot-password/otp" element={<OTPPage />} />

      {/* <Route path={FORGOT_PASSWORD_ROUTE} element={<PageForgetPassword />} /> */}

      <Route element={<AppLayout />}>
        <Route path={PROJECTS_ROUTE} element={<PageDashboard />} />
        <Route path={PROJECT_ROUTE} element={<PageProject />} />
        <Route
          path={PROJECT_SETTINGS_ROUTE}
          element={<PageProjectSettings />}
        />
        <Route path={FORM_SETTINGS_ROUTE} element={<PageFormSettings />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

export default router;
