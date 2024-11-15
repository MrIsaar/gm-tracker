import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./CreatureCard.css"; // Import the CSS file
import {
  FaArrowDown,
  FaArrowUp,
  FaExpandAlt,
  FaTrashAlt,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import {basicStats} from "./openDnD";
interface DNDCreatureCardProps {
  id: any;
  index: any;
  moveCard: any;
  delteCard: any;
  basicStats: basicStats | null;
}

const CreatureCard = (props: DNDCreatureCardProps) => {
  const { id, index, moveCard, delteCard, basicStats } = props;
  const ref = React.useRef(null);
  const [, drop] = useDrop({
    accept: "CARD",
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

  const handleArrow = (amount: number) => {
    if (!ref.current || (index == 0 && amount < 0)) {
      return;
    }
    moveCard(index, index + amount);
  };

  const handleDelete = () => {
    delteCard(id);
  };

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const [name, setName] = useState(basicStats?.name);
  const currentHp = useRef(null);
  const maxHp = useRef(null);
  const armorClass = useRef(null);
  const passivePerception = useRef(null);
  const initiative = useRef(null);
  const condition = useRef(null);


  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.9 : 1,
      }}
    >
      <div className="card-grid">
        <div className="init-col">
          <button
            className="init-item button-remove-bg"
            onClick={() => handleArrow(-1)}
          >
            <FaArrowUp size={30} />
          </button>
          <div className="init-item">
            <input className="init-item init-number-input" ref={initiative} />
          </div>
          <button
            className="init-item button-remove-bg"
            onClick={() => handleArrow(1)}
          >
            <FaArrowDown size={30} />
          </button>
        </div>
        <div className="name-section">
          <input
            className="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="stat-section">
          <div className="hp-section">
              <input className="hp-input" ref={currentHp} defaultValue={basicStats?.maxHp ?? 0}/>
            <p style={{ marginLeft: "5px", marginRight: "5px" }}> / </p>
            <input className="hp-input" ref={maxHp} defaultValue={basicStats?.maxHp ?? 0} />
            <p style={{ marginLeft: "5px" }}> HP</p>
          </div>

          <div className="ac-section">
            <input className="ac-input" ref={armorClass} defaultValue={basicStats?.ac ?? 10} />
            <p style={{ marginLeft: "5px" }}>AC</p>
          </div>
          <div className="pp-section">
            <input className="pp-input" ref={passivePerception}  defaultValue={basicStats?.pp ?? 10}/>
            <p style={{ marginLeft: "5px" }}>PP</p>
          </div>
        </div>
        <div className="condition-section">
          <input className="condition-input" ref={condition} defaultValue={basicStats?.notes ?? ""} />
        </div>

        <div className="button-section">
          <a className="align-right" data-tooltip-id="expand-button">
            <button
              className="button-remove-bg"
              onClick={() => {
                alert("open edit dialog");
              }}
            >
              <FaExpandAlt size={30}/>
            </button>
          </a>

          <a className="align-right" data-tooltip-id="delete-button">
            <button
              className="button-remove-bg"
              onClick={() => {
                handleDelete();
              }}
            >
              <FaTrashAlt size={30}/>
            </button>
            <Tooltip id="expand-button" content="Expand Creature Card" />
            <Tooltip id="delete-button" content="Remove from inititive" />
          </a>
        </div>
      </div>
    </div>
  );
};

/**<div className="creature-card">
      <div className="flex justify-between">
        <button className="octagon-button" onClick={ () => setRoll(Math.floor(Math.random() * 20.0) + 1)}>{roll}</button>
        <div className="flex flex-row grow mr-5 ml-5">
              <label>Name:</label>
              <input
                type="text"
                className="name-input ml-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button className="delete-button" onClick={handleDelete}>
            X
          </button>
        </div>
        <form className="creature-card-grid">
          <div className="grid-item name">
            
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
 * 
 */

export default CreatureCard;
