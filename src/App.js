import "./App.css";
import CollatzVisualization from "./components/CollatzVisualization";
import HeadingContent from "./components/HeadingContent";

function App() {
  return (
    <div className="App box-border h-screen m-0 p-0 bg-gray-800 overflow-x-hidden ">
      <div className="flex flex-col gap-5 p-5 ">
        <HeadingContent></HeadingContent>

        <CollatzVisualization></CollatzVisualization>
      </div>
    </div>
  );
}

export default App;
