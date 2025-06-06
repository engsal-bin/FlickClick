import CreatedDiscussContent from "./CreatedDiscussContent";

export default function CreatedDiscuss({
  discusses,
}: {
  discusses: Argument[] | null;
}) {
  return (
    <div className="flex flex-col gap-5">
      {discusses?.map((discuss) => (
        <CreatedDiscussContent
          key={discuss.argument_id}
          topic={discuss.topic}
          ip_name={discuss.ip_name}
          ip_id={discuss.ip_id}
          created_at={discuss.created_at}
        />
      ))}
    </div>
  );
}
