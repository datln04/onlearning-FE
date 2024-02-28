// Color mapping object
const colorToTextColor = {
    '#e0e0e0': '#000000', // for defaultColor, black text
    '#bef7c8': '#60e679', // for primaryColor, strong blue text
    '#fcc2d6': '#f5588d', // for dangerColor, black text
    '#8dfcb0': '#4fe37e', // for successColor, black text
    '#edeb7b': '#faf752', // for pendingColor, black text
    // Add more mappings as needed
};

// ColorLabel component
const ColorLabel = ({ text, color }) => {
    const textColor = colorToTextColor[color] || 'white'; // default to white if color not in mapping

    const style = {
        // backgroundColor: color,
        color: textColor, // use mapped text color
        padding: '10px',
        border: 'none',
        // borderRadius: '10px',
        margin: '5px',
        // cursor: 'pointer',
        fontWeight: 'bold'
    };

    return <label style={style}>{text}</label>;
};

export default ColorLabel;

// Exported colors
export const defaultColor = '#e0e0e0'
export const primaryColor = '#bef7c8'
export const dangerColor = '#fcc2d6'
export const successColor = '#8dfcb0'
export const pendingColor = '#edeb7b'
