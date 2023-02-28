import React, { useEffect, useState } from "react";
import "./Clock.css";

function Clock() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(10);
  const [result, setResult] = useState(new Map());

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        setTime(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const reset = () => {
    setTime(10);
    setCount(0);
  };

  return (
    <div className="App">
      <div className="card">
        <button
          disabled={time === 0}
          onClick={() => {
            setCount((count) => count + 1);
          }}
        >
          Count is {count}
        </button>
        {!(count === 0 || time === 10) ? (
          <p>
            Your CPS is {(count / (10 - time)).toFixed(2)} clicks per second
          </p>
        ) : (
          <p>Your CPS is .. clicks per second</p>
        )}
      </div>
      <div>
        <p>{time.toLocaleString()}</p>
      </div>
      {time === 0 && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (
              !result.has(event.target.name.value) ||
              result.get(event.target.name.value) < count / 10
            ) {
              setResult(
                (result) =>
                  new Map(result.set(event.target.name.value, count / 10))
              );
            }
          }}
        >
          <input
            value="Invité"
            name="name"
            type="text"
            placeholder="Enter your name"
          />
          <button type="submit">Submit</button>
        </form>
      )}

      {time === 0 && (
        <button disabled={time > 0} onClick={reset}>
          Reset
        </button>
      )}
      <div>
        <p>Previous Results</p>
        <ul>
          {[...result].map((item) => (
            <li key={item[0]}>
              {item[0]}: {item[1].toFixed(2)} clicks per second
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Clock;
