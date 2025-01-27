import "./Npc.css"
import NpcCard from "./NpcCard";

function NpcPage() {
    return (
        <div className="npc-main">
            NPCs
            <div className="npc-grid">
                <NpcCard />
                <NpcCard />
                <NpcCard />
                <NpcCard />
                <NpcCard />
                <NpcCard />
                <NpcCard />
                <NpcCard />
                <NpcCard />
            </div>

        </div>
    );
}

export default NpcPage;