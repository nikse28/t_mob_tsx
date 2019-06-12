import React from 'react';
import './App.css';
// import ReconRules from "./components/ReconRules";
import SourceDataFilter from "./components/SourceDataFilter";
const App: React.FC = () => {
  return (
    <div>
      <SourceDataFilter/>
      {/* <ReconRules/> */}
    </div>
  );
}

export default App;
