import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../api"; // supabase 경로 맞춰줘야 함

// 유저 정보 타입
interface User {
  id: string;
  email: string;
  profile: string;
  name: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  setIsLoggedin: (status: boolean) => void;
}

const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
  user: null,
  setUser: () => {},
  setIsLoggedin: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // 최초 마운트 시 유저 세션 가져오기
  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("세션 가져오기 실패:", error);
        return;
      }
      if (data?.session?.user) {
        const userInfo = data.session.user;
        setUser({
          id: userInfo.id,
          email: userInfo.email ?? "",
          profile: userInfo.user_metadata?.avatar_url,
          name: userInfo.user_metadata?.name,
        });
        setIsLoggedIn(true);
      }
    };

    fetchSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, setUser, setIsLoggedin: setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
