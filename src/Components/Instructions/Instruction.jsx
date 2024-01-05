import { Box, Button, Center, Stack, Text } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import { NavLink } from "react-router-dom";

const Instruction = () => {
  const { toggle, fullscreen } = useFullscreen();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "10px",
      }}
    >
      <Stack
        bg=""
        style={{
          borderRadius: "6px",
          boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
        }}
        p={10}
        w={"85%"}
        maw={{ xs: "95%", sm: "90%", md: "70%", xl: "50%" }}
      >
        <Center
          style={{ display: "flex", flexDirection: "column" }}
          c={"cyan.8"}
        >
          <Text size="1.5rem" fw={"600"}>
            Test Instructions
          </Text>
          <Box w={{ base: "90%", sm: "80%", md: "80%" }} p={10} c={"#343A40"}>
            <div size="md" mt={5}>
              <ul>
                <li>To start the Quiz, click the green “Start Quiz” button.</li>
                <li>
                  For each question, there are four answer options – select the
                  BEST one by clicking it. You cannot return to any question you
                  have previously answered to change your selected answer
                  option.
                </li>
                <li>
                  Move to the next question by clicking the “Next” button at the
                  bottom right corner of the page.
                </li>
                <li>
                  When you have completed the Quiz, click the “Finish Quiz”
                  button near the bottom right corner of the page that contains
                  the final question. Doing so will take you to the next page
                  which summarizes your results, including the number of
                  questions you answered correctly.
                </li>
                <li>
                  Enter Full screen to write exam
                </li>
              </ul>
            </div>
            <NavLink to={"/test"}>
              <Button
                type="submit"
                mt="sm"
                w={{ base: "100%" }}
                variant="gradient"
                onClick={toggle}
              >
                Start Test
              </Button>
            </NavLink>
          </Box>
        </Center>
      </Stack>
    </div>
  );
};

export default Instruction;
