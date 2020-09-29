import React from 'react';
import TextField from '@material-ui/core/TextField';

export default (props) => {
    const { value, setValue } = props;
    return (
        <TextField label="API Address" value={value} onChange={(e) => setValue(e.target.value)} style={{width: '20rem'}}/>
    );
};
