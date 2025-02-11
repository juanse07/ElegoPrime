import React from 'react';
import { Button, ButtonProps, Spinner } from 'react-bootstrap';

interface LoadingButtonProps {
    isLoading: boolean;  // Changed from isloading to isLoading
    children: React.ReactNode;
}

export default function LoadingButton({ isLoading, children, ...props}: LoadingButtonProps & ButtonProps) {
    return (
        <Button {...props} disabled={isLoading || props.disabled}>
            {isLoading && (
                <>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"  // Added margin to separate spinner from text
                    />
                    <span className="visually-hidden">Loading...</span>
                </>
            )}
            {children}
        </Button>
    );
}