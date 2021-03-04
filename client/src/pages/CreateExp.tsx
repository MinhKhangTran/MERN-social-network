import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Textarea,
  Checkbox
} from "@chakra-ui/react";
import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// components
// Redux
import { useDispatch } from "react-redux";

// redux actions
import { updateExp } from "../slices/profile/profileSlice";
import { useHistory } from "react-router-dom";

const CreateExp = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const initialValues = {
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: ""
  };

  const validation = () =>
    Yup.object({
      title: Yup.string().required("Bitte geben Sie einen Titel ein"),
      company: Yup.string().required("Bitte geben Sie eine Firma ein"),
      location: Yup.string().required("Bitte geben Sie einen Ort ein"),
      current: Yup.string(),
      from: Yup.string(),
      to: Yup.string(),
      description: Yup.string()
    });
  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit: (daten, { resetForm }) => {
      console.log(daten);
      dispatch(updateExp(daten));
      resetForm();
      history.push("/home");
    }
  });
  return (
    <Box>
      <Heading mt={6} color="purple.400">
        Erfahrungen
      </Heading>

      <form onSubmit={formik.handleSubmit}>
        <Box mt={4}>
          {/* Schule */}
          <FormControl
            isInvalid={!!formik.errors.title && formik.touched.title}
          >
            <FormLabel>Titel</FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="Bester Titel"
              {...formik.getFieldProps("title")}
            />
            <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
          </FormControl>
          {/* Abschluss */}
          <FormControl
            isInvalid={!!formik.errors.company && formik.touched.company}
          >
            <FormLabel>Firma</FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="Beste Firma"
              {...formik.getFieldProps("company")}
            />
            <FormErrorMessage>{formik.errors.company}</FormErrorMessage>
          </FormControl>
          {/* location */}
          <FormControl
            isInvalid={!!formik.errors.location && formik.touched.location}
            id="location"
            mt={4}
          >
            <FormLabel>Ort</FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="Bester Ort"
              {...formik.getFieldProps("location")}
            />
            <FormErrorMessage>{formik.errors.location}</FormErrorMessage>
          </FormControl>
          {/* desc */}
          <FormControl id="description" mt={4}>
            <FormLabel>Beschreibung</FormLabel>
            <Textarea
              variant="flushed"
              type="text"
              placeholder="Beste beschreibung"
              {...formik.getFieldProps("description")}
            />
          </FormControl>
          {/* from */}
          <FormControl
            isInvalid={!!formik.errors.from && formik.touched.from}
            id="from"
            mt={4}
          >
            <FormLabel>Von</FormLabel>
            <Input
              variant="flushed"
              type="date"
              {...formik.getFieldProps("from")}
            />
            <FormErrorMessage>{formik.errors.from}</FormErrorMessage>
          </FormControl>
          {/* current */}
          <FormControl id="current" mt={4}>
            <Checkbox
              // onChange={() => {
              //   setChecked(!checked);
              //   console.log(checked);
              // }}
              {...formik.getFieldProps("current")}
            >
              Bis jetzt?
            </Checkbox>
          </FormControl>
          {/* bis */}
          <FormControl isDisabled={formik.values.current} id="to" mt={4}>
            <FormLabel>Bis</FormLabel>
            <Input
              variant="flushed"
              type="date"
              {...formik.getFieldProps("to")}
            />
          </FormControl>
          <Button type="submit" mt={8} colorScheme="red" variant="outline">
            Erstellen
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export default CreateExp;
