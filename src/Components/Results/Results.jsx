import { Button, Center, Text } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchUser } from "../Layout";
import { c4eApi } from "../../ApiData/ApiConstants";
import toast from "react-hot-toast";

const Results = () => {
  const location = useLocation();
  //   window.history.replaceState(null, null, "/");
  const { toggle, fullscreen } = useFullscreen();
  const [user, setUser] = useState(fetchUser());
  const val =
    (parseInt(location.state?.marksScored) /
      parseInt(location.state?.totalQuestions)) *
    100;
    const timeTakenArray = (location.state?.time).toString().split(":");
    var noOminutes = 29-parseInt(timeTakenArray[0]);
    var noOseconds = 59-parseInt(timeTakenArray[1]);
    if (noOminutes < 0) {
      noOminutes = 0;
    }
    if (noOseconds < 0) {
      noOseconds = 0;
    }
    const minutes = noOminutes<=9 ? "0"+noOminutes: noOminutes;
    const seconds = noOseconds<=9 ? "0"+noOseconds: noOseconds;
    const timeTaken = `00:${minutes}:${seconds}`;

    const submitMarks = async()=>{
      if (location.state) {
        const formData = {
         "email": user.email,
         "marksObtained": location.state?.marksScored,
         "maxMarks": location.state?.totalQuestions,
         "timeTaken": timeTaken
       }
       // console.log(formData);
       await c4eApi.post("/score", formData).then((resp)=>{
        toast.success("Thanks for participating in ASAT test",5000);
          localStorage.clear();
       }).catch((err)=>{
       })
     }
    }
    useEffect(() => {
    submitMarks()
  }, []);

  return (
    <>
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
          {location.state === null ? (
            <Text size="1.5rem" fw={"600"}>
              You cant access this page without completing the test
            </Text>
          ) : (
            <>
              <Text size="1.5rem" fw={"600"} c={"orange.6"}>
                Results
              </Text>
              <Text
                size="1.3rem"
                fw={"600"}
                style={{ textAlign: "center" }}
                mt={10}
              >
                Congratulations {user.name}
              </Text>
              <Text
                size="1.3rem"
                fw={"600"}
                style={{ textAlign: "center" }}
                mt={10}
                p={"10 0"}
              >
                Your got{" "}
                <span>
                  {val.toString().substring(0, 4)}% in asat
                </span>
              </Text>
              {
                fullscreen?<Button
                type="submit"
                mt="sm"
                w={{ base: "50%" }}
                variant="gradient"
                onClick={toggle}
              >
                Exit Full Screen
              </Button>:""
              } 
            </>
          )}
        </Center>
      </div>
    </>
  );
};
export default Results;
