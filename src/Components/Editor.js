import React from 'react';
import TextField from '@material-ui/core/TextField';

const style = {
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        textField: {
            width: '50%',
            margin: '0.5rem'
        }
    },
    error: {
        borderColor: 'red !important'
    }
};

let markdownTimer = null;
let styleTimer = null;

const markdownSaveTimeout = 1000;
const styleSaveTimeout = 2000;

export default (props) => {
    const { section, onMarkdownChanged, onStyleChanged } = props;

    const [markdownText, setMarkdownText] = React.useState('');
    const [styleText, setStyleText] = React.useState('');
    const [isStyleError, setIsStyleError] = React.useState(false);

    React.useEffect(() => {
        setStyleText(section.style);
    }, [section.style]);

    React.useEffect(() => {
        setMarkdownText(section.markdown);
    }, [section.markdown]);

    const onMarkdownTextChanged = (value) => {
        clearTimeout(markdownTimer);
        setMarkdownText(value);
        markdownTimer = setTimeout(() => {
          onMarkdownChanged(value);
        }, markdownSaveTimeout);
    };

    const onStyleTextChanged = (value) => {
        clearTimeout(styleTimer);
        setStyleText(value);
        styleTimer = setTimeout(() => {
            try {
                const style = JSON.parse(value);
                if (typeof style === 'object') {
                    const formattedStyle = JSON.stringify(style, null, '\t')
                    onStyleChanged(formattedStyle);
                    setIsStyleError(false);
                }
                else {
                    setIsStyleError(true);
                }
            } catch {
                setIsStyleError(true);
            }
        }, styleSaveTimeout);
    };

    return (
        <div style={style.root}>
            <TextField
                id="outlined-multiline-static"
                label="Markdown"
                multiline
                rows="15"
                variant="outlined"
                style={style.root.textField}
                value={markdownText}
                onChange={(e) => onMarkdownTextChanged(e.target.value)}
            />
            <TextField
                id="outlined-multiline-static"
                label="Styles"
                multiline
                rows="15"
                variant="outlined"
                style={style.root.textField}
                value={styleText}
                color={isStyleError ? 'secondary' : 'primary'}
                onChange={(e) => onStyleTextChanged(e.target.value)}
            />
        </div>
    );
};
