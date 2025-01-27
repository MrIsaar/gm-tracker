import { Input, Label } from "@fluentui/react-components";
import "./Npc.css"
import { ArrowClockwiseFilled } from "@fluentui/react-icons";
import { Dispatch, SetStateAction, useState } from "react";

class Field<T> {
    name: string;
    value: T;
    setValue: Dispatch<SetStateAction<T>>;

    constructor(name: string, defaultValue: T | undefined) {
        this.name = name;
        [this.value, this.setValue] = useState(defaultValue ?? null as T);
    }


};


function NpcCard() {
    const fields: Field<any>[] = [
        new Field<string>("Name", "Farm Person"),
        new Field<string>("Race", "Human"),
        new Field<string>("Job", "Farmer"),
        new Field<string>("Pronouns", "They"),
        new Field<string>("Personality", "Neutral"),
        new Field<string>("Visual", "Suspenders and Flannel"),
        new Field<string>("Voice", "Country"),
        new Field<string>("Background", "Farmer"),
    ];


    const randomValueSet = (setStateFn: (value: string) => void) => { setStateFn("random") }
    return (
        <div className="npc-main">
            <div className="npc-card-grid">
                {fields.map((field) =>
                (<div className="npc-card-field">
                    <Label className="npc-card-field-label">{field.name}</Label>
                    <div className="npc-card-field-input">
                        <Input
                            type="text"
                            contentAfter={<ArrowClockwiseFilled onClick={() => randomValueSet(field.setValue)} />}
                            onChange={(_e, d) => field.setValue(d.value)}
                            value={field.value ?? ""}
                        />
                    </div>
                </div>)
                )}
            </div>


        </div>
    );
}

export default NpcCard;