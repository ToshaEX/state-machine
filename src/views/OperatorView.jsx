import { useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  Flex,
  Heading,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import UiTable from "./../components/UiTable";
import { useDispatch, useSelector } from "react-redux";
import { addOperator, simulate } from "../feature/operators/operatorsSlice";
import MinorView from "./MinorView";

const Operator = ({ operatorId, operatorName, handleChange }) => (
  <Box padding={"1rem"} border={"solid"} marginRight={"1rem"} rounded={"1rem"}>
    <Text mb="16px">ID: {`#${operatorId}`}</Text>
    <Input
      value={operatorName}
      onChange={handleChange}
      placeholder="Nick name"
      size="sm"
    />
  </Box>
);

const CreateButton = ({ dispatch, operatorName, id, setOperatorName }) => (
  <Button
    onClick={() => {
      dispatch(addOperator({ id, nickName: operatorName }));
      setOperatorName("");
    }}
  >
    {"Create Operator"}
  </Button>
);

const SimulateButton = ({ dispatch }) => (
  <Button
    variant={"outline"}
    colorScheme={"teal"}
    margin={"1rem"}
    onClick={() => {
      dispatch(simulate());
    }}
  >
    {"Simulate"}
  </Button>
);

const OperatorView = () => {
  const [operatorName, setOperatorName] = useState("");
  const [selectedOperatorId, setSelectedOperatorId] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const operatorsState = useSelector((state) => state.operator);

  const handleChange = (e) => {
    setOperatorName(e.target.value);
  };

  return (
    <>
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Heading
          as="h1"
          size={"xl"}
          textAlign={"center"}
          paddingTop={"4rem"}
          textColor="teal"
        >
          {"Taxing Simulator for Bitcoin"}
        </Heading>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          paddingTop={"2rem"}
        >
          <Operator
            operatorName={operatorName}
            handleChange={handleChange}
            operatorId={operatorsState.operatorCount}
          />
          <CreateButton
            dispatch={dispatch}
            operatorName={operatorName}
            id={operatorsState.operatorCount}
            setOperatorName={setOperatorName}
          />
        </Flex>
        <UiTable
          operators={operatorsState.operators}
          onOpen={onOpen}
          setSelectedOperatorId={setSelectedOperatorId}
        />
        <SimulateButton dispatch={dispatch} />
      </Flex>
      <Drawer onClose={onClose} isOpen={isOpen} size={"xl"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`drawer contents`}</DrawerHeader>
          <DrawerBody>
            <MinorView selectedOperatorId={selectedOperatorId} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default OperatorView;
