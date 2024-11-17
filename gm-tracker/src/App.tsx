import "./App.css";
import Tracker from "./Tracker";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GM Tracker</h1>
        <h2>Inititive Tracker</h2>
      </header>
      <div>
        <div className="trackerDiv">
          <Tracker />
        </div>
        </div>
      <footer className="App-footer">
        <p>
          Work in Progress. Uses <a href="https://open5e.com/">Open5e</a> API
        </p>
      </footer>
    </div>
  );
}

export default App;
