import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from "@chakra-ui/react";

const REWARD_POTION_VARIABLE_HONNEST =0.2;
const REWARD_POTION_VARIABLE_UNPREDICTABLE =0.3;
const REWARD_POTION_VARIABLE_SELFISH =0.5;



import { useSelector } from "react-redux";
  
    const UiSimulateTable = ({ operators, onOpen, setSelectedOperatorId }) => {
    const operatorsState =useSelector((state) => state.operator)

    return (
      <TableContainer margin={"1rem"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nick Name</Th>
              <Th>Operator Behaviour</Th>
              <Th isNumeric>Computational Power</Th>
              <Th isNumeric>Total Minors</Th>
              <Th isNumeric>Operator Resource Tax</Th>
              <Th isNumeric>Reward Distribution Tax</Th>
            </Tr>
          </Thead>
          <Tbody>
            {operators?.map((operator, i) => (
              <Tr
                _hover={{ background: "#FAFAFA" }}
                cursor={"pointer"}
                key={`operator-#${i}`}
                onClick={() => {
                  setSelectedOperatorId(operator?.id);
                  onOpen();
                }}
              >
                <Td>#{operator?.id}</Td>
                <Td>{operator?.nickName}</Td>
                <Td>{operator?.operatorBehavior}</Td>
                <Td isNumeric>
                  {operator?.minors.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.hashRate,
                    0,
                  )}
                </Td>
                <Td isNumeric>{operator?.minors.length}</Td>
                <Td isNumeric>{((( operator?.totalComputationalPower-operatorsState.poolOperatorAvgHash)/100)*(0.05)).toFixed(2)}%</Td>
                <Td isNumeric>{ Math. abs((operator.potionRate-(operatorsState.totalpotionRate/operatorsState.operators.length)).toFixed(2))}%</Td>
              </Tr>
            ))}
              {console.log(operators)}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };
  
  export default UiSimulateTable;
  