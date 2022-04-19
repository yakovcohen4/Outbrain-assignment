import { hourMap } from './utils/hourMap';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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
    </div>
  );
}

export default App;
