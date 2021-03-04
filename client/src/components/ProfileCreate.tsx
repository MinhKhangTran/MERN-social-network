import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  FormHelperText,
  Textarea
} from "@chakra-ui/react";
import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// components
// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
// redux actions
import { createProfile } from "../slices/profile/profileSlice";

const ProfileCreate = () => {
  const {
    userInfo: { name, email }
  } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  const initialValues = {
    name,
    email,
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    githubusername: "",
    social: {
      youtube: "",
      twitter: "",
      facebook: "",
      instagram: ""
    }
  };

  const validation = () =>
    Yup.object({
      company: Yup.string(),
      website: Yup.string(),
      location: Yup.string(),
      status: Yup.string().required("Bitte geben Sie einen Status ein"),
      skills: Yup.string().required("Bitte geben sie mindestens 3 ein"),
      bio: Yup.string(),
      githubusername: Yup.string(),

      youtube: Yup.string(),
      twitter: Yup.string(),
      facebook: Yup.string(),
      instagram: Yup.string()
    });
  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit: (daten, { resetForm }) => {
      // console.log(daten);
      dispatch(createProfile(daten));
    }
  });
  return (
    <Box>
      <Heading mt={6} color="red.400">
        Erstelle ein Profil
      </Heading>
      <Text>Erzähl etwas von dir</Text>
      <form onSubmit={formik.handleSubmit}>
        <Box mt={4}>
          {/* Name */}
          <FormControl isDisabled>
            <FormLabel>Name</FormLabel>
            <Input
              variant="flushed"
              type="text"
              {...formik.getFieldProps("name")}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          {/* Email */}
          <FormControl isDisabled>
            <FormLabel>Email</FormLabel>
            <Input
              variant="flushed"
              type="text"
              {...formik.getFieldProps("email")}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          {/* Company */}
          <FormControl id="company" mt={4}>
            <FormLabel>Firma</FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="Beste Firma GmBH"
              {...formik.getFieldProps("company")}
            />
          </FormControl>

          {/* Website */}
          <FormControl id="website" mt={4}>
            <FormLabel>Website</FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="https//:www.besteSeite.de"
              {...formik.getFieldProps("website")}
            />
          </FormControl>

          {/* location */}
          <FormControl id="location" mt={4}>
            <FormLabel>Ort</FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="bester Ort"
              {...formik.getFieldProps("location")}
            />
          </FormControl>

          {/* Status */}
          <FormControl
            isInvalid={!!formik.errors.status && formik.touched.status}
            id="status"
            mt={4}
          >
            <FormLabel>Status</FormLabel>
            <Select
              variant="flushed"
              type="text"
              placeholder="Status"
              {...formik.getFieldProps("status")}
            >
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
              <option value="ceo">CEO</option>
              <option value="cto">CTO</option>
              <option value="praktikant">Praktikant</option>
              <option value="anderes">Anderes</option>
            </Select>
            <FormErrorMessage>{formik.errors.status}</FormErrorMessage>
          </FormControl>
          {/* SKills */}
          <FormControl
            isInvalid={!!formik.errors.skills && formik.touched.skills}
            id="skills"
            mt={4}
          >
            <FormLabel>Fähigkeiten </FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="html, css, js"
              {...formik.getFieldProps("skills")}
            />
            <FormHelperText>Mit Komma getrennt</FormHelperText>

            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
          {/* Bio */}
          <FormControl id="bio" mt={4}>
            <FormLabel>Kurze Beschreibung deiner Person</FormLabel>
            <Textarea
              variant="flushed"
              type="text"
              placeholder="deine beste Beschreibung"
              {...formik.getFieldProps("bio")}
            />
          </FormControl>

          {/* github */}
          <FormControl id="githubusername" mt={4}>
            <FormLabel>Github Username</FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="Github Name"
              {...formik.getFieldProps("githubusername")}
            />
          </FormControl>
          <Text fontSize="xl" my={6}>
            Soziale Medien
          </Text>
          {/* yt */}
          <FormControl id="youtube" mt={4}>
            <FormLabel>YouTube</FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="YouTube"
              {...formik.getFieldProps("youtube")}
            />
          </FormControl>
          {/* twitter */}
          <FormControl id="twitter" mt={4}>
            <FormLabel>Twitter</FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="Twitter"
              {...formik.getFieldProps("twitter")}
            />
          </FormControl>
          {/* fb */}
          <FormControl id="facebook" mt={4}>
            <FormLabel>Facebook</FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="Facebook"
              {...formik.getFieldProps("facebook")}
            />
          </FormControl>
          {/* insta */}
          <FormControl id="instagram" mt={4}>
            <FormLabel>Instagram</FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="Instagram"
              {...formik.getFieldProps("instagram")}
            />
          </FormControl>
          <Box
            as="button"
            py={2}
            px={4}
            my={8}
            color="white"
            fontWeight="bold"
            borderRadius="md"
            bgGradient="linear(to-r,purple.400,red.400)"
            _hover={{ bgGradient: "linear(to-r,red.400,purple.400)" }}
            type="submit"
          >
            Profil Erstellen
          </Box>
        </Box>
      </form>
    </Box>
  );
};
export default ProfileCreate;
