import styles from '@/styles/NavBar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

interface NavBarProps {
    onEstimateClick: () => void;
}

export default function NavBar({ onEstimateClick }: NavBarProps) {
    const router = useRouter();

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
                        {/* Nav.Link para "All Services" */}
                        <div className={`${styles.dropdownWrapper}`}>
                            <Nav.Link
                                className={styles.NavStyle}
                                as={Link}
                                href='/services'
                                active={router.pathname === "/services"}>
                                All Services
                            </Nav.Link>
                            {/* Menú desplegable para servicios (con hover) */}
                            <div className={styles.dropdownMenu}>
                                <Link href="/services">
                                    <span className={styles.NavStyle}>Security</span>
                                </Link>
                                <Link href="/services">
                                    <span className={styles.NavStyle}>Videobeam</span>
                                </Link>
                                <Link href="/services">
                                    <span className={styles.NavStyle}>TV</span>
                                </Link>
                                <Link href="/services">
                                    <span className={styles.NavStyle}>Fans and Lighting</span>
                                </Link>
                                <Link href="/services">
                                    <span className={styles.NavStyle}>Assembling</span>
                                </Link>
                                <Link href="/services">
                                    <span className={styles.NavStyle}>Wall Fixture Setup</span>
                                </Link>
                                <Link href="/services">
                                    <span className={styles.NavStyle}>Faucet and Toilet</span>
                                </Link>
                                <Link href="/services">
                                    <span className={styles.NavStyle}>Painting</span>
                                </Link>
                            </div>
                        </div>
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
                                onClick={onEstimateClick}
                                className={styles.NavStyle}>
                                Get an Estimate
                            </Button>
                        </div>
                        {/* Mobile-only button */}
                        <div className="d-md-none mt-3 me-3">
                            <Button
                                onClick={onEstimateClick}
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



