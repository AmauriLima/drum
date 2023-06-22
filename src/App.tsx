import { useEffect, useState,  } from 'react'
import './App.css'
import './DrumKit.css'

import a from "./sounds/kick-01.wav";
import s from "./sounds/snare-01.wav";
import d from "./sounds/tom-01.wav";
import f from "./sounds/tom-02.wav";
import g from "./sounds/tom-03.wav";
import h from "./sounds/hihat-closed.wav";
import j from "./sounds/crash-01.wav";
import k from "./sounds/ride-01.wav";

const soundMap: KeysSounds = {
  a,
  s,
  d,
  f,
  g,
  h,
  j,
  k,
};

type Keys = 'a' | 's' | 'd' | 'f' | 'g' | 'h' | 'j' | 'k';
type KeysSounds = {[key in Keys]: string}
type PartsOfDrum = {[key in Keys]: string};

const partsMap: PartsOfDrum = {
  a: 'Bass Drum',
  s: 'Snare Drum',
  d: 'Tom 1',
  f: 'Tom 2',
  g: 'Tom 3',
  h: 'Hi-Hat',
  j: 'Crash Cymbal',
  k: 'Ride Cymbal',
};

function App() {
  const [keyAnimation, setKeyAnimation] = useState<null | Keys>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase() as  Keys;

      if (key in soundMap) {
        playSound(key);
        setKeyAnimation(key);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getRandomFontSize = () => {
    return Math.floor(Math.random() * 20) + 30;
  };

  const playSound = (key: Keys) => {
    const audioElement = new Audio(soundMap[key]);
    audioElement.play();
  };

  const handleAnimationEnd = () => {
    setKeyAnimation(null);
  };

  const handleButtonClick = (key: Keys) => {
    if (key in soundMap) {
      playSound(key);
      setKeyAnimation(key);
    }
  };

  return (
    <div className="drum-kit">
      <h1><span style={{ color: '#8257e5' }}>Drum</span>Topia</h1>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="blackboard">
          {keyAnimation && (
            <div
              key={keyAnimation}
              className={`key-animation`}
              style={{
                color: getRandomColor(),
                fontSize: getRandomFontSize(),
              }}
              onAnimationEnd={handleAnimationEnd}
            >
              {partsMap[keyAnimation]}
            </div>
            )}
        </div>

        <div style={{ marginBottom: '8px' }}>
          <strong style={{ marginBottom: '8px', display: 'block' }}>Para tocar a bateria</strong>
          Pressione as teclas 
          <strong> A, S, D, F, G, H, J, K </strong>
          <br />
          Ou toque pelos botões a baixo
        </div>
        
        <div className="button-container">
          {Object.keys(partsMap).map((key) => (
            <button
              key={key}
              className={`drum-button ${keyAnimation === key ? "active" : ""}`}
              onClick={() => handleButtonClick(key as Keys)}
            >
              {partsMap[key as Keys]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App
