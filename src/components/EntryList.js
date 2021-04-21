import React, { useContext, useEffect, useState } from "react";
import { EntryContext } from "./EntryProvider";
import { Entry } from "./Entry";
import { MoodContext } from "./mood/MoodProvider";

export const EntryList = () => {
  const { entries, getEntries, searchEntries } = useContext(EntryContext);
  const { moods, getMoods } = useContext(MoodContext);
  const [filteredEntries, setEntries] = useState([]);
  const [searchedTerm, setTerm] = useState("");
  const [moodSelected, setMoodSelected] = useState("");

  useEffect(() => {
    getEntries()
      .then(getMoods)
  }, []);

  useEffect(() => {
    setEntries(entries)
  }, [entries])

  useEffect(() => {
    if (searchedTerm !== "") {
        searchEntries(searchedTerm)
    }
  }, [searchedTerm])


  const filterAllEntries = (event) => {
    const filteredEntriesByMood = entries.filter(entry => entry.mood_id === parseInt(event.target.value))
    setEntries(filteredEntriesByMood)
    setMoodSelected(parseInt(event.target.value))
  }


  return (
    <>
      <h1>Filter Entries</h1>

      {
        moods.map(mood => {
          return <>
            <input type="radio" key={mood.id} value={mood.id} name="mood_id" checked={moodSelected === mood.id}
              onChange={filterAllEntries}
            /> {mood.mood}
          </>
        })
      }

      <div >
        <button onClick={() => {
          setEntries(entries)
          setMoodSelected("")
        }}>Clear Filter</button>
      </div>

      <div>

        <input type="text" placeholder="Search" onKeyUp={
          (event) => {
            const searchTerm = event.target.value
            setTerm(searchTerm)
          }
        } />

      </div>

      <h1>Entries</h1>

      {/*
            Pseudo Code
            .filter(happyEntries => happyEntries.mood.label === "Happy")
        */}

      <div className="entries">
        {filteredEntries.map(entry => {
          return <Entry key={entry.id} entry={entry} />;
        })}
      </div>

    </>
  );
};
