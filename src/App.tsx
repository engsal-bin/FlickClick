import "./css/index.css";

import { Route, Routes } from "react-router";

import { AuthProvider } from "./api/Auth";
import DetailEpisode from "./pages/DetailEpisode";
import DetailMovie from "./pages/DetailMovie";
import DetailSeason from "./pages/DetailSeason";
import DetailSeries from "./pages/DetailSeries";
import DetailSeriesNoSeason from "./pages/DetailSeriesNoSeason";
import Genres from "./pages/Genres";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Movies from "./pages/Movies";
import Mypage from "./pages/Mypage";
import NewUpdate from "./pages/NewUpdate";
import Popular from "./pages/Popular";
import RootLayout from "./layouts/RootLayout";
import Series from "./pages/Series";
import Trailers from "./components/common/Trailers";
import Upcomings from "./pages/Upcomings";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Main />} />
          {/* 메인 페이지 내 분류 */}
          <Route path="/popular" element={<Popular />} />
          <Route path="/newupdate" element={<NewUpdate />} />
          <Route path="/upcomings" element={<Upcomings />} />
          {/* 헤더 내 분류 */}
          <Route path="/series" element={<Series />} />
          <Route path="/movies" element={<Movies />} />

          <Route path="/genres" element={<Genres />} />
          {/* 로그인 페이지 */}
          <Route path="/login" element={<Login />} />
          {/* 마이페이지 */}
          <Route path="/mypage" element={<Mypage />} />

          {/* 상세 페이지 */}

          {/* 시리즈 상세페이지 - 시즌 유 */}
          <Route path="/detailseries/:seriesid" element={<DetailSeries />} />
          {/* 시리즈 상세페이지 - 시즌 무 */}
          <Route
            path="/detailseason-noseason/:id"
            element={<DetailSeriesNoSeason />}
          />
          {/* 시즌 상세페이지 */}
          <Route
            path="/detailseason/:seriesid/:seasonnumber"
            element={<DetailSeason />}
          />
          {/* 에피소드 상세페이지 */}
          <Route
            path="/detailepisode/:seriesid/:seasonnumber/:episodenumber"
            element={<DetailEpisode />}
          />

          {/* 영화 상세페이지 */}
          <Route path="/detailmovie" element={<DetailMovie />} />
          {/* 예고편 */}
          <Route path="/trailers" element={<Trailers />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
