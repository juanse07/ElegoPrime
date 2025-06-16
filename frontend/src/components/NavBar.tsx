import styles from '@/styles/NavBar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

interface NavBarProps {
    onEstimateClick: () => void;
}

export default function NavBar({ onEstimateClick }: NavBarProps) {
    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if we're on mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Handle dropdown click and close navbar on mobile
    const handleDropdownClick = () => {
        if (isMobile) {
            // Toggle dropdown on mobile
            setShowDropdown(!showDropdown);
        }
    };

    // Handle service item click on mobile
    const handleServiceClick = () => {
        if (isMobile) {
            // Hide dropdown and collapse navbar on mobile
            setShowDropdown(false);
            const navbar = document.getElementById('main-navbar');
            if (navbar && navbar.classList.contains('show')) {
                const toggleButton = document.querySelector('.navbar-toggler') as HTMLElement;
                if (toggleButton) toggleButton.click();
            }
        }
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
                    <Image 
                        src="/logoelego.svg" 
                        alt="Icono" 
                        width={70} 
                        height={90}
                        className={styles.NavIcon}
                        priority
                    />
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
                                active={router.pathname === "/services"}
                                onClick={handleDropdownClick}>
                                All Services
                            </Nav.Link>
                            {/* Menú desplegable para servicios */}
                            <div className={`${styles.dropdownMenu} ${(showDropdown && isMobile) ? 'd-block' : ''}`}>
                                <Link href="/services#All" onClick={handleServiceClick}>
                                    <span className={styles.NavStyle}>All</span>
                                </Link>
                                <Link href="/services#Security" onClick={handleServiceClick}>
                                    <span className={styles.NavStyle}>Security</span>
                                </Link>
                                <Link href="/services#Videobeam" onClick={handleServiceClick}>
                                    <span className={styles.NavStyle}>Videobeam</span>
                                </Link>
                                <Link href="/services#TV" onClick={handleServiceClick}>
                                    <span className={styles.NavStyle}>TV</span>
                                </Link>
                                <Link href="/services#Ceiling fans and light fixtures" onClick={handleServiceClick}>
                                    <span className={styles.NavStyle}>Ceiling fans and light fixtures</span>
                                </Link>
                                <Link href="/services#Assembling" onClick={handleServiceClick}>
                                    <span className={styles.NavStyle}>Assembling</span>
                                </Link>
                                <Link href="/services#Wall Fixture Setup" onClick={handleServiceClick}>
                                    <span className={styles.NavStyle}>Wall Fixture Setup</span>
                                </Link>
                                <Link href="/services#Faucet and toilet" onClick={handleServiceClick}>
                                    <span className={styles.NavStyle}>Faucet and Toilet</span>
                                </Link>
                                <Link href="/services#Painting" onClick={handleServiceClick}>
                                    <span className={styles.NavStyle}>Painting</span>
                                </Link>
                                <Link href="/services#Residential" onClick={handleServiceClick}>
                                    <span className={styles.NavStyle}>Residential</span>
                                </Link>
                            </div>
                        </div>
                        <Nav.Link 
                            className={styles.NavStyle}
                            as={Link}
                            href='/booking' 
                            active={router.pathname === "/booking"}>
                            Book Now
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


