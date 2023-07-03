// GenreDropdown.tsx
import { useState } from "react";
import { InnerBox } from "../Util/BaseStyles";

interface Props {
  onChange: (genre: string) => void;
}

const availableGenres = [
  "Pop",
  "Rock",
  "Classical",
  "Jazz",
  "Blues",
  "Country",
  "Hip Hop",
  "R&B",
  "Reggae",
  "Electronic",
  "Dance",
  "Folk",
  "Funk",
  "Gospel",
  "Heavy Metal",
  "Indie",
  "Latin",
  "New Age",
  "Punk",
  "Rap",
  "Salsa",
  "Samba",
  "Soul",
  "Techno",
  "Trance",
  "World",
  "Alternative",
  "Ambient",
  "Baroque",
  "Celtic",
  "Disco",
  "Dubstep",
  "EDM (Electronic Dance Music)",
  "Grunge",
  "House",
  "K-Pop (Korean Pop)",
  "Motown",
  "Opera",
  "Psychedelic",
  "Reggaeton",
  "Anime",
  "Fantasy",
  "Epic",
  "J-pop",
  "J-rock",
]; // Add more as required

export default function GenreDropdown({ onChange }: Props) {
  const [selectedGenre, setSelectedGenre] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const genre = event.target.value;
    setSelectedGenre(genre);
    onChange(genre);
  }

  return (
    <InnerBox>
      <select value={selectedGenre} onChange={handleChange}>
        <option value="">Select a genre</option>
        {availableGenres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </InnerBox>
  );
}
