import { useDisclosure, useFullscreen } from "@mantine/hooks";
import { Modal, Button, Text } from "@mantine/core";

function RuleViolationModal() {
  const [opened, { open, close }] = useDisclosure(true);
  const { toggle, fullscreen } = useFullscreen();

  return (
    <>
      <Modal
        opened={opened}
        onClose={()=>{}}
        title=""
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        c={"red.9"}
        p={10}
      >
        <Text
          size="1.2rem"
          fw={"600"}
          c={"cyan.8"}
          style={{ textAlign: "center" }}
          p={10}
        >
          You are vioalating quiz rules, kindly enable fullscreen to continue the exam 
        </Text>
        <div style={{display:"flex",justifyContent:"center", alignItems:"center"}}>

        <Button
          type="submit"
          mt="sm"
          w={{ base: "80%" }}
          variant="gradient"
          onClick={toggle}
          >
          Enter Full Screen
        </Button>
            </div>
      </Modal>
    </>
  );
}

export default RuleViolationModal;
