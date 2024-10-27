import { createRoutesFromElements, Route } from "react-router-dom";
import OpenModule from "./open";
import PrivateModule from "./private";

export const mainRoutes = createRoutesFromElements(
  <>
    <Route path="private/*" element={<PrivateModule />} />
    <Route path="*" element={<OpenModule />} />
  </>
);
