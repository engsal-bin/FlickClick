import React from "react";
import "./css/index.css";
import { Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Main from "./pages/Main";
import Popular from "./pages/Popular";
import NewUpdate from "./pages/NewUpdate";
import Upcoming from "./pages/Upcoming";
import Series from "./pages/Series";
import Movies from "./pages/Movies";
import Genres from "./pages/Genres";
import Login from "./pages/Login";
import Mypage from "./pages/Mypage";
import { AuthProvider } from "./api/Auth";
import DetailSeries from "./pages/DetailSeries";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Main />} />
          {/* 메인 페이지 내 분류 */}
          <Route path="/popular" element={<Popular />} />
          <Route path="/newupdate" element={<NewUpdate />} />
          <Route path="/upcoming" element={<Upcoming />} />
          {/* 헤더 내 분류 */}
          <Route path="/series" element={<Series />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/genres" element={<Genres />} />
          {/* 로그인 페이지 */}
          <Route path="/login" element={<Login />} />
          {/* 마이페이지 */}
          <Route path="/mypage" element={<Mypage />} />
          {/* 상세 페이지 */}
          <Route path="/detailseries" element={<DetailSeries />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
