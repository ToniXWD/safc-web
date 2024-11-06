'use client'

import React from "react";

declare global {
    interface Window {
        onSignIn: (googleUser: any) => void;
    }
}

export function GoogleSignIn() {
    React.useEffect(() => {
        window.onSignIn = (googleUser) => {
            const profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId());
            console.log('Name: ' + profile.getName());
            console.log('Email: ' + profile.getEmail());
        };
    }, []);

    return (
        <div className="g-signin2" data-onsuccess="onSignIn" />
    );
} 