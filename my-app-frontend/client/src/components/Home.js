import { useState } from "react";
import './style.css';
const Meme = () => {
  const [meme, setMeme] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `https://api.imgflip.com/caption_image?template_id=${meme.id}&username=your_username&password=your_password&text0=${encodeURIComponent(topText)}&text1=${encodeURIComponent(bottomText)}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setMeme({ ...meme, url: data.data.url });
          setError(null);
        } else {
          setError(data.error_message);
        }
      })
      .catch(error => console.log(error));
  };
  const handleTopTextChange = (event) => {
    setTopText(event.target.value);
  };
  const handleBottomTextChange = (event) => {
    setBottomText(event.target.value);
  };
  const handleRandomMeme = () => {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(data => {
        const memes = data.data.memes;
        const randomIndex = Math.floor(Math.random() * memes.length);
        const randomMeme = memes[randomIndex];
        setMeme(randomMeme);
        setTopText("");
        setBottomText("");
      })
      .catch(error => console.log(error));
  };
  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {error && <p className="text-red-500">{error}</p>}
        {meme ? (
          <div className="meme-container">
            <img src={meme.url} alt={meme.name} className="max-w-md my-5" />
            <div className="meme-text">
              <input
                type="text"
                placeholder="Top Text"
                value={topText}
                onChange={handleTopTextChange}
                className="my-2 p-2 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Bottom Text"
                value={bottomText}
                onChange={handleBottomTextChange}
                className="my-2 p-2 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        ) : (
          <p>Loading meme...</p>
        )}
        <div className="flex my-5">
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleRandomMeme}
          >
            Random Meme
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={!meme}
          >
            Generate Meme
          </button>
        </div>
      </form>
    </div>
  );
};
export default Meme;