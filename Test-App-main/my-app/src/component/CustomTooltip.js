// src/component/CustomTooltip.js
import React from 'react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { value, payload: { detail } } = payload[0];
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${value}`}</p>
        <p className="intro">{detail}</p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
