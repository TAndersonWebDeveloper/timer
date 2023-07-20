import { useState } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  width: 50%;
  margin: 0 auto;
  transform: translateY(30vh);
`;

const Button = styled.button``;

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
  gap: 4rem;
`;

const Header = styled.h1``;

function App() {
  const [breakLength, setBreakLength] = useState(1);
  const [sessionLength, setSessionLength] = useState(2);
  const [timer, setTimer] = useState(2);
  const [isRunning, setIsRunning] = useState(false);

  if (isRunning) {
    setTimeout(() => {}, 1000);
  }

  const handleButton = (e) => {
    if (e === "break-decrement" && breakLength > 1) {
      setBreakLength(breakLength - 1);
    } else if (e === "break-increment" && breakLength < 60) {
      setBreakLength(breakLength + 1);
    } else if (e === "session-decrement" && sessionLength > 1) {
      setSessionLength(sessionLength - 1);
    } else if (e === "session-increment" && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
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
                onClick={() => handleButton("break-decrement")}
                id="break-decrement"
              >
                -
              </Button>
              <div id="break-length">{breakLength}</div>
              <Button
                id="break-increment"
                onClick={() => handleButton("break-increment")}
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
                onClick={() => handleButton("session-decrement")}
              >
                -
              </Button>
              <div id="session-length">{sessionLength}</div>
              <Button
                id="session-increment"
                onClick={() => handleButton("session-increment")}
              >
                +
              </Button>
            </ButtonContainer>
          </div>
        </InputContainer>
      </div>
      <div>
        <Label id="timer-label">Session</Label>
        <div id="time-left">{timer}</div>
      </div>
      <div>
        <Button id="start_stop" onClick={() => setIsRunning(!isRunning)}>
          Start/Stop
        </Button>
        <Button id="reset">Reset</Button>
      </div>
    </Container>
  );
}

export default App;
