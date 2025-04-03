import { useEffect, useState } from "react";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";
import { supabase } from "../../api";
import Notify from "./Notify";
import { notificationAPI } from "../../api/notification";

const NotifyTab = ({ userId }: { userId: string | undefined }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { language } = useLanguageStore();
  const t = menuTranslations[language];

  const fetchNotifications = async () => {
    const { data } = await notificationAPI.getNotifications(userId!);
    setNotifications(data!);
  };

  const fetchNotifications = async () => {
    const { data } = await notificationAPI.getNotifications(userId!);
    setNotifications(data!);
  };

  useEffect(() => {
    fetchNotifications();
    const notificationSubscription = supabase
      .channel("notification")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notification" },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();
    return () => {
      notificationSubscription.unsubscribe();
    };
  }, [userId]);

  if (notifications && notifications.length > 0) {
    return (
      <>
        {notifications.map((notification) => (
          <Notify
            key={notification.id}
            id={notification.id}
            is_read={notification.is_read}
            ip_name={notification.ip_name}
            ip_id={notification.ip_id}
          />
        ))}
      </>
    );
  }

  return <div>{t.noNotifications}</div>;
};

export default NotifyTab;
