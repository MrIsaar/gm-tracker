import CreatureCard from "./components/creaturecard";

export default function Home() {
  return (
    <div className="justify-center">
      <div className="justify-center text-4xl font-bold">Initiative Tracker</div>
      <div className="items-center justify-center h-32 space-y-5 w-2/3">
        <CreatureCard />
        <CreatureCard />
        <CreatureCard />
      </div>
    </div>
  );
}
