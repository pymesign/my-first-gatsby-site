import React from "react";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";
import { InlineShareButtons } from "sharethis-reactjs";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = React.useState([]);
  const [generatedImage, setGeneratedImage] = React.useState(null);

  React.useEffect(() => {
    async function getMeme() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMeme();
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function captureMeme() {
    const meme = document.querySelector(".meme");
    html2canvas(meme, { useCORS: true })
      .then(function (canvas) {
        const imgData = canvas.toDataURL("image/png");
        const generatedImageDiv = document.getElementById("generated-image"); // Obtener el div oculto
        const img = document.createElement("img"); // Crear un elemento img
        img.src = imgData; // Asignar la imagen generada a la src del elemento img
        generatedImageDiv.appendChild(img); // Agregar el elemento img al div oculto
        setGeneratedImage(imgData);
      })
      .catch(function (error) {
        console.log("Error capturing meme:", error);
      });
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
      <div id="generated-image" style={{ display: "none" }}></div>{" "}
      {/* Agregar un div oculto */}
      {generatedImage && <img src={generatedImage} alt="meme" />}
      {generatedImage && (
        <InlineShareButtons
          config={{
            alignment: "center",
            color: "social",
            enabled: true,
            font_size: 16,
            labels: "cta",
            language: "en",
            networks: ["facebook", "twitter", "reddit", "linkedin", "whatsapp"],
            padding: 12,
            radius: 4,
            show_total: false,
            size: 40,
          }}
          shareUrl={generatedImage}
        />
      )}
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img
          src={meme.randomImage}
          className="meme--image"
          alt="meme"
          crossorigin="anonymous"
        />
        <Draggable>
          <h2 className="meme--text top">{meme.topText}</h2>
        </Draggable>
        <Draggable>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </Draggable>
      </div>
      <button className="form--button" onClick={captureMeme}>
        Capture meme 📷
      </button>
    </main>
  );
}
