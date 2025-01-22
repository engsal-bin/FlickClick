import React, { createContext, useContext, useState, ReactNode } from "react";

// 로그인 상태를 저장하는 타입
interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedin: () => void;
}

// 기본값
const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
  setIsLoggedin: () => {},
};

// Context 생성
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Context 제공자 컴포넌트
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // 로그인 상태 변경 함수
  const setIsLoggedin = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Context 값 가져오기 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext);
