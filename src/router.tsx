import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import PageDashboard from "./pages/PageDashboard";
import PageLogin from "./pages/PageLogin";
import AppLayout from "./layouts/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import RootLayout from "./layouts/RootLayout";

import BuilderLayout from "./components/builder/[id]/BuilderLayout";
import BuilderPage from "./components/builder/[id]/BuilderPage";
import BuilderError from "./components/builder/[id]/BuilderError";
import BuilderLoading from "./components/builder/[id]/BuilderLoading";

const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<RootLayout/>} errorElement={<PageNotFound/>}>
        <Route path="/login" element={<PageLogin/>}/>
        <Route element={<AppLayout/>}>
            <Route path="/projects" element={<PageDashboard />} />
        </Route>
        <Route 
            path="/builder/:id" 
            element={<BuilderLayout children={<BuilderPage />} />} 
            errorElement={<BuilderError error={new Error()} />} 
            loader={() => <BuilderLoading />}
        >
            <Route index element={<BuilderPage />} />
        </Route>
    </Route>
));

export default router;