import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {

    return (
        <nav
            style={{
                display: 'flex',
                justifyContent: 'space-between', // Balra logó, jobbra linkek
                alignItems: 'center', // Függőleges középre igazítás
                backgroundColor: '#242424',
                color: '#fff',
                padding: '10px 50px', // Több hely bal és jobb oldalon
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%', // A navbar szélessége a teljes képernyő
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                zIndex: 1000, // Mindig legyen felül
                boxSizing: 'border-box', // A padding ne tolja ki a szélességet
            }}
        >
            {/* Navigation Links */}
            <div
                style={{
                    display: 'flex',
                    gap: '30px', // Távolság a linkek között
                }}
            >
                <Link
                    to="/admin"
                    style={{
                        color: '#fff',
                        textDecoration: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = '#007BFF')
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = 'transparent')
                    }
                >
                    Book Manager
                </Link>

                    <>

                        <Link
                            to="/users"
                            style={{
                                color: '#fff',
                                textDecoration: 'none',
                                padding: '5px 10px',
                                borderRadius: '4px',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = '#007BFF')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = 'transparent')
                            }
                        >
                            User Manager
                        </Link>
                        <Link
                            to="/rent"
                            style={{
                                color: '#fff',
                                textDecoration: 'none',
                                padding: '5px 10px',
                                borderRadius: '4px',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = '#007BFF')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = 'transparent')
                            }
                        >
                            Rent
                        </Link>
                        <Link
                            to="/return"
                            style={{
                                color: '#fff',
                                textDecoration: 'none',
                                padding: '5px 10px',
                                borderRadius: '4px',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = '#007BFF')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = 'transparent')
                            }
                        >
                            Return
                        </Link>
                    </>
            </div>
        </nav>
    );
};

export default Navbar;
