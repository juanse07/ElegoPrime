import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import styles from '@/styles/NavBar.module.css';


export default function NavBar() {
    const router = useRouter();

    const handleContactClick = () => {
        router.push('/estimate');
    };

    return (
        <Navbar expand="md" collapseOnSelect variant="dark" bg="body" sticky="top" className="shadow-sm">
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
                    <img src="/logoelego.svg" alt="Icono" className={styles.NavIcon}/>
                    <span style={{ fontSize: '2rem', fontWeight:'bolder', padding:'0rem 1rem', lineHeight:'1'}}>ELEGO <br></br> PRIME</span>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls='main-navbar' />
                
                <Navbar.Collapse id='main-navbar'>
                    <Nav className="ms-auto">
                        <Nav.Link
                            className={styles.NavStyle}
                            as={Link}
                            href='/' 
                            active={router.pathname === "/"}>
                            Home
                        </Nav.Link>
                        <Nav.Link 
                            className={styles.NavStyle}
                            as={Link}
                            href='/' 
                            active={router.pathname === "/"}>
                            All services
                        </Nav.Link>
                        <Nav.Link 
                            className={styles.NavStyle}
                            as={Link}
                            href='/' 
                            active={router.pathname === "/"}>
                            Reserve
                        </Nav.Link>
                        <Nav.Link 
                            className={styles.NavStyle}
                            as={Link}
                            href='/contactUs' 
                            active={router.pathname === "/contactUs"}>
                            Contact Us
                        </Nav.Link>
                        {/* Desktop-only button */}
                    <div className="d-none d-md-block">
                        <Button
                            onClick={handleContactClick}
                            className={styles.NavStyle}>
                            Get an Estimate
                        </Button>
                    </div>
                        {/* Mobile-only button */}
                        <div className="d-md-none mt-3 me-3 ">
                            <Button
                                onClick={handleContactClick}
                                variant="outline-warning"
                                className={styles.NavStyle}
                            >
                                Get an Estimate
                            </Button>
                        </div>
                    </Nav>
                    
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}



