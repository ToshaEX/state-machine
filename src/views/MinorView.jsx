import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { UiMinorTable } from "./../components/UiMinorTable";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMinor } from "../feature/operators/operatorsSlice";

const Minor = ({ selectedOperatorId, operatorsState }) => {
  const [nickName, setNickName] = useState("");
  const [hashRate, setHashRate] = useState(0);
  const [valuation, setValuation] = useState(0);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!(!!nickName && hashRate && valuation)) return;
    dispatch(
      addMinor({
        operatorId: selectedOperatorId,
        minorData: {
          id: operatorsState.minorsTotal,
          nickName,
          hashRate: +hashRate,
          valuation: +valuation,
        },
      }),
    );
    setHashRate(0);
    setNickName("");
    setValuation(0);
  };

  return (
    <>
      <Box
        padding={"1rem"}
        border={"solid"}
        marginRight={"1rem"}
        rounded={"1rem"}
        maxW={"350px"}
      >
        <Text mb="16px">ID: {"#4"}</Text>
        <Flex direction={"column"} gap={"1rem"}>
          <Input
            key={"nickName"}
            value={nickName}
            onChange={(e) => {
              setNickName(() => e.target.value);
            }}
            name={"nickName"}
            placeholder="Minor Nick name"
            size="sm"
          />
          <Input
            key={"hashRate"}
            value={hashRate}
            onChange={(e) => setHashRate(e.target.value)}
            type="number"
            name={"hashRate"}
            placeholder="Hash Rate"
            size="sm"
          />
          <Input
            key={"valuation"}
            value={valuation}
            type="number"
            onChange={(e) => setValuation(e.target.value)}
            placeholder="Valuation"
            name={"valuation"}
            size="sm"
          />
        </Flex>
      </Box>
      <CreateButton handleSubmit={handleSubmit} />
    </>
  );
};

const CreateButton = ({ handleSubmit }) => (
  <Button
    onClick={() => {
      handleSubmit();
    }}
  >
    {"Add minor"}
  </Button>
);

const MinorView = ({ selectedOperatorId }) => {
  const operatorsState = useSelector((state) => state.operator);

  return (
    <Flex direction={"column"} justifyContent={"center"} alignItems={"center"}>
      <Heading
        as="h1"
        size={"xl"}
        textAlign={"center"}
        paddingTop={"4rem"}
        textColor="teal"
      >
        {` #${selectedOperatorId}`}
      </Heading>
      <Flex justifyContent={"center"} alignItems={"center"} paddingTop={"2rem"}>
        <Minor
          selectedOperatorId={selectedOperatorId}
          operatorsState={operatorsState}
        />
      </Flex>
      <UiMinorTable
        data={
          operatorsState.operators.find((ele) => ele.id === selectedOperatorId)
            .minors
        }
      />
    </Flex>
  );
};

export default MinorView;
