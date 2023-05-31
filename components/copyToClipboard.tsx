'use client'
import React, { useState } from 'react';

const Copy = ({ emoji, toCopy }: {emoji: string, toCopy: string}) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(toCopy)
            .then(() => {
                setCopied(true);
                // reset the copied status after 2 seconds
                setTimeout(() => {
                    setCopied(false);
                }, 2000);
            })
            .catch(err => console.log('Something went wrong', err));
    }

    return (
        <div className="">
            <button 
                className="focus:outline-none text-sm" 
                onClick={copyToClipboard}
            >
                {emoji}
            </button>

            {copied && <p className="text-green-500">Copied to clipboard!</p>}
        </div>
    )
}

export default Copy

