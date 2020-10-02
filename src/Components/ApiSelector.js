import React from 'react';
import TextField from '@material-ui/core/TextField';

const style= {
    root: {
        display: 'flex',
        flexDircection: 'row',
        margin: '0.5rem',
        textField: {
            width: '20rem',
            margin: '0 0.5rem'
        }
    }
};

export default (props) => {
    const { baseUrl, setBaseUrl, resourceRef, setResourceRef } = props;
    return (
        <div style={style.root}>
            <TextField
                label="API Address"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                style={ style.root.textField }
            />
            <TextField
                label="Resource Reference"
                value={resourceRef}
                onChange={(e) => setResourceRef(e.target.value)}
                style={ style.root.textField }
            />
        </div>
    );
};
