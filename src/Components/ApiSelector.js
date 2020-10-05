import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const style = {
    root: {
        display: 'flex',
        flexDircection: 'row',
        margin: '0.5rem',
        textField: {
            width: '20rem',
            minWidth: '20rem',
            margin: '0 0.5rem'
        }
    }
};

export default (props) => {
    const { baseUrl, setBaseUrl, resourceRef, setResourceRef, sites, selectedSiteId, onSiteChanged } = props;

    return (
        <div style={style.root}>
            <TextField
                label="Public API Address"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                style={style.root.textField}
            />

            {sites && (
                <FormControl style={style.root.textField}>
                    <InputLabel>Site</InputLabel>
                    <Select label="Site" value={selectedSiteId} onChange={onSiteChanged}>
                        {sites.map((s) => (
                            <MenuItem key={`Site_${s.id}`} value={s.id}>
                                {s.name} {s.externalSiteId}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            <TextField
                label="Resource Reference"
                value={resourceRef}
                onChange={(e) => setResourceRef(e.target.value)}
                style={style.root.textField}
                disabled
            />
        </div>
    );
};
