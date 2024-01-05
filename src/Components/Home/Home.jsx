import { Overlay, Container, Title, Button, Text } from "@mantine/core";
import classes from "./HeroContentLeft.module.css";
import { Appbar } from "../Appbar/Appbar";
import { Link } from "react-router-dom";
import Navbar from "../Appbar/Navbar";

export default function Home() {
  return (
    <>
    {/* <Appbar/> */}
    <Navbar/>
      <div className={classes.hero}>
        
        <Container className={classes.container} size="md" pt={100}>
          <Title className={classes.title} >
          CADVIN Technologies
          </Title>
          <Text className={classes.description} size="xl" mt="xl">
         
We offer CAD/CAM solutions for the Manufacturing Industries by the implementation of new advanced technologies to increase productivity and release new products into the market in a short period.
          </Text>
        
        </Container>
 
      </div>
    </>
  );
}
