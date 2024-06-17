import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const UiTable = ({ operators, onOpen, setSelectedOperatorId }) => {
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
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UiTable;
