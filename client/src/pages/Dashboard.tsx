import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Spinner,
  Heading,
  Text,
  Button,
  IconButton,
  ButtonGroup,
  Flex
} from "@chakra-ui/react";
// redux
import {
  getPosts,
  deletePost,
  clearStateAfterPutOrDeleteForReRendering,
  likePost,
  unlikePost,
  deleteComment
} from "../slices/postSlice";
import { RootState } from "../store";
// Moment
import Moment from "react-moment";
// component
import PostForm from "../components/PostForm";
import CommentForm from "../components/CommentForm";
// icons
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { postInfo, loading, success } = useSelector(
    (state: RootState) => state.post
  );
  const { userInfo } = useSelector((state: RootState) => state.login);
  React.useEffect(() => {
    dispatch(getPosts());
    dispatch(clearStateAfterPutOrDeleteForReRendering());
  }, [dispatch, success]);
  if (loading) {
    return (
      <Box my={6}>
        <Spinner color="red.500" />
      </Box>
    );
  }
  return (
    <Box>
      <Heading color="red.500" my={8}>
        Poste etwas!
      </Heading>
      <PostForm />
      {postInfo?.map((post) => {
        return (
          <Box
            boxShadow="lg"
            my={4}
            borderRadius="md"
            bg="purple.50"
            p={4}
            key={post._id}
            position="relative"
          >
            {userInfo._id === post.user && (
              <IconButton
                colorScheme="red"
                position="absolute"
                top="5px"
                right="5px"
                aria-label="delete"
                icon={<FaTrash />}
                onClick={() => {
                  if (window.confirm("Bist du sicher?")) {
                    dispatch(deletePost({ postId: post._id }));
                  }
                }}
              ></IconButton>
            )}

            <Text
              cursor="pointer"
              casing="capitalize"
              fontSize="3xl"
              fontWeight="semibold"
            >
              {post.name}
            </Text>
            <Text fontSize="2xl">{post.text}</Text>
            {/* Like */}
            <ButtonGroup mt={2}>
              <Button
                size="sm"
                leftIcon={<BiUpvote />}
                colorScheme="red"
                variant="outline"
                onClick={() => {
                  dispatch(likePost({ postId: post._id }));
                }}
              >
                {post.likes && post.likes.length}
              </Button>
              <IconButton
                size="sm"
                icon={<BiDownvote />}
                colorScheme="purple"
                variant="ghost"
                aria-label="down-vote"
                onClick={() => {
                  dispatch(unlikePost({ postId: post._id }));
                }}
              ></IconButton>
            </ButtonGroup>
            {/* Comments */}
            <Box mt={4}>
              {post.comments &&
                post.comments.map((comment) => {
                  return (
                    <Box
                      key={comment._id}
                      position="relative"
                      borderTop="1px"
                      borderColor="purple.200"
                    >
                      {userInfo._id === post.user && (
                        <IconButton
                          colorScheme="red"
                          position="absolute"
                          size="xs"
                          top="5px"
                          right="5px"
                          variant="ghost"
                          aria-label="delete"
                          icon={<FaTrash />}
                          onClick={() => {
                            if (window.confirm("Bist du sicher?")) {
                              dispatch(
                                deleteComment({
                                  postId: post._id,
                                  commentId: comment._id
                                })
                              );
                            }
                          }}
                        ></IconButton>
                      )}
                      <Flex>
                        <Text
                          casing="capitalize"
                          fontWeight="bold"
                          color="purple.400"
                        >
                          {comment.name}
                        </Text>
                        <Text ml={4}>{comment.text}</Text>
                      </Flex>
                      <Text fontSize="sm" color="purple.300">
                        <Moment locale="de" to={comment.date}></Moment>
                      </Text>
                    </Box>
                  );
                })}
            </Box>
            {/* Form */}
            <CommentForm postId={post._id} />
          </Box>
        );
      })}
    </Box>
  );
};

export default Dashboard;
