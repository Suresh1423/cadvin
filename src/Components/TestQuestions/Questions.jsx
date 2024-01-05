import { Box, Button, Center, Group, Radio, Text } from "@mantine/core";
import Timer, { getDeadTime, getTimeRemaining } from "../Timer/Timer";
import { c4eApi } from "../../ApiData/ApiConstants";
import { fetchUser } from "../Layout";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { decrypt, encrypt } from "../../ApiData/Encryption";
import { useFullscreen } from "@mantine/hooks";
import RuleViolationModal from "../Utils/RuleViolationModal";
import { useNavigate } from "react-router-dom";

const Questions = () => {

  const remainingTime = getTimeRemaining(getDeadTime());
  setInterval(() => {
    if (remainingTime.total === 0) {
      submitExam()
    }
  }, 1000);

  const user = fetchUser();
  const { toggle, fullscreen } = useFullscreen();
  const navigate = useNavigate();
  const [qusnData, setQusnData] = useState([]);
  const [marksScored, setMarksScored] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuestionNo, setCurrentQuestionNo] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState();
  const validateAnswer = () => {
    if (currentQuestionNo + 1 < qusnData.length) {
      setCurrentQuestionNo(currentQuestionNo + 1);
      setCurrentQuestion(qusnData[currentQuestionNo + 1]);
      setSelectedAnswer(null);
      if (currentQuestion.answer === selectedAnswer) {
        setMarksScored(marksScored + 1);
      }
    } 
  };

  const fetchQuestions = async () => {
    if (!decrypt("qusns")) {
      await c4eApi
        .get(`/mcq/grade?grade=${user.grade}&count=10`)
        .then((resp) => {
          if (resp.data.length == 0) {
            navigate("/")
          }
          setQusnData(resp.data);
          encrypt("qusns", resp.data);
          setCurrentQuestion(resp.data[0]);
        })
        .catch((err) => {
          toast.error("Something went wrong kindly check after sometime");
        });
    } else {
      setQusnData(decrypt("qusns"));
      setCurrentQuestion(decrypt("qusns")[0]);
    }
  };

  const submitExam = ()=>{
    console.log("Submit");
    const val = {
      marksScored,
      email:user.email,
      time: `${remainingTime.minutes}:${remainingTime.seconds}`,
      totalQuestions:qusnData.length
    }
    navigate("/results", {state:val})
  }
  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <>
    {fullscreen ? 
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "10px",
        }}
      >
        <Center
          maw={{ xs: "95%", sm: "90%", md: "80%", xl: "60%" }}
          style={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "6px",
            boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
          }}
          p={10}
          w={"85%"}
          c={"cyan.8"}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <Text size="1.5rem" fw={"600"}>
              Question {currentQuestionNo + 1} out of {qusnData.length}
            </Text>
            <Timer />
          </div>
          <Box
            w={{ base: "90%", sm: "80%", md: "80%" }}
            p={10}
            c={"#343A40"}
            mt={5}
            mb={10}
          >
            <Text
              fz={{
                base: "1.1rem",
                xs: "1.2rem",
                sm: "1.2rem",
                md: "1.3rem",
                lg: "1.4rem",
              }}
              c={"gray.7"}
            >
              {currentQuestionNo + 1}. {currentQuestion?.question}
            </Text>

            <Radio.Group
              withAsterisk
              value={selectedAnswer}
              onChange={setSelectedAnswer}
            >
              <Group mt="xs" w={"100%"}>
                {currentQuestion?.options.map((option, index) => (
                  <Radio
                    key={index}
                    iconColor="gray.6"
                    color="orange"
                    variant="outline"
                    label={option}
                    w={"100%"}
                    name="check"
                    value={option}
                    m={"2 0"}
                    size={"md"}
                    p={10}
                    // onChange={(e) => setSelectedAnswer(e.currentTarget.value)}
                    style={{
                      border: "1px solid #1098AD",
                      borderRadius: "10px",
                      backgroundColor:
                        selectedAnswer === option ? "#99E9F2" : "",
                    }}
                  />
                ))}
              </Group>
            </Radio.Group>
            {currentQuestionNo + 1 !== qusnData.length ? (
              <Button
                mt="sm"
                w={{ base: "100%" }}
                variant="gradient"
                style={{ fontSize: "medium" }}
                onClick={validateAnswer}
                disabled={selectedAnswer !== null ? false : true}
              >
                Next Question
              </Button>
            ) : (
              <Button
                mt="sm"
                w={{ base: "100%" }}
                variant="gradient"
                style={{ fontSize: "medium" }}
                onClick={submitExam}
                disabled={selectedAnswer !== null ? false : true}
              >
               Submit Test
              </Button>
            )}
          </Box>
        </Center>
      </div>
      :<>
      <RuleViolationModal/>
      </>}
    </>
  );
};

export default Questions;
