import React, {} from 'react';
import StarWars from './StarWars';

const App = () => {
  return (
    <div>
     <h1 className="text-yellow px-12 pt-24 flex justify-center text-5xl">Star Wars</h1>
     <h2 className="text-yellow px-12 pb-12 flex justify-center text-3xl">Character Explorer</h2>
     <StarWars />
    </div>
  );
}

export default App;
