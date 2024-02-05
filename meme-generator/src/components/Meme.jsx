import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useId } from "react";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const id = useId();

  const [allMemes, setAllMemes] = React.useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <div>
          <label className="form--label" htmlFor={id + "-top-text"}>
            Top text
          </label>
          <input
            type="text"
            placeholder="You cannot simply"
            className="form--input"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
            id={id + "-top-text"}
          />
        </div>
        <div>
          <label className="form--label" htmlFor={id + "-bottom-text"}>
            Top text
          </label>
          <input
            type="text"
            placeholder="Walk to Mordor"
            className="form--input"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
            id={id + "-bottom-text"}
          />
        </div>

        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
