import { supabase } from "./index.ts";

interface SupabaseResponse<T> {
  data: T | null;
  error: {
    code: string;
    details: string | null;
    hint: string | null;
    message: string | null;
  } | null;
}

// 회원별 리뷰
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
  const { data, error }: SupabaseResponse<number> = await supabase.rpc(
    "get_review_count_by_user_id",
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

// 회원 토론수
export const getArgumentCountByUId = async (
  userId: string
): Promise<number | null> => {
  const { data, error }: SupabaseResponse<number> = await supabase.rpc(
    "get_argument_count_by_user_id",
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

// 회원 클립수
export const getClipCountByUId = async (
  userId: string
): Promise<number | null> => {
  const { data, error }: SupabaseResponse<number> = await supabase.rpc(
    "get_clip_count_by_user_id",
    { user_id: userId }
  );

  if (error) {
    console.error("Error calling RPC:", error);
    return null;
  }

  return data;
};

// 컨텐츠 스크랩하기
export const postClippedData = async (
  ip_id: string,
  poster_path: string,
  owner_id: string,
  ip_name: string,
  summary: string,
  dataType: string
) => {
  try {
    if (dataType === "movie") {
      await supabase
        .from("clipped_movie")
        .insert([{ ip_id, poster_path, owner_id, ip_name, summary }]);
    }
    if (dataType === "season") {
      await supabase
        .from("clipped_season")
        .insert([{ ip_id, poster_path, owner_id, ip_name, summary }]);
    }
    if (dataType === "episode") {
      await supabase
        .from("clipped_episode")
        .insert([{ ip_id, poster_path, owner_id, ip_name, summary }]);
    }
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
};

// 스크랩 된 컨텐츠 제거하기
export const deleteClippedData = async (
  ip_id: string,
  owner_id: string,
  dataType: string
) => {
  try {
    if (dataType === "movie") {
      await supabase
        .from("clipped_movie")
        .delete()
        .eq("ip_id", ip_id)
        .eq("owner_id", owner_id);
    }
    if (dataType === "season") {
      await supabase
        .from("clipped_season")
        .delete()
        .eq("ip_id", ip_id)
        .eq("owner_id", owner_id);
    }
    if (dataType === "episode") {
      await supabase
        .from("clipped_episode")
        .delete()
        .eq("ip_id", ip_id)
        .eq("owner_id", owner_id);
    }
    console.log("스크랩이 성공적으로 삭제되었습니다.");
  } catch (error) {
    console.error("스크랩 삭제 중 오류 발생:", error);
  }
};
