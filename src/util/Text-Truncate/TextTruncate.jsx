import React from 'react';
import './TextTruncate.css'; // Import your CSS file with the styles

const TextTruncate = ({ text, lineClamp }) => {
    const textStyle = {
        WebkitLineClamp: lineClamp,
    };

    return (
        <div className="text-truncate-custom" style={textStyle}>
            {text}
        </div>
    );
};

export default TextTruncate;
