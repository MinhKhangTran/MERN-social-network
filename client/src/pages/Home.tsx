import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import * as React from "react";

// components
import Profile from "../components/Profile";
import ProfileCreate from "../components/ProfileCreate";

import { getProfileOfLoggedUser } from "../slices/profile/profileSlice";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

// if user has a profile then show home else show profile to create one
// error message: Es gibt noch kein Profile zu diesem User
const Home = () => {
  const dispatch = useDispatch();

  const { profileInfo, loading } = useSelector(
    (state: RootState) => state.profile
  );
  const { userInfo } = useSelector((state: RootState) => state.login);
  React.useEffect(() => {
    dispatch(getProfileOfLoggedUser());
  }, [dispatch]);

  // console.log(typeof profileInfo, profileInfo);
  if (loading) {
    return <Spinner />;
  }
  return (
    <Box>
      {profileInfo === null ? (
        <Heading my={6}>
          Hi{" "}
          <Text casing="capitalize" as="span">
            {userInfo.name}
          </Text>
        </Heading>
      ) : (
        <Heading my={6}>Dein Profil</Heading>
      )}

      {profileInfo === null ? <ProfileCreate /> : <Profile />}
    </Box>
  );
};
export default Home;
