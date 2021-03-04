import {
  Box,
  Text,
  Badge,
  Button,
  Flex,
  IconButton,
  ButtonGroup
} from "@chakra-ui/react";
import * as React from "react";
import Moment from "react-moment";
import "moment/locale/de";
// components
// Redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";
// redux action
import { deleteExp, deleteEdu } from "../slices/profile/profileSlice";
import { FaTrash } from "react-icons/fa";
const Profile = () => {
  const { profileInfo } = useSelector((state: RootState) => state.profile);
  const { userInfo } = useSelector((state: RootState) => state.login);
  // console.log(profileInfo);
  // Object.keys(profileInfo!).map((key, index) => {
  //   console.log(key);
  // });
  const dispatch = useDispatch();

  return (
    <Box my={8}>
      <Text casing="capitalize">
        <Text fontWeight="semibold" color="purple.500" as="span">
          Name:
        </Text>{" "}
        {userInfo.name}
      </Text>
      <Text>
        <Text fontWeight="semibold" color="purple.500" as="span">
          Email:
        </Text>{" "}
        {userInfo.email}
      </Text>

      {/* company */}
      <Text>
        <Text fontWeight="semibold" color="purple.500" as="span">
          Firma:
        </Text>{" "}
        {profileInfo?.company}
      </Text>
      {/* location */}
      <Text>
        <Text fontWeight="semibold" color="purple.500" as="span">
          Ort:
        </Text>{" "}
        {profileInfo?.location}
      </Text>
      {/* bio */}
      <Text>
        <Text fontWeight="semibold" color="purple.500" as="span">
          Beschreibung:
        </Text>{" "}
        {profileInfo?.bio}
      </Text>
      {/* git */}
      <Text>
        <Text fontWeight="semibold" color="purple.500" as="span">
          Github:
        </Text>{" "}
        {profileInfo?.githubusername}
      </Text>
      {/* status */}
      <Text casing="capitalize">
        <Text fontWeight="semibold" color="purple.500" as="span">
          Status:
        </Text>{" "}
        {profileInfo?.status}
      </Text>
      {/* website */}
      <Text>
        <Text fontWeight="semibold" color="purple.500" as="span">
          Website:
        </Text>{" "}
        {profileInfo?.website}
      </Text>
      {/* skills */}

      <Text>
        <Text fontWeight="semibold" color="purple.500" as="span">
          Fähigkeiten:
        </Text>{" "}
        {profileInfo?.skills?.map((skill, index) => {
          return (
            <Badge mx={2} colorScheme="red" key={index}>
              {skill}
            </Badge>
          );
        })}
      </Text>

      {/* Edu */}

      <Text>
        <Text fontWeight="semibold" color="purple.500" as="span">
          Bildung:
        </Text>{" "}
        {profileInfo?.education?.length === 0 && (
          <Text>Noch keine Einträge</Text>
        )}
        {profileInfo?.education?.map((edu, index) => {
          // console.log(edu.current);
          return (
            <Box
              key={edu._id}
              border="4px"
              p={6}
              borderRadius="xl"
              borderColor="purple.500"
              my={4}
              position="relative"
            >
              <IconButton
                colorScheme="red"
                position="absolute"
                top="5px"
                right="5px"
                aria-label="delete"
                icon={<FaTrash />}
                onClick={() => {
                  dispatch(deleteEdu({ id: edu._id }));
                }}
              ></IconButton>
              <Text>Schule {edu.school}</Text>
              <Text>Abschulss {edu.degree}</Text>
              <Flex>
                <Text>
                  <Text as="ins">Von</Text>{" "}
                  <Moment locale="de" format="Do MMMM YYYY">
                    {edu.from}
                  </Moment>
                </Text>
                <Text ml={2}>
                  <Text as="ins">bis</Text>{" "}
                  {edu.current ? (
                    "Jetzt"
                  ) : (
                    <Moment locale="de" format="Do MMMM YYYY">
                      {edu.to}
                    </Moment>
                  )}
                </Text>
              </Flex>
              <Text>{edu.description}</Text>
            </Box>
          );
        })}
      </Text>

      {/* Exp */}

      <Text>
        <Text fontWeight="semibold" color="red.500" as="span">
          Erfahrungen:
        </Text>{" "}
        {profileInfo?.experience?.length === 0 && (
          <Text>Noch keine Einträge</Text>
        )}
        {profileInfo?.experience?.map((exp, index) => {
          // console.log(edu.current);
          return (
            <Box
              key={exp._id}
              border="4px"
              p={6}
              borderRadius="xl"
              borderColor="red.500"
              my={4}
              position="relative"
            >
              <IconButton
                colorScheme="purple"
                position="absolute"
                top="5px"
                right="5px"
                aria-label="delete"
                icon={<FaTrash />}
                onClick={() => {
                  dispatch(deleteExp({ id: exp._id }));
                }}
              ></IconButton>
              <Text>Titel {exp.title}</Text>
              <Text>Firma {exp.company}</Text>
              <Flex>
                <Text>
                  <Text as="ins">Von</Text>{" "}
                  <Moment locale="de" format="Do MMMM YYYY">
                    {exp.from}
                  </Moment>
                </Text>
                <Text ml={2}>
                  <Text as="ins">bis</Text>{" "}
                  {exp.current ? (
                    "Jetzt"
                  ) : (
                    <Moment locale="de" format="Do MMMM YYYY">
                      {exp.to}
                    </Moment>
                  )}
                </Text>
              </Flex>
              <Text>{exp.description}</Text>
            </Box>
          );
        })}
      </Text>
      {/* <Grid
        templateColumns={{ base: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
        gap={{ base: "2", md: "4" }}
        mt={8}
      > */}
      <ButtonGroup>
        <Button size="md" colorScheme="purple" variant="outline">
          <Link to="/profileedit">Profil bearbeiten</Link>
        </Button>
        <Button size="md" colorScheme="purple">
          <Link to="/createEdu">Bildung hinzufügen</Link>
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button
          ml={{ base: "0", md: "2" }}
          mt={{ base: "4", md: "0" }}
          size="md"
          colorScheme="purple"
        >
          <Link to="/createExp">Erfahrungen hinzufügen</Link>
        </Button>
      </ButtonGroup>
      {/* <Button
          onClick={() => {
            if (
              window.confirm("Es gibt kein zurück mehr! Bist du dir sicher?")
            ) {
              dispatch(deleteProfile({ id: profileInfo?._id! }));
            }
          }}
          colorScheme="red"
        >
          Account löschen
        </Button> */}
      {/* </Grid> */}
    </Box>
  );
};
export default Profile;
