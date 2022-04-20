import { hourMap } from '../utils/hourMap';

function ClockMap() {
  return (
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
  );
}

export default ClockMap;
