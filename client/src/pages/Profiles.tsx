import * as React from "react";
import {
  Box,
  Heading,
  Text,
  useMediaQuery,
  Spinner,
  Flex,
  Icon,
  Badge
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
// redux
import { getProfiles } from "../slices/profile/profileSlice";
import { RootState } from "../store";
// icons
import { MdWork, MdLocationOn, MdPerson } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
// router
import { Link } from "react-router-dom";

const Profiles = () => {
  const [lessThan782] = useMediaQuery("(max-width: 782px)");
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector(
    (state: RootState) => state.profile
  );
  React.useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);
  if (loading) {
    return (
      <Box>
        <Spinner color="red.400" my={8}></Spinner>
      </Box>
    );
  }
  return (
    <Box>
      <Heading color="red.400" my={8}>
        Personen, die du vielleicht kennst
      </Heading>
      {profiles?.map((profile) => {
        const {
          user,
          bio,
          company,
          status,
          location,
          website,
          skills,
          _id
        } = profile;
        return (
          <Box
            p={6}
            bgGradient="linear(to-tl,purple.100,red.50)"
            my={6}
            borderRadius="xl"
            boxShadow="md"
            _hover={{ boxShadow: "xl" }}
            transition="0.3s"
            cursor="pointer"
          >
            <Link to={`/profiles/${_id}`}>
              <Text
                color="red.600"
                fontSize="xl"
                fontWeight="bold"
                casing="capitalize"
              >
                {user.name}
              </Text>
              <Flex color="red.300">
                {company && (
                  <Text mr={1.5}>
                    <Icon as={MdWork} /> {company}
                  </Text>
                )}

                {location && (
                  <Text mr={1.5}>
                    <Icon as={MdLocationOn} /> {location}
                  </Text>
                )}
                {!lessThan782 && (
                  <>
                    {status && (
                      <Text casing="capitalize" mr={1.5}>
                        <Icon as={MdPerson} /> {status}
                      </Text>
                    )}
                    {website && (
                      <Text mr={1.5}>
                        <Icon as={CgWebsite} /> {website}
                      </Text>
                    )}
                  </>
                )}
                {/*  */}
              </Flex>
              <Text fontSize="xl">{bio}</Text>
              {skills?.map((skill, i) => {
                return (
                  <Badge mr={1.5} key={i} colorScheme="purple">
                    {skill}
                  </Badge>
                );
              })}
            </Link>
          </Box>
        );
      })}
    </Box>
  );
};
export default Profiles;
