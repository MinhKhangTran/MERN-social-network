import React from "react";
import {
  Box,
  Heading,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputRightElement,
  IconButton,
  InputGroup,
  Text,
  Grid
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { registerUser } from "../slices/auth/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector((state: RootState) => state.register);
  const { userInfo } = useSelector((state: RootState) => state.login);
  const [showPW, setShowPW] = React.useState(false);
  const initialValues = { email: "", password: "", name: "" };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Es muss eine E-Mail Addresse sein!")
      .required("Bitte geben Sie Ihre E-Mail Addresse ein"),
    password: Yup.string()
      .required("Bitte geben Sie Ihr Password ein")
      .min(6, "mindestens 6 Zeichen"),
    name: Yup.string().required("Bitte geben Sie einen Benutzername ein")
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (daten, { resetForm }) => {
      // console.log(daten);
      dispatch(registerUser(daten));

      resetForm();
    }
  });

  React.useEffect(() => {
    if (userInfo._id.length !== 0) {
      history.push("/home");
    }
  }, [history, userInfo]);
  return (
    <Grid placeItems="center" h="85vh">
      <Box
        bgGradient="linear(to-l,red.100,purple.100)"
        p={10}
        boxShadow="lg"
        borderRadius="xl"
        w={{ base: "100%", md: "65%" }}
        mx="auto"
      >
        <Heading bgGradient="linear(to-l,purple.500,red.500)" bgClip="text">
          Anmeldung
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          {/* Username */}
          <FormControl
            isInvalid={!!formik.errors.name && formik.touched.name}
            id="name"
            mt={4}
          >
            <FormLabel
              bgGradient="linear(to-l,purple.500,red.500)"
              bgClip="text"
            >
              Benutername
            </FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="Ihr Name"
              {...formik.getFieldProps("name")}
            />

            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>
          {/* Email */}
          <FormControl
            isInvalid={!!formik.errors.email && formik.touched.email}
            id="email"
            mt={4}
          >
            <FormLabel
              bgGradient="linear(to-l,purple.500,red.500)"
              bgClip="text"
            >
              E-Mail
            </FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="YourBestEmail@example.com"
              {...formik.getFieldProps("email")}
            />

            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>

          {/* Password */}
          <FormControl
            isInvalid={!!formik.errors.password && formik.touched.password}
            id="password"
            mt={4}
          >
            <FormLabel
              bgGradient="linear(to-l,purple.500,red.500)"
              bgClip="text"
            >
              Password
            </FormLabel>
            <InputGroup>
              <Input
                variant="flushed"
                type={showPW ? "text" : "password"}
                placeholder="******"
                {...formik.getFieldProps("password")}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  aria-label="hide/show password"
                  onClick={() => setShowPW(!showPW)}
                  variant="ghost"
                  colorScheme="purple"
                  h="1.75rem"
                >
                  {showPW ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>

          <Button isLoading={loading} mt={8} colorScheme="purple" type="submit">
            Anmelden
          </Button>
          <Text mt={4} fontStyle="italic">
            Schon ein Account?{" "}
            <Link to="/">
              <Text
                as="span"
                cursor="pointer"
                bgGradient="linear(to-l,purple.500,red.500)"
                bgClip="text"
              >
                hier klicken
              </Text>
            </Link>{" "}
            um sich einzuloggen!
          </Text>
        </form>
      </Box>
    </Grid>
  );
};
export default Register;
