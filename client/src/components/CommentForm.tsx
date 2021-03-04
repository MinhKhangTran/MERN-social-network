import * as React from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  Button,
  Textarea,
  Flex
} from "@chakra-ui/react";
// Redux
import { useDispatch } from "react-redux";
// Formik
import { useFormik } from "formik";
import * as Yup from "yup";
// Redux Actions
import { createComment } from "../slices/postSlice";

const CommentForm = ({ postId }: { postId: string }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { text: "" },
    validationSchema: Yup.object({
      text: Yup.string().required("Dieses Feld darf nicht leer sein")
    }),
    onSubmit: (daten, { resetForm }) => {
      console.log(daten);
      resetForm();
      dispatch(createComment({ text: daten.text, postId }));
    }
  });
  return (
    <Box mt={2}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl isInvalid={!!formik.errors.text && formik.touched.text}>
          <Flex>
            <Textarea
              variant="flushed"
              colorScheme="purple"
              placeholder="Schreibe etwas..."
              rows={1}
              {...formik.getFieldProps("text")}
            ></Textarea>
            <FormErrorMessage>{formik.errors.text}</FormErrorMessage>
            <Button type="submit" ml={2} colorScheme="purple" variant="outline">
              Abschicken
            </Button>
          </Flex>
        </FormControl>
      </form>
    </Box>
  );
};
export default CommentForm;
