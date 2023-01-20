import React, { useEffect, useState } from "react";

// ...

function Clock(){

  const[count, setCount] = useState(0);
  const[time, setTime] = useState(2);


  useEffect(() => {
    const interval = setInterval(() => {
      if(time>0){
        setTime(time-1);
      } else {
        setTime(0)
      }
    }, 1000);
      return () => clearInterval(interval);          
  }, [time]);

  const reset = () =>{
    setTime(10)
    setCount(0)
  }

  return (
    <div className="App">
      <div className="card">
        <button onClick={() => {time==0 ? reset() : setCount((count) => count + 1)}}>
          Count is {count}
        </button>
        <p>
          Your CPS is {count/(10-time)} clicks per second
        </p>
      </div>
      <div>
        <p>{time.toLocaleString()}</p>
      </div>
    </div>
  )
  
}

export default Clock

