import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import CreatureCard from './CreatureCard';
import {getMonsterList, getMonsterStats,getBasicStats, basicStats, getConditionList} from './openDnD';
import "./Tracker.css"; // Import the CSS file
import { Combobox, Option, OptionGroup,FluentProvider, teamsDarkTheme} from '@fluentui/react-components';


const Tracker = () => {
    const [cards, setCards] = useState<{ id: number; text: string , basicstats: basicStats}[]>([]);
    const [nextId, setNextId] = useState(1);
    
    const [dataConditions, setDataConditions] = useState<any[]>([]);
    const [conditionListLoaded, setConditionListLoaded] = useState(false);
    const [selectedConditions, setSelectedConditions] = useState("");

    const [dataMonsterStats, setDataMonsterStats] = useState<any[]>([{"slug" : "", "name" : "Monster"}]);
    const [monsterListLoaded, setMonsterListLoaded] = useState(false);
    const [selectedMonster, setSelectedMonster] = useState("");
    
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

    const clearInitiative = () => {
        const shouldClear = confirm("Are you sure you want to clear the initiative order?");
        if(shouldClear)
            setCards([]);
    };


    useEffect(() => {
        getMonsterList().then(mons => {if(!monsterListLoaded)setDataMonsterStats(mons)}).finally(()=> setMonsterListLoaded(true));
    }, []);
    useEffect(() => {
        getConditionList().then(con => {if(!conditionListLoaded)setDataConditions(con)}).finally(()=> setConditionListLoaded(true));
    }, []);


    return (
        <DndProvider backend={HTML5Backend}>
            <FluentProvider theme={teamsDarkTheme}>
            <div className='tracker-main'>
                <div className='tracker-ribbon'>
                    <button className='ribbon-button' onClick={clearInitiative}>Clear</button>
                    <div className='condition'>
                        <Combobox onOptionSelect={(_event,data) => setSelectedConditions(data.optionValue ?? "")}>
                            <OptionGroup label='Base'>
                                 {dataConditions.map((condition) => {return <Option value={condition.name} text={condition.name}>{condition.name}</Option>})}
                            </OptionGroup>
                       </Combobox>
                        <button className='ribbon-button' onClick={()=> {console.log(selectedConditions)}}>Conditions</button>
                    </div>
                    <div className='mon-option-set'>
                       <Combobox onOptionSelect={(_event,data) => {setSelectedMonster(data.optionValue ?? ""); getMonsterStats(data.optionValue ?? "")}}>
                            <OptionGroup label='Monsters'>
                                 {dataMonsterStats.map((mon) => {return <Option value={mon.slug} text={mon.name}>{mon.name} ({mon.cr})</Option>})}
                            </OptionGroup>
                       </Combobox>
                       <button className='ribbon-button' onClick={addCard}>Create</button>
                    </div>
                    
                </div>
                {cards.map((card, index) => (
                        <CreatureCard key={card.id} index={index} id={card.id} moveCard={moveCard} delteCard={deleteCard} basicStats={card.basicstats} />
                ))}
            </div>
            </FluentProvider>
        </DndProvider>
    );
};

export default Tracker;