import { useEffect, useMemo, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import CreatureCard from "./CreatureCard";
import {
    MonsterList,
    getMonsterListSourced,
  getMonsterStats,
  getConditionList,
  openDnDsources,
  getSourceDisplayName,
  MonsterStat,
} from "../Services/openDnD";
import "./Tracker.css"; // Import the CSS file
import {
  Combobox,
  Option,
  OptionGroup,
  FluentProvider,
  teamsDarkTheme,
} from "@fluentui/react-components";

const Tracker = () => {
  const [cards, setCards] = useState<
    { id: number; text: string; stats: MonsterStat | null }[]
  >([]);
  const [nextId, setNextId] = useState(1);

  const [dataConditions, setDataConditions] = useState<any[]>([]);
  const [conditionListLoaded, setConditionListLoaded] = useState(false);
  const [selectedConditions, setSelectedConditions] = useState("");

  const [dataMonsterStats, setDataMonsterStats] = useState<MonsterList[]>([]);
  const [selectedMonster, setSelectedMonster] = useState("");

  const [selectedSources,setSelectedSources] = useState<string[]>([]);
  const sourceText = useMemo(()=>{
    let text = "";
    selectedSources.forEach((selSrc, index)=> {
        text += (index== 0 ? "" : ", ") + getSourceDisplayName(selSrc);
    });
    return text;
  },[selectedSources]);

  const addCard = async () => {
    const monster = await getMonsterStats(selectedMonster);
    setCards([
      ...cards,
      { id: nextId, text: `Creature ${nextId}`, stats: monster },
    ]);
    setNextId(nextId + 1);
  };

  const deleteCard = (id: number) => {
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
    const shouldClear = confirm(
      "Are you sure you want to clear the initiative order?"
    );
    if (shouldClear) setCards([]);
  };

  useEffect(() => {
    getMonsterListSourced(selectedSources)
      .then((mons) => {
        setDataMonsterStats(mons);
      })
  }, [selectedSources]);
  useEffect(() => {
    getConditionList()
      .then((con) => {
        if (!conditionListLoaded) setDataConditions(con);
      })
      .finally(() => setConditionListLoaded(true));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <FluentProvider theme={teamsDarkTheme}>
        <div className="tracker-main">
          <div className="tracker-ribbon">
            <button className="ribbon-button" onClick={clearInitiative}>
              Clear
            </button>
            <div className="condition">
              <Combobox
                placeholder="Conditions"
                onOptionSelect={(_event, data) =>
                  setSelectedConditions(data.optionValue ?? "")
                }
              >
                <OptionGroup label="Base">
                  {dataConditions.map((condition) => {
                    return (
                      <Option value={condition.name} text={condition.name}>
                        {condition.name}
                      </Option>
                    );
                  })}
                </OptionGroup>
              </Combobox>
              <button
                className="ribbon-button"
                onClick={() => {
                  console.log(selectedConditions);
                }}
              >
                Conditions
              </button>
            </div>
            <div className="mon-option-set">
              <Combobox placeholder="Sources" value={sourceText} multiselect={true}  onOptionSelect={(_event,data) => {setSelectedSources(data.selectedOptions)}}>
                {openDnDsources.map((src) => {
                  return (
                    <Option value={src.document__slug}>
                      {src.document__title}
                    </Option>
                  );
                })}
              </Combobox>
              <Combobox
                placeholder="Monster"
                onOptionSelect={(_event, data) => {
                  setSelectedMonster(data.optionValue ?? "");
                  getMonsterStats(data.optionValue ?? "");
                }}
              >
                {
                    dataMonsterStats.map((monSrc) =>
                <OptionGroup label={monSrc.source + "(" + monSrc.count + ")"}>
                  {monSrc.monsters.map((mon) => {
                    return (
                      <Option value={mon.slug} text={mon.name}>
                        {mon.name} ({mon.cr})
                      </Option>
                    );
                  })}
                </OptionGroup>)}
              </Combobox>
              <button className="ribbon-button" onClick={addCard}>
                Create
              </button>
            </div>
          </div>
          <div className="scroll">
          {cards.map((card, index) => (
            <CreatureCard
              key={card.id}
              index={index}
              id={card.id}
              moveCard={moveCard}
              delteCard={deleteCard}
              stats={card.stats}
            />
          ))}
          </div>
        </div>
      </FluentProvider>
    </DndProvider>
  );
};

export default Tracker;
