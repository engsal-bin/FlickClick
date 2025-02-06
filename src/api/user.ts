import { supabase } from "./index.ts";
export const authAPI = {
  // GitHub 로그인
  async logInWithTwitter() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "twitter",
        options: {
          redirectTo: `${import.meta.env.VITE_SITE_URL}/home`,
        },
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Twitter 로그인 실패:", error);
      throw error;
    }
  },

  // Google 로그인
  async logInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${import.meta.env.VITE_SITE_URL}/home`,
        },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Google 로그인 실패:", error);
      throw error;
    }
  },

  // Kakao 로그인
  async logInWithKakao() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `${import.meta.env.VITE_SITE_URL}/home`,
        },
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("카카오 로그인 실패:", error);
      throw error;
    }
  },
  // 현재 로그인한 사용자 정보 조회
  async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) throw error;
      return user;
    } catch (error) {
      console.error("사용자 정보 조회 실패:", error);
      throw error;
    }
  },

  // 로그아웃
  async logOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("로그아웃 실패:", error);
      throw error;
    }
  },
};
