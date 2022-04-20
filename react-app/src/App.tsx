import { layOutDay } from './utils/layOutDay';
import { hourMap } from './utils/hourMap';
import { events } from './utils/events';
import { EventInterface } from './@types';

function App() {
  const [eventsList, setEventsList] = useState<EventInterface[]>([]);

  return (
    <div className="App">
        <div className="schedule">
          {hourMap.map((hour, index) => {
            return (
              <div key={index} className="hour">
                {index % 2 === 0 ? (
                  <span>
                    {index < 5 ? (
                      <span>
                        {hour}
                        <small> AM</small>
                      </span>
                    ) : (
                      <span>
                        {hour}
                        <small> PM</small>
                      </span>
                    )}
                  </span>
                ) : (
                  <small> {hour} </small> // show half hour
                )}
              </div>
            );
          })}
        </div>

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
  );
}

export default App;
