import { memo, useCallback, useEffect, useState } from "react";
import clickSound from "./ClickSound.m4a";

function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);

  const [duration, setDuration] = useState(0);

  // const playSound = useCallback(
  //   function () {
  //     if (!allowSound) return;
  //     const sound = new Audio(clickSound);
  //     sound.play();
  //   },
  //   [allowSound]
  // );

  useEffect(() => {
    setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
    // playSound();
  }, [number, sets, speed, durationBreak]);

  useEffect(() => {
    const playSound = function () {
      if (!allowSound) return;
      const sound = new Audio(clickSound);
      sound.play();
    };
    playSound();
  }, [duration, allowSound]);

  //was was created here is what we call a stale closure. so it's an outdated closure because the function has captured the values from a time where the nuiimber was still somthing else.
  //in this case duration and number and sets needs to be in the [](dependency array). if not,  duration will be a stale value
  //so, having all elements in dependency array the stale closure iss eliminated (in this example is still stale closure, right?)

  //the stale closure only happens if this function is still referencing some old values that are outdated by the time that this function is running
  useEffect(() => {
    console.log(duration, sets);
    document.title = `your ${number} - execise workout`;
  }, []);

  // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  function handleInc() {
    setDuration((duration) => Math.floor(duration) + 1);
    // playSound();
  }

  function handleDec() {
    setDuration((duration) => (duration > 1 ? Math.ceil(duration) - 1 : 0));
    // playSound();
  }

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(e.target.value)}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDec}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={handleInc}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator);
