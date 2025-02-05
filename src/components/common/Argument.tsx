
import sendIcon from "../../assets/icon/send.svg"
import arrowRight from "../../assets/icon/arrow/arrowRight.svg"
import arrowBottom from "../../assets/icon/arrow/arrowBottom.svg"
import { useState } from "react"
export default function Argument() {
  const [isArgumentToggleOpen, setIsArgumentToggleOpen] = useState(false)
  return (
    <div>
        <div className="flex justify-between mb-[30px] tablet:px-[30px] mobile:px-[10px] items-center tablet:h-[86px] mobile:h-[59px] border border-gray02 rounded-[10px]">
            <input type="text" placeholder="토론 주제를 입력하세요" className="bg-black tablet:text-[20px] mobile:text-[16px] placeholder:text-gray03"/>
            <button>
                <img src={sendIcon} alt="입력 전송 버튼" className="tablet:w-[26px] mobile:w-[16px]"/>
            </button>
        </div>
        {/* 토론리스트 */}
        <div className="flex flex-col gap-[20px] tablet:px-[20px] tablet:py-[30px] mobile:px-[10px] mobile:py-[20px] rounded-[10px] shadow-sm shadow-white01">
                {/* 토론 */}
                <div className="h-auto flex justify-between tablet:flex-row mobile:flex-col tablet:gap-[20px] mobile:gap-[10px]">
                    <div className="h-auto flex items-center">
                        <img src="" className="bg-white h-[45px] aspect-square rounded-full"/>
                        <p className="text-white01 text-bold text-[18px] ml-[13px]">조금 긴 토론 주제입니다</p>
                    </div>
                    <div className="text-gray03 flex items-center gap-[30px] mobile:justify-between">
                        {!isArgumentToggleOpen && (<><p className="mobile:hidden">3</p>
                        <div>
                            <p>2025-01-09, 오전 03:26</p>
                            <p>작성자: <span>예빈</span></p>
                        </div></>)}
                        <button onClick={() => setIsArgumentToggleOpen(!isArgumentToggleOpen)}>
                            <img src={isArgumentToggleOpen ? arrowBottom : arrowRight} alt="토론 펼치기 버튼" />
                        </button>
                    </div>
                </div>
                {/* 토론의 댓글 */}
                {isArgumentToggleOpen && (<div>
                    <hr className="border border-gray03 mb-[30px]"/>
                    <div className="tablet:px-[20px] mobile:px-[5px] flex flex-col tablet:gap-[30px] mobile:gap-[20px]">
                        <div className="h-auto flex flex-col tablet:gap-[20px] mobile:gap-[10px]">
                            {/* 타인의 의견 */}
                            <div className="min-h-[77px w-full flex">
                                <div className="desktop:max-w-[894px] tablet:max-w-[558px] bg-gray01 rounded-[10px] w-auto h-full flex jutify-between items-center px-[20px] py-[15px]">
                                    <img src="" className="bg-white h-[45px] aspect-square rounded-full"/>
                                    <div className="ml-[15px]">
                                        <p className="text-white01 tablet:text-[18px] mobile:text-[14px] font-bold">남이 어쩌구 어쩌구 의견 어쩌구 달아아하항앙dekekfkddjeejjjjj어ㅓ헣어ㅏ홈아ㅓㄴ화ㅓㄷ고 ㅣ솓시ㅕ폳지ㅓㅏ솓조깆ㄷㅎ셔ㅑㄷㅈㅎ시ㅗㅈㄷ시ㅓㅏㅚㅏㅓ봎다ㅣㅓ</p>
                                        <p className="tablet:text-[14px] mobile:text-[12px]"><span className="text-white02 mr-[10px]">예빈</span><span className="text-white03">2025-01-10</span></p>
                                    </div>
                                </div>
                            </div>
                            {/* 나의 의견 */}
                            <div className="min-h-[77px] flex w-full justify-end">
                                <div className="desktop:max-w-[894px] tablet:max-w-[558px] bg-main30 text-black01 rounded-[10px] w-auto h-full flex jutify-between items-center px-[20px] py-[15px]">
                                    <img src="" className="bg-white h-[45px] aspect-square rounded-full"/>
                                    <div className="ml-[15px]">
                                        <p className="tablet:text-[18px] mobile:text-[14px] font-bold">내가 어쩌구 저꾸자아후 삐리빠리 뽕뽕 어쩌구 어쩌구 의견 어쩌구 달아아하항앙</p>
                                        <p className="tablet:text-[14px] mobile:text-[12px]"><span className="mr-[10px]">예빈</span><span>2025-01-10</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between tablet:px-[30px] mobile:px-[10px] items-center tablet:h-[86px] mobile:h-[59px] border border-gray02 rounded-[10px]">
                            <input type="text" placeholder="의견를 입력하세요" className="bg-black tablet:text-[20px] mobile:text-[16px] placeholder:text-gray03"/>
                            <button>
                                <img src={sendIcon} alt="입력 전송 버튼" className="tablet:w-[26px] mobile:w-[16px]"/>
                            </button>
                        </div>
                    </div>
                </div>)}
        </div>
    </div>
  )
}
