import React from "react";
import {

  Box,
  Flex,

  Heading,
  Checkbox,
  Select,
  useColorMode
} from "@chakra-ui/core";
import { useSelector } from "react-redux";
import FilterFields from "./FilterFields";

const Filters = () => {
  const { width, bp1 } = useSelector((state) => state.resize);
  const { colorMode } = useColorMode();

  const filtersWidth = width > bp1 ? "270px" : "100%";
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      position="fixed"
      right="0"
      top="0"
      width={filtersWidth}
      // boxShadow={width > bp1 ? "0px 0px 15px -5px rgba(0,0,0,0.75)" : ""}
      backgroundColor={colorMode === "light" ? "white" : "gray.800"}
    >
      <Flex
        alignItems="center"
        height="50px"
        borderBottom="1px solid lightgray"
      >
        <Heading margin="0 10px" as="h3" fontSize="xl">
          Filters
        </Heading>
      </Flex>

      <Box height="100vh" overflowY="auto" padding="1rem">
        <FilterFields name="Select a range"></FilterFields>
        <FilterFields name="Category">
          <Select placeholder="Select Category">
            <option value="feeding">Feeding</option>
            <option value="clothing">Clothing</option>
            <option value="entertainment">Entertainment</option>
          </Select>
        </FilterFields>
        <FilterFields name="Cashflow">
          <Checkbox variantColor="blue">Income</Checkbox>
          <Checkbox variantColor="primary">Expense</Checkbox>
        </FilterFields>
        <FilterFields name="Payment Mode">
          <Checkbox variantColor="primary">Cash</Checkbox>
          <Checkbox variantColor="primary">Credit card</Checkbox>
          <Checkbox variantColor="primary">Debit card</Checkbox>
        </FilterFields>
        <FilterFields name="Amount"></FilterFields>
      </Box>
    </Box>
  );
};

export default Filters;
