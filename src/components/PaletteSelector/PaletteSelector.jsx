import { useEffect } from "react";
import css from './PaletteSelector.module.css'

const palettes = {
  green: {
    "--main": "#103931",
    "--second-color": "rgba(16, 57, 49, 0.2)",
  },
  blue: {
    "--main": "#0957C3",
    "--second-color": "rgba(9, 87, 195, 0.2)",
  },
  red: {
    "--main": "#F03F3B",
    "--second-color": "rgba(240, 63, 59, 0.2)",
  },
};

function changePalette(paletteName) {
  const palette = palettes[paletteName];
  if (palette) {
    Object.keys(palette).forEach((key) => {
      document.documentElement.style.setProperty(key, palette[key]);
    });
  }
}

const PaletteSelector = () => {
  useEffect(() => {
    const selector = document.querySelector("#palette-selector");
    selector.addEventListener("change", (event) => {
      changePalette(event.target.value);
    });

    return () => {
      selector.removeEventListener("change", changePalette);
    };
  }, []);

  return (
    <select id="palette-selector" className={css.paletteSelector}>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <option value="red">Red</option>
    </select>
  );
};

export default PaletteSelector;
