import { useEffect } from "react"

export default function GridContents({series}: {series: TvShow[]}) {
  useEffect(() => {
    console.log("필터링된 시리즈",series);
  }, [series]);
  return (
    <div>GridContents</div>
  )
}
