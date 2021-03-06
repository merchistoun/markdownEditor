import React from 'react';
import Button from '@material-ui/core/Button';
import Up from '@material-ui/icons/ArrowUpward';
import Down from '@material-ui/icons/ArrowDownward';
import Fab from '@material-ui/core/Fab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const style = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        button: {
            margin: '1rem 1rem'
        }
    }
};

export default (props) => {
    const { addSection, deleteSection, canDeleteSection, copyToClipboard, sections, index, onUp, onDown, isSaveNew, onIsSaveNewChanged, saveInduction } = props;

    return (
        <div style={style.root}>
            <Button style={style.root.button} variant="contained" color="primary" onClick={addSection}>
                Add Section
            </Button>

            <Button style={style.root.button} variant="contained" color="primary" onClick={deleteSection} disabled={!canDeleteSection}>
                Delete Section
            </Button>

            <Button style={style.root.button} variant="contained" color="primary" onClick={copyToClipboard}>
                Copy To Clipboard
            </Button>

            <Fab size="small" color="primary" aria-label="add" style={style.root.button} disabled={index === 0} onClick={() => onUp(index)}>
                <Up />
            </Fab>

            <Fab size="small" color="primary" aria-label="add" style={style.root.button} disabled={index === sections.length - 1} onClick={() => onDown(index)}>
                <Down />
            </Fab>

            <FormControlLabel
                control={ <Switch checked={isSaveNew} onChange={onIsSaveNewChanged} color="secondary" name="saveNewCheck" inputProps={{ 'aria-label': 'secondary checkbox' }} /> }
                label="Create new"
            />

            <Button style={style.root.button} variant="contained" color="secondary" onClick={saveInduction}>
                Save
            </Button>
        </div>
    );
};
