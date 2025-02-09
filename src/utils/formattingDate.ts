export const formatDate = (originalDate: string | Date): string => {
  const date = new Date(originalDate);

  // 날짜 변환 (YYYY-MM-DD)
  const formattedDate = date.toISOString().split("T")[0];

  // 시간 변환 (오전/오후 hh:mm)
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedTime = new Intl.DateTimeFormat("ko-KR", options).format(date);

  return `${formattedDate}, ${formattedTime}`;
};

// 사용 예시
console.log(formatDate("2025-02-09T06:56:25.916557+00:00"));
// 출력 예시: 2025-02-09, 오후 03:26
