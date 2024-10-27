
import { Container, Navbar, Nav , Dropdown, DropdownButton} from "react-bootstrap";
import Link from 'next/link';
import { useRouter } from "next/router";
import { readToken, removeToken } from "@/lib/authenticate";

export default function Layout(props) {

  
  const router = useRouter();
  let token = readToken();
  

  function logout() {
    removeToken();
   
    router.push("/");
  }

  function CodingWorkDropdown() {
    const handleSelect = (eventKey) => {
      router.push({
        pathname: '/coding',
        query: { option: eventKey },
      });
    };

    return (
      <DropdownButton
        id="coding-work-dropdown"
        title="Coding Work"
        onSelect={handleSelect}
        as={Nav.Link}
      >
        <Dropdown.Item eventKey="1">React</Dropdown.Item>
        <Dropdown.Item eventKey="2">Boostrap</Dropdown.Item>
        <Dropdown.Item eventKey="3">Back End Design</Dropdown.Item>
        <Dropdown.Item eventKey="4">Java Script</Dropdown.Item>
      </DropdownButton>
    );
  }
  return (
    <>
    <Navbar bg="light" expand="lg" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
      <Container>
      
        <Link href="/" passHref legacyBehavior><Navbar.Brand >CTO Space</Navbar.Brand></Link>&nbsp;&nbsp;{token && <>- Welcome: {token.userName}</>}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior ><Nav.Link>&nbsp;&nbsp;&nbsp;Home</Nav.Link></Link>
            {/* {token && <Link href="/coding" passHref legacyBehavior><Nav.Link>&nbsp;&nbsp;&nbsp;Coding Work</Nav.Link></Link>} */}
            <CodingWorkDropdown />
            <Link href="/climbing" passHref legacyBehavior><Nav.Link>&nbsp;&nbsp;&nbsp;Climbing</Nav.Link></Link>
            <Link href="/about" passHref legacyBehavior><Nav.Link>&nbsp;&nbsp;&nbsp;About Me</Nav.Link></Link>
            <Link href="/contact" passHref legacyBehavior><Nav.Link>&nbsp;&nbsp;&nbsp;Contact Me</Nav.Link></Link>
          </Nav>
          <Nav className="ml-auto">
          
            {!token && <Link href="/login" passHref legacyBehavior><Nav.Link>Login</Nav.Link></Link>}
            {token && <Nav.Link onClick={logout}>Logout</Nav.Link>}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br></br>
    <br></br>
    <br></br>
      {props.children}
    </>
  )
}
