import MyOpinionContent from "./MyOpinionContent";

export default function MyOpinion({
  myOpinions,
}: {
  myOpinions: ArgumentComment[] | [] | null;
}) {
  return (
    <div>
      {myOpinions?.map((myOpinion) => (
        <MyOpinionContent
          key={myOpinion.argument_id}
          argument_id={myOpinion.argument_id}
          topic={myOpinion.topic}
          ip_name={myOpinion.ip_name}
          ip_type={myOpinion.ip_type}
          ip_id={myOpinion.ip_id}
          comment={myOpinion.comment}
          comment_created_at={myOpinion.comment_created_at}
          comment_author_id={myOpinion.comment_author_id}
        />
      ))}
    </div>
  );
}
