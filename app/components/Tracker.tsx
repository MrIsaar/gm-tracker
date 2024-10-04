"use client"
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import CreatureCard from './CreatureCard';
import "../styles/Tracker.css"; // Import the CSS file


const Tracker = () => {
    const [cards, setCards] = useState<{ id: number; text: string }[]>([]);
    const [nextId, setNextId] = useState(1);

    const addCard = () => {
        setCards([...cards, { id: nextId, text: `Creature ${nextId}` }]);
        setNextId(nextId + 1);
    };

    const deleteCard = (id : number) => {
        setCards(cards.filter((card) => card.id !== id));
    };

    const moveCard = (dragIndex: number, hoverIndex: number) => {
        const dragCard = cards[dragIndex];
        setCards(
            update(cards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            })
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='tracker-main'>
                <div className='tracker-ribbon'>
                    <button className='ribbon-button' onClick={addCard}>Create</button>
                </div>
                {cards.map((card, index) => (
                        <CreatureCard key={card.id} index={index} id={card.id} moveCard={moveCard} delteCard={deleteCard} />
                ))}
            </div>
        </DndProvider>
    );
};

export default Tracker;