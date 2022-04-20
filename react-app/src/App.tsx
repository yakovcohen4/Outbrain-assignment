import { useEffect, useState } from 'react';

import { layOutDay } from './utils/layOutDay';
import { events } from './utils/events';
import { EventInterface } from './@types';

// components
import ClockMap from './components/ClockMap';
function App() {
  const [eventsList, setEventsList] = useState<EventInterface[]>([]);

  useEffect(() => {
    setEventsList(layOutDay(events));
  }, []);

  return (
    <div className="App">
      <h3 className="header">Daily Calender</h3>

      <div className="container">

        <div className="events">
          {eventsList.map(
            ({ left, width, end, start, title, location }, index) => {
              return (
                <div
                  key={index}
                  className="event"
                  style={{
                    left: left,
                    width: width,
                    height: end - start,
                    top: start,
                  }}
                >
                  <div className="event-information">
                    <div className="event-title">
                      {title ? title : 'Sample Item'}
                    </div>
                    <span className="event-location">
                      {location ? location : 'Sample Location'}
                    </span>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
