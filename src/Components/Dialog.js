import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default (props) => {
    const { isOpen, title, content, buttons, onCancel } = props;

    return (
        <Dialog
            open={isOpen}
            keepMounted
            onClose={onCancel}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            data-testid="Dialog"
        >
            <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">{content}</DialogContentText>
            </DialogContent>

            <DialogActions>
                {buttons.map((button, index) => (
                    <Button key={`button_${index}`} onClick={button.action} color={button.color || 'primary'}>
                        {button.text}
                    </Button>
                ))}
            </DialogActions>
        </Dialog>
    );
};
