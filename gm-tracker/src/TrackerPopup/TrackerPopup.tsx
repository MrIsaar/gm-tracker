import { useEffect, useState } from "react";
import CreatureCard from "../Tracker/CreatureCard";

export interface IPCInitCard
{
    name: string,
    inititive: number,
    index: number,
    id: number
}



function TrackerPopup()
{
    const [data,setData] = useState<IPCInitCard[]>([]);

    useEffect ( () => {window.addEventListener(
        "message",
        (event) => {
          if (event.origin !== window.origin) 
            {
                alert("Someone is trying to hack in!");
                return;
            }
            console.log(event.data);
            setData( event.data);
            
        },
        false,
      );
    },[])

    return (
    <>
        <div className="scroll">
            hello? {data.length}
          {data.map((card, index) => (
            <CreatureCard
              key={card.id}
              index={index}
              id={card.id}
              name={card.name}
              moveCard={()=>{}}
              delteCard={()=>{}}
              stats={null}
              readonlystate={true}
            />
          ))}
          </div>
    </>)
}
export default TrackerPopup;