"use client";

import React, { useState } from "react";
import "../styles/CreatureCard.css"; // Import the CSS file

const CreatureCard: React.FC = () => {
  const [name, setName] = useState("");
  const [currentHp, setCurrentHp] = useState("");
  const [maxHp, setMaxHp] = useState("");
  const [initiative, setInitiative] = useState("");
  const [armorClass, setArmorClass] = useState("");

  return (
    <div className="creature-card">
      <form className="creature-card-grid">
        <div className="grid-item name">
          <div className="flex flex-row">
            <label >Name:</label>
            <input
              type="text"
              className="name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="grid-item initiative">
          <label>Initiative:</label>
          <input
            type="number"
            value={initiative}
            onChange={(e) => setInitiative(e.target.value)}
          />
        </div>
        <div className="grid-item current-hp">
          <label>Current HP:</label>
          <input
            type="number"
            value={currentHp}
            onChange={(e) => setCurrentHp(e.target.value)}
          />
        </div>
        <div className="grid-item max-hp">
          <label>Max HP:</label>
          <input
            type="number"
            value={maxHp}
            onChange={(e) => setMaxHp(e.target.value)}
          />
        </div>
        <div className="grid-item armor-class">
          <label>Armor Class:</label>
          <input
            type="number"
            value={armorClass}
            onChange={(e) => setArmorClass(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default CreatureCard;
