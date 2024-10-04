"use client";

import React, { useState } from "react";
import { useDrag, useDrop } from 'react-dnd';
import "../styles/CreatureCard.css"; // Import the CSS file

interface DNDCreatureCardProps {
    id : any, 
    index : any, 
    moveCard : any,
    delteCard : any
}


const CreatureCard = (props: DNDCreatureCardProps) => {
    const { id,  index, moveCard } = props;
    const ref = React.useRef(null);
    const [, drop] = useDrop({
        accept: 'CARD',
        hover(item: { index: number }) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'CARD',
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));


  const [name, setName] = useState("");
  const [currentHp, setCurrentHp] = useState("");
  const [maxHp, setMaxHp] = useState("");
  const [initiative, setInitiative] = useState("");
  const [armorClass, setArmorClass] = useState("");

const handleDelete = () => {
    props.delteCard(id);
};

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.9 : 1, padding: '8px', margin: '4px', borderRadius: '4px' }}>
    <div className="creature-card">
      <form className="creature-card-grid">
      <button className="delete-button" onClick={handleDelete}>
          X
        </button>
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
    </div>
  );
};

export default CreatureCard;
