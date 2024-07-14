"use client";

import wordleValidWords from "../resources/wordle_valid_words.json";
import { useState } from "react";

export default function Root() {
  let [message, setMessage] = useState("dupa");

  function handleWord(e: any) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const word = formData.get("word")?.toString();

    if (word && wordleValidWords.includes(word)) {
      setMessage("Valid word.");
    } else {
      setMessage("Invalid word.");
    }
  }

  return <><p>{message}</p><form onSubmit={handleWord}><input name="word" type="text" className="bg-black"/><button type="submit">Submit</button></form></>;
}
