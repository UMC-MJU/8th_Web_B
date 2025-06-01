import React, { useEffect, useState } from "react";
import useThrottle from "../hooks/useThrottle";

const ThrottlePage = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  const handleScroll = useThrottle(() => {
    setScrollY(window.scrollY);
  }, 2000);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  console.log("리렌더링");

  return (
    <div className="h-dvh flex flex-col justify-center items-center">
      <h1>스로틀링이 무엇일까요?</h1>
      <p>ScrollY : {scrollY}px</p>
    </div>
  );
};

export default ThrottlePage;
