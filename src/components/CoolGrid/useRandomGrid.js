import { useEffect, useState } from "react";
import shuffle from "lodash.shuffle";

import gifs from "../../gifs";

import { GIF_COUNT } from "../../utils";

export const COL_COUNT = 5;
export const ROW_COUNT = 4;

const scales = [0.7, 0.8, 0.9, 1.1, 1.2, 1.3];

const allGifKeys = shuffle(Array.from(Array(GIF_COUNT).keys()));
const selectedKeys = allGifKeys.slice(0, COL_COUNT * ROW_COUNT);

const randomGifs = selectedKeys.map((key) => ({
  initialScale: shuffle(scales)[0],
  url: gifs[key]
}));

const useRandomGrid = (recalculate) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (recalculate) {
      setItems(shuffle(randomGifs));
    }
  }, [recalculate]);

  return items;
};

export default useRandomGrid;
