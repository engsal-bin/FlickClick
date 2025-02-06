interface TrailerProps {
  thumbnailUrl: string;
}

export default function Trailer({ thumbnailUrl }: TrailerProps) {
  return (
    <img
      src={thumbnailUrl}
      alt="Video Thumbnail"
      className="w-[400px] h-[225px] object-cover"
    />
  );
}
