import React from 'react';

const Loader = () => {
  const arr = Array.from({ length: 3 }, (_, i) => i);
  return (
    <div className="container">
      {arr.map((_, i) => {
        return (
          <div
            key={i}
            style={{ '--i': i } as React.CSSProperties}
            className="circle"
          />
        );
      })}
    </div>
  );
};

export default Loader;
