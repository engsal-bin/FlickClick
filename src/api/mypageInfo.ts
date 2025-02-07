import { supabase } from "./index.ts";

interface SupabaseResponse<T> {
    data: T | null;
    error: any;
  }// 회원별 리뷰


export const getReviewsByUId = async (
  userId: string
): Promise<Review[] | null> => {
  const { data, error }: SupabaseResponse<Review[]> = await supabase.rpc(
    "get_reviews_by_user_id",
    {
      user_id: userId,
    }
  );

  if (error) {
    console.error("Error fetching reviews:", error);
    return null;
  }
  return data;
};

// 회원별 토론

export const getArgumentsCreatedByUserId = async (
  userId: string
): Promise<Argument[] | null> => {
  const { data, error }: SupabaseResponse<Argument[]> = await supabase.rpc(
    "get_arguments_created_by_user_id",
    { user_id: userId }
  );
  if (error) {
    console.error("Error fetching arguments:", error);
    return null;
  }
  return data;
};

// 회원별 토론 댓글
export const getArgumentsCommentedByUId = async (
  userId: string
): Promise<ArgumentComment[] | null> => {
  const { data, error }: SupabaseResponse<ArgumentComment[]> =
    await supabase.rpc("get_arguments_commented_by_user_id", {
      user_id: userId,
    });
  if (error) {
    console.error("Error fetching arguments:", error);
    return null;
  }
  return data;
};

// 회원별 스크랩된 게시물

export const getClipsByUId = async (
  userId: string
): Promise<SavedClips[] | null> => {
  const { data, error }: SupabaseResponse<SavedClips[]> = await supabase.rpc(
    "get_clip_by_user_id",
    {
      user_id: userId,
    }
  );

  if (error) {
    console.error("Error calling RPC:", error);
    return null;
  }

  return data;
};

// 회원 리뷰수
export const getReviewCountByUId = async (
  userId: string
): Promise<number | null> => {
  // 데이터와 에러의 타입을 정확히 정의
  const { data, error }: { data: number | null; error: any } =
    await supabase.rpc("get_review_count_by_user_id", {
      user_id: userId,
    });

  // 에러가 있을 경우 콘솔에 출력하고 null 반환
  if (error) {
    console.error("Error calling RPC:", error);
    return null;
  }

  // 정상적인 경우 데이터 반환
  return data;
};

// 회원 토론수
export const getArgumentCountByUId = async (
  userId: string
): Promise<number | null> => {
  const { data, error }: { data: number | null; error: any } =
    await supabase.rpc("get_argument_count_by_user_id", {
      user_id: userId,
    });

  if (error) {
    console.error("Error calling RPC:", error);
    return null;
  }

  return data;
};

// 회원 클립수
export const getClipCountByUId = async (
  userId: string
): Promise<number | null> => {
  const { data, error }: { data: number | null; error: any } =
    await supabase.rpc("get_clip_count_by_user_id", { user_id: userId });

  if (error) {
    console.error("Error calling RPC:", error);
    return null;
  }

  return data;
};
