import React from "react";
import { Flex, Heading } from "@chakra-ui/core";

const NotFound = () => {
  return (
    <Flex  alignItems="center"  direction="column" justifyContent="center" height="100vh">
      <Heading size="xl">404</Heading>
      <h3>We couldn{"'"}t find the page you{"'"}re looking for</h3>
      <h4>The Sadness...</h4>
    </Flex>
  )
}

export default NotFound
