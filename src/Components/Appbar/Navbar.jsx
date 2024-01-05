import { useState } from 'react';
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  useMantineTheme,
  Button,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';
import { SlLogin } from "react-icons/sl";
import { Link } from 'react-router-dom';
// import { FaMeta, FaSquareInstagram, FaYoutube, FaLinkedin } from "react-icons/fa6";



const tabs = [
  'Home',
  'Orders',
  'Education',
  'Community',
  'Forums',
  'Support',
  'Account',
  
];

export default function Navbar() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  // const matches = useMediaQuery('(max-width: 26.25em)');

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab} style={{fontFamily:"Optima", fontSize:"large"}}>
      {tab}
    </Tabs.Tab>
  ));

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="x-lg">
        <Group justify="space-between">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" fw={"bold"} color='black' />
           <div>
           <NavLink to={"/"}>
                <img src="https://cadvintech.com/wp-content/uploads/2021/10/cadvin-logo.png" height={30} style={{ borderRadius: "6px", paddingTop: "1px" }} />
              </NavLink>
           </div>
           {/* <div>
               { matches?
              <></>:<Group  >
              <FaMeta  style={{ color: "blue" }} size="1.2rem" />
              <FaSquareInstagram style={{ color: "#e85285" }} size="1.2rem" />
              <FaYoutube style={{ color: "red" }} size="1.2rem" />
              <FaLinkedin style={{ color: "blue" }} size="1.2rem" />
            </Group>  
              }
              </div> */}
           <div>
            <Link to="/" style={{ color: "blue", fontSize: "larger" }}>
              <SlLogin /> Signin
            </Link>
          </div>
        </Group>
      </Container>
      <Container size="x-lg" style={{backgroundColor:"#ffdab3"}}>
        <Tabs
          defaultValue="Home"
         
          visibleFrom="md"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List >{items}</Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
}


  {/* <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group gap={7}>
                  <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {user.name}
                  </Text>
                  <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconHeart
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
              >
                Liked posts
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconStar
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                }
              >
                
              </Menu.Item>
       
            </Menu.Dropdown>
          </Menu> */}