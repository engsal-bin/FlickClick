import { supabase } from ".";

// 알림 가져오기
const getNotifications = async (userId: string) => {
  try {
    const data = await supabase
      .from("notification")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    return data;
  } catch (error) {
    throw error;
  }
};
// 알림 상태 변경
const patchNotificationStatus = async (id: number) => {
  const is_read = true;
  try {
    await supabase
      .from("notification")
      .update({ is_read })
      .eq("id", id)
      .select();
  } catch (error) {
    throw error;
  }
};

// 알림 삭제
const deleteNotification = async (id: number) => {
  try {
    await supabase.from("notification").delete().eq("id", id);
  } catch (error) {
    throw error;
  }
};

export const notificationAPI = {
  getNotifications,
  patchNotificationStatus,
  deleteNotification,
};
