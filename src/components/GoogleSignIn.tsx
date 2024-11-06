'use client'

import React from "react";

interface GoogleBasicProfile {
    getId(): string;
    getName(): string;
    getEmail(): string;
    getImageUrl(): string;
    getGivenName(): string;
    getFamilyName(): string;
}

interface GoogleUser {
    getBasicProfile(): GoogleBasicProfile;
    getAuthResponse(): {
        id_token: string;
        scope: string;
        expires_in: number;
        access_token: string;
        first_issued_at: number;
        expires_at: number;
    };
}

declare global {
    interface Window {
        onSignIn: (googleUser: GoogleUser) => void;
    }
}

export function GoogleSignIn() {
    React.useEffect(() => {
        window.onSignIn = (googleUser: GoogleUser) => {
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