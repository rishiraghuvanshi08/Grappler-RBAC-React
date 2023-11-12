import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHeirarchyData } from "../Slices/HierachySlice";
import { useEffect } from "react";
import { useDrop } from "react-dnd";

import {
  Box,
  Badge,
  Avatar,
  IconButton,
  Icon,
  Collapse,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon, WarningIcon } from "@chakra-ui/icons";

function Organization({ org, onCollapse }) {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "",
    drop: () => ({ name: org.name, designation: org.designation }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = canDrop && isOver;
  let backgroundColor = "white";
  if (isActive) {
    backgroundColor = "#ddffd2";
  } else if (canDrop) {
    backgroundColor = "#ffeedc";
  }
  return (
    <Box
      variant="outline"
      className="card"
      ref={drop}
      bg={backgroundColor}
      p={4}
      border="1px solid #ccc"
      borderRadius="md"
    >
      <Box
        display="flex"
        alignItems="center"
        onClick={onCollapse}
        cursor="pointer"
      >
        <Badge colorScheme="red" variant="subtle" fontSize="14px">
          {org?.subordinates.length}
        </Badge>
        <Avatar backgroundColor="#ECECF4" icon={<Icon as={WarningIcon} />} />
        <Text ml={2} fontSize="16px">
          {org?.name} ({org?.designation})
        </Text>
        {onCollapse && (
          <IconButton
            size="sm"
            ml="auto"
            variant="unstyled"
            onClick={onCollapse}
            icon={<Icon as={org.collapsed ? ChevronDownIcon : ChevronUpIcon} />}
          />
        )}
      </Box>
    </Box>
  );
}

function Node({ org, onCollapse }) {
  return (
    <VStack align="stretch" spacing={2}>
      <Organization org={org} onCollapse={onCollapse} />
      <Collapse in={!org.collapsed}>
        {/* {org.subordinates.map((subordinate) => (
          <Node key={subordinate.id} org={subordinate} />
        ))} */}
      </Collapse>
    </VStack>
  );
}

export default function HierachyTemp(props) {
  const { hierarchy } = useSelector((state) => state.viewHierarchy);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHeirarchyData());
  }, [dispatch]);

  return (
    <Box bg="gray.100" p={4}>
      <Node org={hierarchy} />
    </Box>
  );
}
