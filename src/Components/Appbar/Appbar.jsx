import { AppShell, Box, Burger, Button, Group, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import classes from './Appbar.module.css';
import { NavLink } from 'react-router-dom';
import { FaMeta, FaSquareInstagram, FaYoutube, FaLinkedin } from "react-icons/fa6";
export function Appbar() {
  const [opened, { toggle }] = useDisclosure();
  const matches = useMediaQuery('(max-width: 26.25em)');
  
  return (
      <div>
      <AppShell
        style={{ height: 70 }}
        header={{ height: 50 }}
        navbar={{ width: 300, breakpoint: 'md', collapsed: { desktop: true, mobile: !opened } }}
        padding="md"
      >
        <AppShell.Header
          style={{ background: " linear-gradient(90deg, rgba(217,207,209,0.9948354341736695) 19%, rgba(255,255,255,1) 100%)", color: "black" }}>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" fw={"bold"} color='black' />
            <Group justify="space-between" style={{ flex: 1 }}>
              <NavLink to={"/"}>
                <img src="https://cadvintech.com/wp-content/uploads/2021/10/cadvin-logo.png" height={30} style={{ borderRadius: "6px", paddingTop: "1px" }} />
              </NavLink>
              {/* <Text size="md" fw={"600"} >
              {matches ? <>ASAT</> : <span style={{fontSize:"1.2rem", fontWeight:"bold"}} >Avinya Scholarship Aptitude Test</span>}
              </Text> */}
              <Group ml="md" gap={0} visibleFrom="sm">
                <NavLink>
                  <UnstyledButton className={classes.control}>Home</UnstyledButton>
                </NavLink>
                <NavLink >
                  <UnstyledButton className={classes.control}>About</UnstyledButton>
                </NavLink>
                <NavLink>
                  <UnstyledButton className={classes.control}>Contact</UnstyledButton>
                </NavLink>
                <NavLink >
                  <UnstyledButton className={classes.control}>Careers</UnstyledButton>
                </NavLink>
                <NavLink>
                  <UnstyledButton className={classes.control}>Products</UnstyledButton>
                </NavLink>
                <NavLink >
                  <UnstyledButton className={classes.control}>Training</UnstyledButton>
                </NavLink>
              </Group>
              <div>
               { matches?
              <></>:<Group  >
              <FaMeta  style={{ color: "blue" }} size="1.2rem" />
              <FaSquareInstagram style={{ color: "#e85285" }} size="1.2rem" />
              <FaYoutube style={{ color: "red" }} size="1.2rem" />
              <FaLinkedin style={{ color: "blue" }} size="1.2rem" />
            </Group>  
              }
              </div>
              <Button >Sigin</Button>
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar py="md" px={4}>
          <NavLink target='_blank'>
            <UnstyledButton className={[classes.control, classes.a]}>Home</UnstyledButton>
          </NavLink>
          <NavLink target='_blank'>
            <UnstyledButton className={[classes.control, classes.a]}>About</UnstyledButton>
          </NavLink>
          <NavLink target='_blank'>
            <UnstyledButton className={[classes.control, classes.a]}>Contact</UnstyledButton>
          </NavLink>
          <Group  style={{display:"flex" , flexDirection:"row", justifyContent:"start"}}>
          <FaMeta style={{ color: "blue" }} size="1.3rem" />
          <FaSquareInstagram  style={{ color: "#e85285" }} size="1.3rem" />
          <FaYoutube style={{ color: "red" }} size="1.3rem" />
          <FaLinkedin  style={{ color: "blue" }} size="1.3rem" />
          </Group>
        </AppShell.Navbar>

      </AppShell>
    </div>
    
  );
}
