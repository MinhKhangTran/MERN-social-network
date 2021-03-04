import * as React from "react";
import { Box, Text, Spinner, Flex, Badge } from "@chakra-ui/react";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
// redux
import { getProfilesByID } from "../slices/profile/profileSlice";
import { RootState } from "../store";

// router
import { useParams } from "react-router-dom";

const SingleProfile = () => {
  // type for params
  interface IParams {
    id: string;
  }
  const { id } = useParams<IParams>();
  const dispatch = useDispatch();
  const { singleProfile, loading } = useSelector(
    (state: RootState) => state.profile
  );

  React.useEffect(() => {
    dispatch(getProfilesByID({ _id: id }));
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box>
        <Spinner color="red.400" my={8}></Spinner>
      </Box>
    );
  }
  return (
    <Box my={8}>
      <Text casing="capitalize">
        <Text fontWeight="semibold" color="purple.500" as="span">
          Name:
        </Text>{" "}
        {singleProfile?.user.name}
      </Text>

      {/* company */}
      <Text>
        <Text fontWeight="semibold" color="purple.500" as="span">
          Firma:
        </Text>{" "}
        {singleProfile?.company}
      </Text>
      {/* location */}
      <Text>
        <Text fontWeight="semibold" color="purple.500" as="span">
          Ort:
        </Text>{" "}
        {singleProfile?.location}
      </Text>
      {/* bio */}
      <Text>
        <Text fontWeight="semibold" color="purple.500" as="span">
          Beschreibung:
        </Text>{" "}
        {singleProfile?.bio}
      </Text>
      {/* git */}
      <Text>
        <Text fontWeight="semibold" color="purple.500" as="span">
          Github:
        </Text>{" "}
        {singleProfile?.githubusername}
      </Text>
      {/* status */}
      <Text casing="capitalize">
        <Text fontWeight="semibold" color="purple.500" as="span">
          Status:
        </Text>{" "}
        {singleProfile?.status}
      </Text>
      {/* website */}
      <Text>
        <Text fontWeight="semibold" color="purple.500" as="span">
          Website:
        </Text>{" "}
        {singleProfile?.website}
      </Text>
      {/* skills */}

      <Text>
        <Text fontWeight="semibold" color="purple.500" as="span">
          Fähigkeiten:
        </Text>{" "}
        {singleProfile?.skills?.map((skill, index) => {
          return (
            <Badge mr={2} colorScheme="red" key={index}>
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
        {singleProfile?.education?.length === 0 && (
          <Text>Noch keine Einträge</Text>
        )}
        {singleProfile?.education?.map((edu, index) => {
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
        {singleProfile?.experience?.length === 0 && (
          <Text>Noch keine Einträge</Text>
        )}
        {singleProfile?.experience?.map((exp, index) => {
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
    </Box>
  );
};
export default SingleProfile;
