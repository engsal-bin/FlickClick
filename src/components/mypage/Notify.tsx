import { twMerge } from "tailwind-merge";

export default function Notify({
  message,
  is_read,
}: {
  message?: string;
  is_read?: boolean;
}) {
  return (
    <>
      {/* pc, tablet */}
      <div className="hidden tablet:flex items-center gap-[20px] text-[20px]">
        <span
          className={twMerge(
            `block w-[10px] h-[10px] rounded-[100%] ${
              is_read ? "bg-gray02" : "bg-main"
            }`
          )}
        ></span>
        <p className={twMerge(`${is_read ? "text-gray02" : "text-white01"}`)}>
          {message}
        </p>
      </div>
      {/* mobile */}
      <div className="tablet:hidden mobile:flex items-center gap-[20px] text-[16px]">
        <span
          className={twMerge(
            `block w-[10px] h-[10px] rounded-[100%] ${
              is_read ? "bg-gray02" : "bg-main"
            }`
          )}
        ></span>
        <p
          className={twMerge(
            `${is_read ? "text-gray02" : "text-white01"} truncate`
          )}
        >
          {message}
        </p>
      </div>
    </>
  );
}
