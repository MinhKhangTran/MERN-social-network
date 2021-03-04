import * as React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Textarea
} from "@chakra-ui/react";
// Redux
import { useDispatch } from "react-redux";
// Formik
import { useFormik } from "formik";
import * as Yup from "yup";
// Redux Actions
import { createPost } from "../slices/postSlice";

const PostForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { text: "" },
    validationSchema: Yup.object({
      text: Yup.string().required("Dieses Feld darf nicht leer sein")
    }),
    onSubmit: (daten, { resetForm }) => {
      // console.log(daten);
      resetForm();
      dispatch(createPost(daten));
    }
  });
  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <FormControl isInvalid={!!formik.errors.text && formik.touched.text}>
          <FormLabel>Dein Post</FormLabel>
          <Textarea
            placeholder="Dein Post ...."
            {...formik.getFieldProps("text")}
          ></Textarea>
          <FormErrorMessage>{formik.errors.text}</FormErrorMessage>
        </FormControl>
        <Button mt={4} bg="purple.600" color="purple.100" type="submit">
          Posten
        </Button>
      </form>
    </Box>
  );
};
export default PostForm;
