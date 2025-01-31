export default function Tag({ children }: { children: string }) {
  return (
    <>
      {/* desktop, tablet */}
      <div className="desktop:flex tablet:flex mobile:hidden h-[30px] items-center px-[10px] border-[1px] border-white03 rounded-[10px] font-light text-white03">
        {children}
      </div>

      {/* mobile */}
      <div className="desktop:hidden tablet:hidden mobile:flex h-[24px] items-center px-[8px] border-[1px] border-white03 rounded-[8px] font-light text-[14px] text-white03">
        {children}
      </div>
    </>
  );
}
