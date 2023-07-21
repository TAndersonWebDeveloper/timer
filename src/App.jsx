import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 50%;
  margin: 0 auto;
  transform: translateY(30vh);
  padding: 2rem;
`;

const Button = styled.button`
  background-color: transparent;
  padding: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Label = styled.h2`
  font-size: 1.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 4rem;

  & Button {
    padding: 0.2rem;
    border: none;
  }
`;

const Timer = styled.h1`
  font-family: "Orbitron", sans-serif;
  font-size: 3rem;
  margin: 0;
`;

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1``;

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timer, setTimer] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTimerType, setCurrentTimerType] = useState("Session");

  const intervalIdRef = useRef(null);

  useEffect(() => {
    if (isRunning && timer > 0) {
      intervalIdRef.current = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      setCurrentTimerType((prevType) =>
        prevType === "Session" ? "Break" : "Session"
      );
      setTimer((prevTime) =>
        currentTimerType === "Session" ? breakLength * 60 : sessionLength * 60
      );
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning, timer, breakLength, sessionLength, currentTimerType]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTimer(sessionLength * 60);
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setCurrentTimerType("Session");
  };

  const handleButton = (type, action) => {
    if (type === "break" && breakLength > 1 && action === "decrement") {
      setBreakLength(breakLength - 1);
    } else if (type === "break" && breakLength < 60 && action === "increment") {
      setBreakLength(breakLength + 1);
    } else if (
      type === "session" &&
      sessionLength > 1 &&
      action === "decrement"
    ) {
      setSessionLength(sessionLength - 1);
      setTimer((sessionLength - 1) * 60);
    } else if (
      type === "session" &&
      sessionLength < 60 &&
      action === "increment"
    ) {
      setSessionLength(sessionLength + 1);
      setTimer((sessionLength + 1) * 60);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Container>
      <h1>25 + 5 Clock</h1>
      <div>
        <InputContainer>
          <div>
            <Label id="break-label">Break Length</Label>
            <ButtonContainer>
              <Button
                onClick={() => handleButton("break", "decrement")}
                id="break-decrement"
              >
                -
              </Button>
              <div id="break-length">{breakLength}</div>
              <Button
                id="break-increment"
                onClick={() => handleButton("break", "increment")}
              >
                +
              </Button>
            </ButtonContainer>
          </div>
          <div>
            <Label id="timer-label">Session</Label>
            <ButtonContainer>
              <Button
                id="session-decrement"
                onClick={() => handleButton("session", "decrement")}
              >
                -
              </Button>
              <div id="session-length">{sessionLength}</div>
              <Button
                id="session-increment"
                onClick={() => handleButton("session", "increment")}
              >
                +
              </Button>
            </ButtonContainer>
          </div>
        </InputContainer>
      </div>
      <TimerContainer>
        <Label id="timer-label">{currentTimerType}</Label>
        <Timer id="time-left">{formatTime(timer)}</Timer>
      </TimerContainer>
      <div>
        <Button id="start_stop" onClick={handleStart}>
          Start
        </Button>
        <Button id="start_stop" onClick={handlePause}>
          Pause
        </Button>
        <Button id="reset" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </Container>
  );
}

export default App;
