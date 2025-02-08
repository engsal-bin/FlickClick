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
import DetailEpisode from "./pages/DetailEpisode";
import DetailSeason from "./pages/DetailSeason";
import DetailSeriesNoSeason from "./pages/DetailSeriesNoSeason";
import DetailMovie from "./pages/DetailMovie";
import Trailers from "./components/common/Trailers";
import TrailerModal from "./components/common/TrailerModal";

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

          {/* 시리즈 상세페이지 - 시즌 유 */}
          <Route path="/detailseries" element={<DetailSeries />} />
          {/* 시리즈 상세페이지 - 시즌 무 */}
          <Route
            path="/detailseason-noseason"
            element={<DetailSeriesNoSeason />}
          />
          {/* 시즌 상세페이지 */}
          <Route path="/detailseason" element={<DetailSeason />} />
          {/* 에피소드 상세페이지 */}
          <Route path="/detailepisode" element={<DetailEpisode />} />

          {/* 영화 상세페이지 */}
          <Route path="/detailmovie" element={<DetailMovie />} />
          {/* 예고편 */}
          <Route path="/trailers" element={<Trailers />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
