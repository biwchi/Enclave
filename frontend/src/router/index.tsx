import Main from "@/views/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const RoutesRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  </BrowserRouter>
);

export const Router = RoutesRouter;
