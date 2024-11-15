import { useEffect, useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import CreatureCard from './CreatureCard';
import {getMonsterList, getMonsterStats,getBasicStats, basicStats} from './openDnD';
import "./Tracker.css"; // Import the CSS file


const Tracker = () => {
    const [cards, setCards] = useState<{ id: number; text: string , basicstats: basicStats}[]>([]);
    const [nextId, setNextId] = useState(1);
    
    const [dataMonsterStats, setDataMonsterStats] = useState<any[]>([{"slug" : "monster", "name" : "Monster"}]);
    const [monsterListLoaded, setMonsterListLoaded] = useState(false);
    const [selectedMonster, setSelectedMonster] = useState("monster");
    
    const addCard = async () => {
        const monster = await getMonsterStats(selectedMonster);
        const basic = getBasicStats(monster);
        setCards([...cards, { id: nextId, text: `Creature ${nextId}`, basicstats:  basic}]);
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



    useEffect(() => {
        getMonsterList().then(mons => {if(!monsterListLoaded)setDataMonsterStats(mons)}).finally(()=> setMonsterListLoaded(true));
    }, []);

    const monOption = useMemo(() => {
        return ( <select onChange={(event) => setSelectedMonster(event.target.value)}> {dataMonsterStats.map((mon) => {return <option value={mon.slug}>{mon.name}</option>})} </select>)
    },[dataMonsterStats])

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='tracker-main'>
                <div className='tracker-ribbon'>
                    <div className='mon-option-set'>
                       {monOption}
                    </div>
                    <button className='ribbon-button' onClick={addCard}>Create</button>
                </div>
                {cards.map((card, index) => (
                        <CreatureCard key={card.id} index={index} id={card.id} moveCard={moveCard} delteCard={deleteCard} basicStats={card.basicstats} />
                ))}
            </div>
        </DndProvider>
    );
};

export default Tracker;