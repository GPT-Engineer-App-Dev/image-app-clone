import { useState, useEffect } from "react";
import { Box, Button, Container, Text, VStack, HStack, useColorModeValue } from "@chakra-ui/react";

const Index = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [splits, setSplits] = useState([]);
  const [on, setOn] = useState(true);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  const handleStartStop = () => {
    setRunning(!running);
  };

  const handleSplitReset = () => {
    if (running) {
      setSplits([...splits, time]);
    } else {
      setTime(0);
      setSplits([]);
    }
  };

  const handleOnOff = () => {
    setOn(!on);
    if (!on) {
      setTime(0);
      setSplits([]);
      setRunning(false);
    }
  };

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const bgColor = useColorModeValue("black", "black");
  const textColor = useColorModeValue("yellow.400", "yellow.400");

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} bg={bgColor} p={8} borderRadius="lg" boxShadow="lg">
        <Text fontSize="6xl" color={textColor} fontFamily="monospace">
          {formatTime(time)}
        </Text>
        <HStack spacing={4}>
          <Button colorScheme="yellow" onClick={handleStartStop}>
            {running ? "Stop" : "Start"}
          </Button>
          <Button colorScheme="yellow" onClick={handleSplitReset}>
            {running ? "Split" : "Reset"}
          </Button>
          <Button colorScheme="yellow" onClick={handleOnOff}>
            {on ? "Off" : "On"}
          </Button>
        </HStack>
        {splits.length > 0 && (
          <VStack spacing={2} mt={4}>
            {splits.map((split, index) => (
              <Text key={index} color={textColor} fontFamily="monospace">
                Split {index + 1}: {formatTime(split)}
              </Text>
            ))}
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Index;