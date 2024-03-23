import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners';
import "../src/loading.css"

const override = css`
    display: block;
    margin: 0 auto;
`;

const Loading = ({ loadingTime }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // After 3000 milliseconds, set loading to false
        }, loadingTime);

        return () => clearTimeout(timer); // Clear the timer when the component unmounts or when loading changes

    }, [loadingTime]); // Run this effect whenever loadingTime changes

    return (
        <div className="loading-container">
            <div className="loading">
                <RingLoader color={'#36D7B7'} css={override} size={150} />
                
            </div>
        </div>
    );
};

export default Loading;
