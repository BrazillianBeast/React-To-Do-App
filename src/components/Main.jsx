import { Text, Input, Box, Flex, Heading, ButtonGroup, Spacer,Center, Image, Button, List, ListItem, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { MdCheckCircle } from "react-icons/md";

// import "./Main.css";
import GirlLogo from "../assets/img/logo.jpg";

function Main() {
  const [toDoTask, setToDoTask] = useState("");
  const [toDoList, setToDoList] = useState([]);

  let nextId = 0;

  [
    'Do some coffee',
    'Drink watter',
    'Study a little bit',
  ]

  function HandleTask(e) {
    setToDoTask(e.target.value);
  }

  // function HandleAddTask(){

  // }

  return (
    <Box overflow="hidden" bg="gray.900" w="100vw" h="100vh">
      {/* <img className="logo" src={reactLogo} height="250px" alt="Girl"/> */}
      <Box p="10" mt="10">
        <Center>
          <Image
            src={GirlLogo}
            alt="Woman using her notebook"
            boxSize={"250"}
            borderRadius="full"
          />
        </Center>
        <Center>
          <Text fontSize="4xl" color="gray.100" p="6">
            Your To Do List
          </Text>
        </Center>
        <Center>
          <Input
            w="50%"
            mt="4"
            size="md"
            variant="filled"
            bg="blackAlpha.600"
            _hover={{ bg: "blackAlpha.400" }}
            color="gray.100"
            placeholder="New Task"
            onChange={HandleTask}
            // _placeholder={{ opacity: 0.4, color: 'inherit' }}
          />
          <Button
            mt="4"
            ml="2"
            colorScheme="purple"
            variant="outline"
            _hover={{ bg: "blackAlpha.400" }}
            onClick={()=> {
              setToDoList([
                ...toDoList,
                { id: nextId++, toDoTask: toDoTask }
              ])
            }}

          >
            <ArrowForwardIcon />
          </Button>
        </Center>
      </Box>

            <List>
              {toDoList.map(toDoList => (
                <ListItem key={toDoList.toDoTask}>

                  <Flex alignItems='center' justify='center'>
                    <Flex minWidth='max-content' alignItems='center' gap='2' w='60%'>
                      <Box p='5'>
                        <Text fontSize="lg" color="gray.200" maxW='300'>
                          {toDoList.toDoTask}
                        </Text>
                      </Box>
                      <Spacer />
                      <Box p='5'>
                        <Text fontSize="lg" color="gray.200">
                          Done
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>

                </ListItem>
              ))}
            </List>
    </Box>
  );
}

export default Main;
