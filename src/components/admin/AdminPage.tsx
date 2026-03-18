import { useState } from "react";
import styles from "./AdminPage.module.css";

type Category = "destination" | "book" | "beer" | "jersey" | "team";

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "destination", label: "🌍 Destination" },
  { key: "book", label: "📚 Book" },
  { key: "beer", label: "🍺 Beer" },
  { key: "jersey", label: "⚽ Jersey" },
  { key: "team", label: "🏟️ Team" },
];

const FILE_HINTS: Record<Category, string> = {
  destination: "src/data/destinations.json",
  book: "src/components/books/ReadingList.tsx → BOOKS array",
  beer: "src/data/favoriteBeers.ts → favoriteBeers array",
  jersey: "src/data/favoriteJerseys.ts → favoriteJerseys array",
  team: "src/components/schedules/Schedules.tsx → TEAMS array",
};

interface AdminPageProps {
  onBack: () => void;
}

export default function AdminPage({ onBack }: AdminPageProps) {
  const [category, setCategory] = useState<Category>("destination");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // destination fields
  const [destName, setDestName] = useState("");
  const [destCategory, setDestCategory] = useState("travel");
  const [destLat, setDestLat] = useState("");
  const [destLng, setDestLng] = useState("");
  const [destDescription, setDestDescription] = useState("");
  const [destImages, setDestImages] = useState("");

  // book fields
  const [bookDate, setBookDate] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookNote, setBookNote] = useState("");

  // beer / jersey fields (FavoriteItem)
  const [favImage, setFavImage] = useState("");
  const [favTitle, setFavTitle] = useState("");
  const [favDescription, setFavDescription] = useState("");
  const [favDetails, setFavDetails] = useState<
    { key: string; value: string }[]
  >([{ key: "", value: "" }]);

  // team fields
  const [teamName, setTeamName] = useState("");
  const [teamEmoji, setTeamEmoji] = useState("");
  const [teamLeague, setTeamLeague] = useState("");
  const [teamUrl, setTeamUrl] = useState("");

  const resetFields = () => {
    setOutput("");
    setCopied(false);
    setDestName("");
    setDestCategory("travel");
    setDestLat("");
    setDestLng("");
    setDestDescription("");
    setDestImages("");
    setBookDate("");
    setBookTitle("");
    setBookAuthor("");
    setBookNote("");
    setFavImage("");
    setFavTitle("");
    setFavDescription("");
    setFavDetails([{ key: "", value: "" }]);
    setTeamName("");
    setTeamEmoji("");
    setTeamLeague("");
    setTeamUrl("");
  };

  const handleCategoryChange = (c: Category) => {
    setCategory(c);
    resetFields();
  };

  const generate = () => {
    let snippet = "";

    switch (category) {
      case "destination": {
        const obj: Record<string, unknown> = {
          id: "/* next id */",
          name: destName,
          category: destCategory,
          lat: Number(destLat),
          lng: Number(destLng),
        };
        if (destDescription) obj.description = destDescription;
        if (destImages.trim())
          obj.images = destImages.split(",").map((s) => s.trim());
        snippet = JSON.stringify(obj, null, 2).replace(
          '"/* next id */"',
          "/* next id */",
        );
        break;
      }
      case "book": {
        const obj: Record<string, string> = {
          date: bookDate,
          title: bookTitle,
          author: bookAuthor,
        };
        if (bookNote) obj.note = bookNote;
        snippet = JSON.stringify(obj, null, 2);
        // convert to TS object literal style
        snippet = snippet.replace(/"(\w+)":/g, "$1:").replace(/"/g, "'");
        break;
      }
      case "beer":
      case "jersey": {
        const details: Record<string, string> = {};
        favDetails.forEach((d) => {
          if (d.key && d.value) details[d.key] = d.value;
        });
        const obj: Record<string, unknown> = {
          image: favImage || "/images/favorites/placeholder.png",
          title: favTitle,
          description: favDescription,
        };
        if (Object.keys(details).length > 0) obj.details = details;
        snippet = JSON.stringify(obj, null, 2);
        snippet = snippet.replace(/"(\w+)":/g, "$1:").replace(/"/g, "'");
        break;
      }
      case "team": {
        const obj = {
          name: teamName,
          emoji: teamEmoji,
          league: teamLeague,
          scheduleUrl: teamUrl,
        };
        snippet = JSON.stringify(obj, null, 2);
        snippet = snippet.replace(/"(\w+)":/g, "$1:").replace(/"/g, "'");
        break;
      }
    }

    setOutput(snippet);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>
        ← Back
      </button>
      <h1 className={styles.pageTitle}>Add New Record</h1>

      <div className={styles.categoryPicker}>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            className={
              category === c.key ? styles.categoryBtnActive : styles.categoryBtn
            }
            onClick={() => handleCategoryChange(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          generate();
        }}
      >
        {category === "destination" && (
          <DestinationFields
            name={destName}
            setName={setDestName}
            cat={destCategory}
            setCat={setDestCategory}
            lat={destLat}
            setLat={setDestLat}
            lng={destLng}
            setLng={setDestLng}
            description={destDescription}
            setDescription={setDestDescription}
            images={destImages}
            setImages={setDestImages}
          />
        )}
        {category === "book" && (
          <BookFields
            date={bookDate}
            setDate={setBookDate}
            title={bookTitle}
            setTitle={setBookTitle}
            author={bookAuthor}
            setAuthor={setBookAuthor}
            note={bookNote}
            setNote={setBookNote}
          />
        )}
        {(category === "beer" || category === "jersey") && (
          <FavoriteFields
            image={favImage}
            setImage={setFavImage}
            title={favTitle}
            setTitle={setFavTitle}
            description={favDescription}
            setDescription={setFavDescription}
            details={favDetails}
            setDetails={setFavDetails}
          />
        )}
        {category === "team" && (
          <TeamFields
            name={teamName}
            setName={setTeamName}
            emoji={teamEmoji}
            setEmoji={setTeamEmoji}
            league={teamLeague}
            setLeague={setTeamLeague}
            url={teamUrl}
            setUrl={setTeamUrl}
          />
        )}

        <button type="submit" className={styles.generateBtn}>
          Generate Snippet
        </button>
      </form>

      {output && (
        <div className={styles.outputSection}>
          <p className={styles.outputLabel}>Copy this into the data file:</p>
          <pre className={styles.outputPre}>{output}</pre>
          <p className={styles.fileHint}>File: {FILE_HINTS[category]}</p>
          <button className={styles.copyBtn} onClick={copyToClipboard}>
            {copied ? "✓ Copied" : "Copy to clipboard"}
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Field sub-components ---------- */

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

function DestinationFields({
  name,
  setName,
  cat,
  setCat,
  lat,
  setLat,
  lng,
  setLng,
  description,
  setDescription,
  images,
  setImages,
}: {
  name: string;
  setName: (v: string) => void;
  cat: string;
  setCat: (v: string) => void;
  lat: string;
  setLat: (v: string) => void;
  lng: string;
  setLng: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  images: string;
  setImages: (v: string) => void;
}) {
  return (
    <>
      <Field
        label="Name"
        value={name}
        onChange={setName}
        required
        placeholder="e.g. Inverness"
      />
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Category</label>
        <select
          className={styles.input}
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        >
          <option value="travel">travel</option>
          <option value="coffee">coffee</option>
        </select>
      </div>
      <Field
        label="Latitude"
        value={lat}
        onChange={setLat}
        type="number"
        required
        placeholder="57.474"
      />
      <Field
        label="Longitude"
        value={lng}
        onChange={setLng}
        type="number"
        required
        placeholder="-4.226"
      />
      <Field
        label="Description (optional)"
        value={description}
        onChange={setDescription}
        placeholder="The Scottish Highlands"
      />
      <Field
        label="Images (comma-separated paths, optional)"
        value={images}
        onChange={setImages}
        placeholder="/images/destinations/photo1.jpg, /images/destinations/photo2.jpg"
      />
    </>
  );
}

function BookFields({
  date,
  setDate,
  title,
  setTitle,
  author,
  setAuthor,
  note,
  setNote,
}: {
  date: string;
  setDate: (v: string) => void;
  title: string;
  setTitle: (v: string) => void;
  author: string;
  setAuthor: (v: string) => void;
  note: string;
  setNote: (v: string) => void;
}) {
  return (
    <>
      <Field
        label="Date"
        value={date}
        onChange={setDate}
        required
        placeholder="March 2026"
      />
      <Field
        label="Title"
        value={title}
        onChange={setTitle}
        required
        placeholder="Project Hail Mary"
      />
      <Field
        label="Author"
        value={author}
        onChange={setAuthor}
        required
        placeholder="Andy Weir"
      />
      <Field
        label="Note (optional)"
        value={note}
        onChange={setNote}
        placeholder="didn't finish"
      />
    </>
  );
}

function FavoriteFields({
  image,
  setImage,
  title,
  setTitle,
  description,
  setDescription,
  details,
  setDetails,
}: {
  image: string;
  setImage: (v: string) => void;
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  details: { key: string; value: string }[];
  setDetails: (v: { key: string; value: string }[]) => void;
}) {
  const updateDetail = (idx: number, field: "key" | "value", val: string) => {
    const next = [...details];
    next[idx] = { ...next[idx], [field]: val };
    setDetails(next);
  };
  const addDetail = () => setDetails([...details, { key: "", value: "" }]);
  const removeDetail = (idx: number) =>
    setDetails(details.filter((_, i) => i !== idx));

  return (
    <>
      <Field
        label="Image path"
        value={image}
        onChange={setImage}
        placeholder="/images/favorites/beer-placeholder.png"
      />
      <Field
        label="Title"
        value={title}
        onChange={setTitle}
        required
        placeholder="Heady Topper"
      />
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Description</label>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A world-class American Double IPA..."
          required
        />
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Details (key/value pairs)</label>
        <div className={styles.detailFields}>
          {details.map((d, i) => (
            <div key={i} className={styles.detailRow}>
              <input
                className={styles.input}
                placeholder="Key (e.g. Style)"
                value={d.key}
                onChange={(e) => updateDetail(i, "key", e.target.value)}
              />
              <input
                className={styles.input}
                placeholder="Value (e.g. Double IPA)"
                value={d.value}
                onChange={(e) => updateDetail(i, "value", e.target.value)}
              />
              {details.length > 1 && (
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeDetail(i)}
                  aria-label="Remove detail"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className={styles.addDetailBtn}
            onClick={addDetail}
          >
            + Add detail
          </button>
        </div>
      </div>
    </>
  );
}

function TeamFields({
  name,
  setName,
  emoji,
  setEmoji,
  league,
  setLeague,
  url,
  setUrl,
}: {
  name: string;
  setName: (v: string) => void;
  emoji: string;
  setEmoji: (v: string) => void;
  league: string;
  setLeague: (v: string) => void;
  url: string;
  setUrl: (v: string) => void;
}) {
  return (
    <>
      <Field
        label="Team Name"
        value={name}
        onChange={setName}
        required
        placeholder="Cleveland Guardians"
      />
      <Field
        label="Emoji"
        value={emoji}
        onChange={setEmoji}
        required
        placeholder="⚾"
      />
      <Field
        label="League"
        value={league}
        onChange={setLeague}
        required
        placeholder="MLB"
      />
      <Field
        label="Schedule URL"
        value={url}
        onChange={setUrl}
        required
        placeholder="https://www.espn.com/mlb/team/schedule/_/name/cle"
      />
    </>
  );
}
