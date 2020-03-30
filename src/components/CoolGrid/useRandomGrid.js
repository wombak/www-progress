import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { AppContext } from "../../context";
import gifs from "../../gifs";

import { GIF_COUNT } from "../../utils";

export const COL_COUNT = 5;
export const ROW_COUNT = 4;

const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const scales = [0.7, 0.8, 0.9, 1.1, 1.2, 1.3];

const getRandomGifs = () => {
  const allGifKeys = shuffle(Array.from(Array(GIF_COUNT).keys()));
  const selectedKeys = allGifKeys.slice(0, COL_COUNT * ROW_COUNT);

  return selectedKeys.map(key => ({
    initialScale: scales[randomNumber(0, scales.length - 1)],
    url: gifs[key]
  }));
};

const useRandomGrid = recalculate => {
  const gifs = useMemo(getRandomGifs, []);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (recalculate) {
      setItems(shuffle(gifs));
    }
  }, [recalculate]);

  return items;
};

export default useRandomGrid;
