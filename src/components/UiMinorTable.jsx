import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export const UiMinorTable = ({ data }) => {
  return (
    <TableContainer margin={"1rem"}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nick Name</Th>
            <Th isNumeric>Hash Rate</Th>
            <Th isNumeric>Valuation </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((miner, i) => (
            <Tr key={`miner-#${i}`}>
              <Td>#{miner?.id}</Td>
              <Td>{miner?.nickName}</Td>
              <Td isNumeric>{miner?.hashRate}</Td>
              <Td isNumeric>{miner?.valuation}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
