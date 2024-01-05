import { Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import image from '../../Assets/Image.svg';
import classes from './NotFoundImage.module.css';
import { Link } from 'react-router-dom';
import { Appbar } from '../Appbar/Appbar';

function NotFound() {
  return (<>
      <Appbar/>
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: "1.2rem",
      width:"100vw"
    }}
  >
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Link to={"/"}>
          <Button variant="outline" size="md" mt="xl" className={classes.control}>
            Get back to home page
          </Button>
          </Link>
        </div>
        <Image src={image} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
    </div>
    </>
  );
}

export default NotFound
