import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Text } from '@mantine/core';
import Avinya from "../../Assets/Images/Avinyalogo.png"
import "./AvinyaLoader.css"
function AvinyaLoader() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <> 
    <Modal opened={true} centered size={130} c={"cyan.7"} withCloseButton={false}>
            <Text size="1.2rem" fw={"600"}>
              Loading.....
            </Text>
            <img src={Avinya} alt="Loading" height={80} width={90} className='avilogo'style={{marginTop:"30px"}}/>
    </Modal>
    </>
  );
}

export default AvinyaLoader;