import React, { useState, useEffect, useRef } from 'react';

function TileUI({ tile }) {
  const selfRef = useRef(null);
  const [textSize, setTextSize] = useState(0);

  useEffect(() => {
    const rescaleText = () => {
      let charLength = tile.data.value.toString().length;
      if (selfRef.current && charLength !== 1) {
        setTextSize((selfRef.current.clientWidth + 20) / charLength);
      } else if (selfRef.current && charLength === 1) {
        setTextSize((selfRef.current.clientWidth + 20) / 2);
      }
    };
    rescaleText();

    // Add event listener for window resize
    window.addEventListener('resize', rescaleText);

    return () => {
      // Cleanup the listener when the object is unmounted
      window.removeEventListener('resize', rescaleText);
    };
  }, [tile.data.value, tile.data.moveDir]);

  const tileStyle = {
    fontSize: `${textSize}px`,
    visibility: tile.data.value === 0 ? 'hidden' : 'visible',
  };

  return <button ref={selfRef} className="Tile" style={tileStyle}>{tile.data.value}</button>;
}

export default TileUI;