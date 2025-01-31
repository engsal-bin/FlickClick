import { twMerge } from "tailwind-merge";

export default function Notify({
  name,
  content,
  action,
  read,
}: {
  name: string;
  content: string;
  action: string;
  read: boolean;
}) {
  return (
    <>
      {/* pc, tablet */}
      <div className="hidden tablet:flex items-center gap-[20px] text-[20px]">
        <span
          className={twMerge(
            `block w-[10px] h-[10px] rounded-[100%] ${
              read ? "bg-gray02" : "bg-main"
            }`
          )}></span>
        <p className={twMerge(`${read ? "text-gray02" : "text-white01"}`)}>
          [{name}] 님이 내 {content}에 {action}을 남겼습니다.
        </p>
      </div>
      {/* mobile */}
      <div className="tablet:hidden mobile:flex items-center gap-[20px] text-[16px]">
        <span
          className={twMerge(
            `block w-[10px] h-[10px] rounded-[100%] ${
              read ? "bg-gray02" : "bg-main"
            }`
          )}></span>
        <p
          className={twMerge(
            `${read ? "text-gray02" : "text-white01"} truncate`
          )}>
          [{name}] 님이 내 {content}에 {action}을 남겼습니다.
        </p>
      </div>
    </>
  );
}
