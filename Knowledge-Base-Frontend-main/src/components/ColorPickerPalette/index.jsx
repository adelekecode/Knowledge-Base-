import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ColorPicker } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

const ColorPickerPalette = ({ color, setColor }) => {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(180);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 1023.9 && windowWidth >= 768) {
      setWidth(300);
      setHeight(150);
    } else if (windowWidth <= 767.9 && windowWidth >= 425) {
      setWidth(300);
      setHeight(110);
    } else if (windowWidth <= 424.9 && windowWidth >= 301) {
      setWidth(250);
      setHeight(80);
    } else if (windowWidth <= 300.9) {
      setWidth(200);
      setHeight(80);
    }
  }, []);

  return (
    <div className={`w-fit colorPalette`}>
      <ColorPicker
        width={width}
        height={height}
        color={color}
        onChange={setColor}
        hideHSV
        light
        hideRGB
      />
    </div>
  );
};

export default ColorPickerPalette;
