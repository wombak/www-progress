import { useState } from "react";

const useUi = () => {
  const [showGifs, setShowGifs] = useState(false);

  return {
    showGifs,
    setShowGifs
  };
};

export default useUi;
