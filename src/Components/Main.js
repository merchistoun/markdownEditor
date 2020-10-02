import React from 'react';
import uniqid from 'uniqid';
import { getSites, getInduction } from '../api';

import ApiSelector from './ApiSelector';
import Buttons from './Buttons';
import Editor from './Editor';
import Viewer from './Viewer';
import Dialog from './Dialog';

const style = {
    root: {
        background: 'linear-gradient(0deg, rgba(240,240,240,1) 0%, rgba(255,255,255,1) 100%)'
    }
};

export default () => {
    const buttons = [{ text: 'OK', action: () => setIsDialogOpen(false) }];

    const newSection = () => ({
        id: uniqid(),
        markdown: '',
        style: ''
    });

    const [sites, setSites] = React.useState([]);
    const [selectedSite, setSelectedSite] = React.useState([]);

    const [sections, setSections] = React.useState([newSection()]);
    const [index, setIndex] = React.useState(0);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const [baseUrl, setBaseUrl] = React.useState(process.env.REACT_APP_API_PUBLIC);
    const [resourceRef, setResourceRef] = React.useState('AngloAmericanBrisbane');
    const [apiValue, setApiValue] = React.useState('');

    React.useEffect(() => {
        // get sites
        const sites = getSites();
    }, []);

    React.useEffect(() => {
        // set API for resources
        setApiValue(`${baseUrl}/Resource/${resourceRef}`);
    }, [baseUrl, resourceRef]);

    const addSection = () => {
        const maxIndex = sections.length;
        setSections((prev) => [...prev, newSection()]);
        setIndex(() => maxIndex);
    };

    const deleteSection = () => {
        setSections((prev) => prev.filter((_, idx) => idx !== index));
        setIndex((prev) => Math.max(0, prev - 1));
    };

    const onUp = (idx) => {
        const copy = [...sections];
        const temp = copy[idx - 1];
        copy[idx - 1] = copy[idx];
        copy[idx] = temp;
        setIndex(idx - 1);
        setSections(copy);
    };

    const onDown = (idx) => {
        const copy = [...sections];
        const temp = copy[idx + 1];
        copy[idx + 1] = copy[idx];
        copy[idx] = temp;
        setIndex(idx + 1);
        setSections(copy);
    };

    const copyToClipboard = () => {
        var textArea = document.createElement('textarea');
        textArea.value = JSON.stringify(sections);
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            setIsDialogOpen(true);
        } catch (err) {
            console.log(sections);
        }
        document.body.removeChild(textArea);
    };

    const onMarkdownChanged = (value) => {
        setSections((prev) =>
            prev.map((section, idx) => {
                return idx !== index ? section : { ...section, markdown: value };
            })
        );
    };

    const onStyleChanged = (value) => {
        setSections((prev) =>
            prev.map((section, idx) => {
                return idx !== index ? section : { ...section, style: value };
            })
        );
    };

    return (
        <>
            <div style={style.root}>
                <ApiSelector
                    baseUrl={baseUrl}
                    setBaseUrl={setBaseUrl}
                    resourceRef={resourceRef}
                    setResourceRef={setResourceRef}
                />

                <Buttons
                    addSection={addSection}
                    deleteSection={deleteSection}
                    canDeleteSection={sections.length > 1}
                    sections={sections}
                    index={index}
                    onUp={onUp}
                    onDown={onDown}
                    copyToClipboard={copyToClipboard}
                />

                <Editor
                    section={sections[index]}
                    onMarkdownChanged={onMarkdownChanged}
                    onStyleChanged={onStyleChanged}
                />
            </div>

            <Viewer sections={sections} apiValue={apiValue} index={index} setIndex={setIndex} />

            <Dialog title="Copied to Clipboard" buttons={buttons} onCancel={buttons[0].action} isOpen={isDialogOpen} />
        </>
    );
};
