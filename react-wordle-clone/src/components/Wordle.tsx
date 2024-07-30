"use client";

import validAnswers from "@/resources/wordle_valid_answers.json";
import validWords from "@/resources/wordle_valid_words.json";
import { useState } from "react";

function getTargetWord(wordsList: string[]): string {
  return wordsList[Math.floor(Math.random() * wordsList.length)];
}

function isWordValid(word: string, validWords: string[]): boolean{
    return validWords.includes(word);
}

function Wordle() {
  let [message, setMessage] = useState("");

  function handleWord(e: any) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const userWord = formData.get("userWord")?.toString();

    if (userWord && validWords.includes(userWord)) {
      setMessage("Word valid.");
    } else {
      setMessage("Word invalid.");
    }
  }

  return (
    <>
      <form onSubmit={handleWord}>
        <input
          name="userWord"
          type="text"
          className="bg-black border-white border-2 rounded"
        />
      </form>
      <p>{message}</p>
    </>
  );
}

export default Wordle;
