import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

export default function NavBar() {
    const router = useRouter();

    const handleContactClick = () => {
        router.push('/estimate');
    };

    return (
        <Navbar expand="md" collapseOnSelect variant="dark" bg="body" sticky="top">
            <Container fluid>
                <Navbar.Brand as={Link} href='/' className='d-flex align-items-center'>
                    {/* <Image
                        src="/denverbartendersSign.webp"
                        alt="DenverBartenders"
                        width={250}
                        height={70}
                        sizes="(max-width: 768px) 200px, 250px"
                        style={{
                            width: '100%',
                            maxWidth: '230px',
                            height: 'auto',
                        }}
                        priority
                    /> */}
                    <span>Elego Prime</span>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls='main-navbar' />
                
                <Navbar.Collapse id='main-navbar' className='justify-content-between'>
                    <Nav className="me-auto">
                        <Nav.Link 
                            as={Link}
                            href='/' 
                            active={router.pathname === "/"}>
                            Home
                        </Nav.Link>
                        <Nav.Link 
                            as={Link}
                            href='/contactUs' 
                            active={router.pathname === "/contactUs"}>
                            Contact Us
                        </Nav.Link>
                        {/* Mobile-only button */}
                        <div className="d-md-none mt-3 me-3 ">
                            <Button
                                onClick={handleContactClick}
                                variant="outline-warning"
                                className="w-100"
                            >
                                Get an Estimate
                            </Button>
                        </div>
                    </Nav>
                    
                    {/* Desktop-only button */}
                    <div className="d-none d-md-block">
                        <Button
                            onClick={handleContactClick}
                            variant="outline-warning"
                            className="px-4"
                        >
                            Get an Estimate
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}



