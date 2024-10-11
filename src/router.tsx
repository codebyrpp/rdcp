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
  FORM_EDIT_ROUTE,
  FORM_VIEW_ROUTE,
  REGISTER_ROUTE
} from "./constants/routes";

import PageDashboard from "./pages/PageDashboard";
import PageLogin from "./pages/PageLogin";
import AppLayout from "./layouts/AppLayout";
import RootLayout from "./layouts/RootLayout";
import PageProject from "./pages/PageProject";
import PageProjectSettings from "./pages/PageProjectSettings";
import PageFormSettings from "./pages/PageFormSettings";
import PageForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import PageAccountSetup from "./pages/ForgetPassword/OTPPage";
import BuilderLayout from "./pages/form_builder/BuilderLayout.tsx";
import BuilderError from "./pages/form_builder/BuilderError.tsx";
import BuilderLoading from "./pages/form_builder/BuilderLoading.tsx";
import BuilderPage from "./pages/form_builder/BuilderPage.tsx";
import FormLayout from "./layouts/FormLayout.tsx";
import PageForm from "./pages/PageForm.tsx";
import AuthGuard from "./layouts/AuthGuard.tsx";
import { PageError, PageNotFound, PageUnAuthorized } from "./pages/PageError.tsx";
import { PageResponses } from "./pages/PageReponses.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} errorElement={<PageError />}>
      <Route path="/" element={<PageLogin />} />
      <Route path={LOGIN_ROUTE} element={<PageLogin />} />
      <Route path={FORGOT_PASSWORD_ROUTE} element={<PageForgetPassword />} />
      <Route path={VERIFY_OTP_ROUTE} element={<PageAccountSetup />} />
      <Route path={REGISTER_ROUTE} element={<PageAccountSetup />} />
      
      {/*  Form Submission View */}
      <Route element={<FormLayout />}>
        <Route path={FORM_VIEW_ROUTE} element={<PageForm />} />
      </Route>

      {/* Authenticated Routes */}
      <Route element={<AuthGuard />}>
        <Route element={<AppLayout />}>
          <Route path={PROJECTS_ROUTE} element={<PageDashboard />} />
          <Route path={PROJECT_ROUTE} element={<PageProject />} />
          <Route path={PROJECT_SETTINGS_ROUTE} element={<PageProjectSettings />} />
          <Route path={FORM_SETTINGS_ROUTE} element={<PageFormSettings />} />
          <Route path={FORM_RESPONSES_ROUTE} element={<PageResponses />} />
        </Route>
        {/* Form Builder */}
        <Route element={<FormLayout />}>
          <Route
            path={FORM_EDIT_ROUTE}
            element={<BuilderLayout children={<BuilderPage />} />}
            errorElement={<BuilderError error={new Error()} />}
            loader={() => <BuilderLoading />}
          >
            <Route index element={<BuilderPage />} />
          </Route>
          <Route path={FORM_VIEW_ROUTE} element={<PageForm />} />
        </Route>
      </Route>

      {/* Error pages */}
      <Route path="*" element={<PageNotFound />} />
      <Route path="/404" element={<PageNotFound/>}/>
      <Route path="/unauthorized" element={<PageUnAuthorized/>}/>
    </Route>
  )
);

export default router;
