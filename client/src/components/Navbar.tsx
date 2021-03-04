import {
  Box,
  Heading,
  Text,
  Avatar,
  Flex,
  Spacer,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from "@chakra-ui/react";
import * as React from "react";
import { Link } from "react-router-dom";
// icons
import { FiChevronDown } from "react-icons/fi";
import { GoThreeBars } from "react-icons/go";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
// Redux action
import { logoutUser } from "../slices/auth/loginSlice";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<any>();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.login);
  if (userInfo._id.length === 0) {
    return (
      <Box bgGradient="linear(to-r,red.300,purple.300)">
        <Flex align="center" w={{ base: "90%", md: "100%" }}>
          <Flex align="center" p={4} w={{ base: "90%", md: "75%" }} mx="auto">
            <Heading>SNS</Heading>
          </Flex>
        </Flex>
      </Box>
    );
  }
  return (
    <Box bgGradient="linear(to-r,red.300,purple.300)">
      <Flex align="center" w={{ base: "90%", md: "100%" }}>
        <Flex align="center" p={4} w={{ base: "90%", md: "75%" }} mx="auto">
          <Heading cursor="pointer">
            <Link to="/dashboard">SNS</Link>
          </Heading>
          <Spacer />
          <Flex align="center" display={{ base: "none", md: "flex" }}>
            <Avatar name={userInfo.name}></Avatar>
            <Box ml={4}>
              <Menu>
                <MenuButton
                  colorScheme="transparent"
                  variant="ghost"
                  as={Button}
                  rightIcon={<FiChevronDown />}
                >
                  <Text casing="capitalize">Hi {userInfo.name}</Text>
                </MenuButton>
                <MenuList colorScheme="red" bg="red.100">
                  <MenuItem>
                    <Link to="/home">Dein Profil</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/profiles">Andere Profile</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/dashboard">Dashboard</Link>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(logoutUser())}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Flex>
        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            colorScheme="transparent"
            color="red.700"
            size="lg"
            fontSize="2xl"
            aria-label="burger"
            icon={<GoThreeBars />}
            ref={btnRef}
            onClick={onOpen}
          ></IconButton>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                  <Flex align="center">
                    <Avatar name={userInfo.name}></Avatar>
                    <Text casing="capitalize" ml={2}>
                      Hi {userInfo.name}
                    </Text>
                  </Flex>
                </DrawerHeader>

                <DrawerBody>
                  <Text
                    fontSize="xl"
                    transition="0.3s"
                    _hover={{ color: "red.400", ml: "1" }}
                    my={2}
                    cursor="pointer"
                    onClick={onClose}
                  >
                    <Link to="/home">Dein Profil</Link>
                  </Text>
                  <Text
                    fontSize="xl"
                    transition="0.3s"
                    _hover={{ color: "red.400", ml: "1" }}
                    my={2}
                    cursor="pointer"
                    onClick={onClose}
                  >
                    <Link to="/profiles">Andere Profile</Link>
                  </Text>
                  <Text
                    fontSize="xl"
                    transition="0.3s"
                    _hover={{ color: "red.400", ml: "1" }}
                    my={2}
                    cursor="pointer"
                    onClick={onClose}
                  >
                    <Link to="/dashboard">Dashboard</Link>
                  </Text>
                  <Text
                    fontSize="xl"
                    transition="0.3s"
                    _hover={{ color: "red.400", ml: "1" }}
                    my={2}
                    cursor="pointer"
                    onClick={() => {
                      // eslint-disable-next-line
                      onClose;
                      dispatch(logoutUser());
                    }}
                  >
                    Logout
                  </Text>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Box>
      </Flex>
    </Box>
  );
};
export default Navbar;
