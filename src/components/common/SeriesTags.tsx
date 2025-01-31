import { useEffect, useState } from "react";
import Tag from "./Tag";

interface GenreType {
  id: number;
  name: string;
}

export default function Tags({ children }: { children: string }) {
  const [tags, setTags] = useState<GenreType[]>([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjViMmU0YjNkNWJiOWEwNTViN2NmZWY3Y2IyMzIxYSIsIm5iZiI6MTczMzI5MTI1My4yNTIsInN1YiI6IjY3NGZlY2Y1ZmI3Mjk4YzExYTIxNjQ5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4xuEswm8yzNzpTr1TJDqE-HyLrl9Xfh3GWbMTao5qRI",
    },
  };

  fetch("https://api.themoviedb.org/3/genre/tv/list?language=ko", options)
    .then((response) => response.json())
    .then((data) => setTags(data.genres))
    .catch((err) => console.error(err));

  useEffect(() => {}, []);
  return (
    <>
      {/* pc, tablet */}
      <div className="hidden tablet:block w-full px-[50px]">
        <p className="text-white01 font-bold text-[24px] mb-[30px]">
          {children}
        </p>
        <div className="flex flex-wrap gap-[10px]">
          {tags.map((tag) => (
            <Tag key={tag.id}>{tag.name}</Tag>
          ))}
        </div>
      </div>
      {/* mobile */}
      <div className="tablet:hidden mobile:px-[10px] w-full">
        <p className="text-white01 font-bold text-[18px] mb-[30px]">
          {children}
        </p>
        <div className="flex flex-wrap gap-[10px]">
          {tags.map((tag) => (
            <Tag key={tag.id}>{tag.name}</Tag>
          ))}
        </div>
      </div>
    </>
  );
}
