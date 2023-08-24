import { Text, Input, Box, Flex,Center, Image, Button, List, ListItem, HStack } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { MdDelete, MdEdit } from "react-icons/md";

// import "./Main.css";
import GirlLogo from "../assets/img/logo.jpg";

function Main() {
  const inputRef = useRef(null);
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('items') || []));
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState("");


  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
    console.log("Devo salvar");
  }, [items]);

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      AddItem();
    }
};

  function AddItem() {

    if (editing === true){
      console.log("I will edit this item")

      const item = {
        id: editingId,
        value: newItem,
        completed: false
      }

      const update = items.map(existingItem => existingItem.id === item.id
      ? item
      : existingItem)
      setItems(update)

      setEditing(false);
      setEditingId("");

      setNewItem("");

    }
    else {
      const item = {
        id: Math.floor(Math.random() * 1000),
        value: newItem,
        completed: false
      };

      setItems(oldList => [...oldList, item]);

      setNewItem("");
    }
  }

  function HandleEdit(id, value){
    console.log('Edit', id);
    setNewItem(value);
    inputRef.current.focus();
    setEditingId(id);
    setEditing(true);

  }

  function HandleDelete(id){
    const newArray = items.filter(item => item.id !== id);
    setItems(newArray);
  }

  function handleComplete(id){
    const updated = items.map(item => item.id === id ? {
      ...item, completed: !item.completed} : item
    )

    setItems(updated);
  }

  return (
    <Box overflow="hidden" bg="gray.900" w="100vw" h="100vh">
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
          <Text fontSize="4xl" color="gray.100" p="6" as="em">
            To-do List
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
            type="text"
            placeholder="Add an item..."
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            onKeyUp={handleKeypress}
            ref={inputRef}
            name="toDoInput"
          />
          <Button
            mt="4"
            ml="2"
            colorScheme="purple"
            variant="outline"
            _hover={{ bg: "blackAlpha.400" }}
            onClick={()=> AddItem()}
          >
            <ArrowForwardIcon />
          </Button>
        </Center>
      </Box>
      <List>
        {items.map(item => {
          return(
            <ListItem key={item.id} _hover={{ bg: "blackAlpha.400" }}>
              <HStack direction='row' justify='space-between' maxW='50%' ml='25%' mr='25%'>
                <Box as="button">
                <Text fontSize="lg"color={`${item.completed ? "gray.500" : "gray.200"}`} maxW='300' as={`${item.completed ? "s" : ""}`} onClick={()=> handleComplete(item.id)}>
                  {item.value}
                </Text>
                </Box>
                <Flex py='2'>
                  <Button
                    mr='4'
                    colorScheme="purple"
                    variant="outline"
                    _hover={{ bg: "blackAlpha.600" }}
                    onClick={()=> HandleEdit(item.id, item.value)}
                    >
                      <MdEdit/>
                  </Button>
                  <Button
                            colorScheme="pink"
                            variant="outline"
                            _hover={{ bg: "blackAlpha.600" }}
                            onClick={()=> HandleDelete(item.id)}>
                              <MdDelete/>
                  </Button>
                </Flex>
              </HStack>
            </ListItem>
          )
        })}
      </List>
    </Box>
  );
}

export default Main;
