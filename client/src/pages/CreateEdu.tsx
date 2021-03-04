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
import { updateEdu } from "../slices/profile/profileSlice";
import { useHistory } from "react-router-dom";

const CreateEdu = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const initialValues = {
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  };

  const validation = () =>
    Yup.object({
      school: Yup.string().required("Bitte geben Sie eine Schule ein"),
      degree: Yup.string().required("Bitte geben Sie einen Abschluss ein"),
      fieldofstudy: Yup.string().required(
        "Bitte geben Sie einen Aufgabengebiet ein"
      ),
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
      dispatch(updateEdu(daten));
      resetForm();
      history.push("/home");
    }
  });
  return (
    <Box>
      <Heading mt={6} color="red.400">
        Bildung
      </Heading>

      <form onSubmit={formik.handleSubmit}>
        <Box mt={4}>
          {/* Schule */}
          <FormControl
            isInvalid={!!formik.errors.school && formik.touched.school}
          >
            <FormLabel>Schule</FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="Beste Schule"
              {...formik.getFieldProps("school")}
            />
            <FormErrorMessage>{formik.errors.school}</FormErrorMessage>
          </FormControl>
          {/* Abschluss */}
          <FormControl
            isInvalid={!!formik.errors.degree && formik.touched.degree}
          >
            <FormLabel>Abschluss</FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="Bester Abschluss"
              {...formik.getFieldProps("degree")}
            />
            <FormErrorMessage>{formik.errors.degree}</FormErrorMessage>
          </FormControl>
          {/* fieldofstudy */}
          <FormControl
            isInvalid={
              !!formik.errors.fieldofstudy && formik.touched.fieldofstudy
            }
            id="fieldofstudy"
            mt={4}
          >
            <FormLabel>Aufgabengebiete</FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="Beste Aufgabengebiete"
              {...formik.getFieldProps("fieldofstudy")}
            />
            <FormErrorMessage>{formik.errors.fieldofstudy}</FormErrorMessage>
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
          <Button type="submit" mt={8} colorScheme="purple" variant="outline">
            Erstellen
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export default CreateEdu;
