import { twMerge } from "tailwind-merge";
import { notificationAPI } from "../../api/notification";
import { Link } from "react-router-dom";

export default function Notify({
  id,
  is_read,
  ip_name,
  ip_id,
}: {
  id: number;
  is_read?: boolean;
  ip_name: string;
  ip_id: string;
}) {
  const updateNotification = async () => {
    if (!is_read) {
      await notificationAPI.patchNotificationStatus(id);
    }
    return;
  };
  const deleteNotification = async () => {
    await notificationAPI.deleteNotification(id);
  };
  const message = `${ip_name} 토론에 댓글이 달렸습니다.`;
  const getRoutePath = () => {
    const slashCount = (ip_id.match(/\//g) || []).length;

    switch (slashCount) {
      case 1:
        return `/detailseason/${ip_id}`;
      case 2:
        return `/detailepisode/${ip_id}`;
      default:
        return `/detailmovie/${ip_id}`;
    }
  };
  return (
    <>
      {/* pc, tablet */}
      <div className="hidden tablet:flex  text-[20px] justify-between">
        <div className="flex gap-[20px] items-center">
          <span
            className={twMerge(
              `block w-[10px] h-[10px] rounded-[100%] ${
                is_read ? "bg-gray02" : "bg-main"
              }`
            )}
          ></span>
          <Link
            to={getRoutePath()}
            onClick={updateNotification}
            className={twMerge(is_read ? "text-gray02" : "text-white01")}
          >
            {message}
          </Link>
        </div>
        <button onClick={deleteNotification}>삭제</button>
      </div>
      {/* mobile */}
      <div className="tablet:hidden mobile:flex justify-between text-[16px]">
        <div className="flex items-center gap-[20px] ">
          <span
            className={twMerge(
              `block w-[10px] h-[10px] rounded-[100%] ${
                is_read ? "bg-gray02" : "bg-main"
              }`
            )}
          ></span>
          <button
            onClick={updateNotification}
            className={twMerge(is_read ? "text-gray02" : "text-white01")}
          >
            {message}
          </button>
        </div>
        <button onClick={deleteNotification}>삭제</button>
      </div>
    </>
  );
}
