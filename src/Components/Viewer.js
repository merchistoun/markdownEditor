import React from 'react';
import ReactMarkdown from 'react-markdown';
import { createUseStyles } from 'react-jss';

const style = {
    root: {
        position: 'relative',
        textAlign: 'left',
        marginTop: '1rem'
    },
    section: {
        position: 'relative',
        minHeight: '1.25rem',
        borderRadius: '0.25rem',
        margin: '0 0.5rem',
        boxShadow: '0px 0px 0px 1px rgba(240,240,240,1)'
    }
};

const getStyle = (isActive) => {
    return isActive
        ? { ...style.section, boxShadow: '0px 0px 0px 2px rgba(0,0,192,1)' }
        : { ...style.section, boxShadow: '0px 0px 0px 1px rgba(240,240,240,1)' };
};

export default (props) => {
    const { sections, index, setIndex } = props;
    const selectedId = sections && sections[index] && sections[index].id;

    const StyledMarkdown = ({ style, source }) => {
        const useStyles = createUseStyles({ root: style });
        const classes = useStyles();
        return (
            <div className={classes.root}>
                <ReactMarkdown source={source} />
            </div>
        );
    };

    return (
        <div style={style.root}>
            {sections?.length
                ? sections.map((section, idx) => {
                      return (
                          <div
                              key={section.id}
                              style={getStyle(section.id === selectedId)}
                              onClick={() => setIndex(idx)}
                          >
                              <StyledMarkdown style={section.style} source={section.markdown} />
                          </div>
                      );
                  })
                : null}
        </div>
    );
};
