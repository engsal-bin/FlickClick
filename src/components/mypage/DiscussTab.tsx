import { Argument, ArgumentComment } from "../../type/mypageType";
import {
  getArgumentsCommentedByUId,
  getArgumentsCreatedByUserId,
} from "../../api/mypageInfo";
import { useEffect, useState } from "react";

import CreatedDiscuss from "./CreatedDiscuss";
import MyOpinion from "./MyOpinion";
import Tag from "../common/Tag";

const DiscussTab = ({ userId }: { userId: string | undefined }) => {
  const [discussType, setDiscussType] = useState("createdDiscuss");
  const [discusses, setDiscusses] = useState<Argument[] | null>([]);
  const [myOpinions, setMyOpinions] = useState<ArgumentComment[] | null>([]);

  useEffect(() => {
    if (!userId) return;

    if (discussType === "createdDiscuss") {
      const fetchDiscusses = async () => {
        const discussesData = await getArgumentsCreatedByUserId(userId);
        setDiscusses(discussesData || []);
      };
      fetchDiscusses();
    } else if (discussType === "myOpinion") {
      const fetchOpinions = async () => {
        const opinions = await getArgumentsCommentedByUId(userId);
        setMyOpinions(opinions || []);
      };
      fetchOpinions();
    }
  }, [discussType, userId]);

  return (
    <div>
      <div className="flex gap-[10px]">
        <Tag
          onClick={() => setDiscussType("createdDiscuss")}
          isSelected={discussType === "createdDiscuss"}
        >
          생성한 토론
        </Tag>
        <Tag
          onClick={() => setDiscussType("myOpinion")}
          isSelected={discussType === "myOpinion"}
        >
          내 의견
        </Tag>
      </div>
      <div className="mt-[30px]">
        {discussType === "createdDiscuss" && (
          <CreatedDiscuss discusses={discusses} />
        )}
        {discussType === "myOpinion" && <MyOpinion myOpinions={myOpinions} />}
      </div>
    </div>
  );
};

export default DiscussTab;
