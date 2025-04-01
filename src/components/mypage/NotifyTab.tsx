import { useEffect, useState } from "react";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";
import { supabase } from "../../api";
import Notify from "./Notify";

const NotifyTab = ({ userId }: { userId: string | undefined }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { language } = useLanguageStore();
  const t = menuTranslations[language];

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setNotifications(data);
      }
    };

    fetchNotifications();
  }, [userId]);

  console.log(notifications);

  if (notifications && notifications.length > 0) {
    return (
      <>
        {notifications.map((notification) => (
          <Notify
            key={notification.id}
            message={notification.message}
            is_read={notification.is_read}
          />
        ))}
      </>
    );
  }

  return <div>{t.noNotifications}</div>;
};

export default NotifyTab;
