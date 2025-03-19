import Argument from "./Argument";
import InputTextarea from "./InputTextarea";
export default function Arguments() {
  const argumentContens = [
    {
      id: "1",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit hic deleniti necessitatibus quam maxime eveniet nemo, ea natus tempora aspernatur impedit in consectetur voluptas, .",
      author: "김예빈",
      date: "2024.10.23,오전 03:26",
    },
    {
      id: "2",
      content:
        "이 영화 정말 재미있습니다! 다른 사람들도 꼭 봐야 할 영화인 것 같아요. 특별히 연출이 좋았어요.",
      author: "이철수",
      date: "2024.10.23,오전 03:26",
    },
  ];
  return (
    <div>
      <InputTextarea reviewOrArgumentOrOpinion={"argument"} />
      {/* 토론리스트 */}
      {argumentContens.map((argumentConten, index) => (
        <Argument argumentConten={argumentConten} key={index} />
      ))}
    </div>
  );
}
