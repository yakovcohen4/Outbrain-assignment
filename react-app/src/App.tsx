import { useEffect, useState } from 'react';

import { layOutDay } from './utils/layOutDay';
import { events } from './utils/events';
import { EventInterface } from './@types';

// components
import ClockMap from './components/ClockMap';
import Events from './components/Events';

function App() {
  const [eventsList, setEventsList] = useState<EventInterface[]>([]);

  useEffect(() => {
    setEventsList(layOutDay(events));
  }, []);

  return (
    <div className="App">
      <h3 className="header">Daily Calender</h3>

      <div className="container">
        <ClockMap />
        <Events eventsList={eventsList} />
      </div>
    </div>
  );
}

export default App;
