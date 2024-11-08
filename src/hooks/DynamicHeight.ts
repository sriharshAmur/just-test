import { useState, useEffect } from "react";

const useDynamicHeight = (): string => {
  const [dynamicHeight, setDynamicHeight] = useState<string>("100vh");

  useEffect(() => {
    const header = document.querySelector("header");
    const headerHeight = header ? header.getBoundingClientRect().height : 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const newHeight = Math.max(
        window.innerHeight -
          (scrollTop > headerHeight ? 0 : headerHeight - scrollTop),
        0,
      );
      setDynamicHeight(`${newHeight}px`);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return dynamicHeight;
};

export default useDynamicHeight;
