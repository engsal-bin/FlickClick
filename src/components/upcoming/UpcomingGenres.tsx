import UpcomingGenre from "./UpcomingGenre";

export default function UpcomingFooterGenres({ genres }: { genres: string[] }) {
  return (
    <div className="text-gray03  h-[17px] flex">
      {genres.map((genre, index) => (
        <UpcomingGenre genre={genre} key={index} />
      ))}
    </div>
  );
}
