import {
  getArgumentsCommentedByUId,
  getArgumentsCreatedByUserId,
} from "../../api/mypageInfo";
import { useEffect, useState } from "react";
import { useLanguageStore } from "../../store/useLanguageStore";
import { menuTranslations } from "../../translations/menu";
import CreatedDiscuss from "./CreatedDiscuss";
import MyOpinion from "./MyOpinion";
import Tag from "../common/Tag";
import TagWithnotCancelIcon from "../common/TagWithnotCancelIcon";

const DiscussTab = ({ userId }: { userId: string | undefined }) => {
  const [discussType, setDiscussType] = useState("createdDiscuss");
  const [discusses, setDiscusses] = useState<Argument[] | null>([]);
  const [myOpinions, setMyOpinions] = useState<ArgumentComment[] | null>([]);
  const { language } = useLanguageStore();
  const t = menuTranslations[language];

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
        <TagWithnotCancelIcon
          onClick={() => setDiscussType("createdDiscuss")}
          isSelected={discussType === "createdDiscuss"}
        >
          {t.generatedDiscussion}
        </TagWithnotCancelIcon>
        <TagWithnotCancelIcon
          onClick={() => setDiscussType("myOpinion")}
          isSelected={discussType === "myOpinion"}
        >
          {t.myOpinion}
        </TagWithnotCancelIcon>
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
