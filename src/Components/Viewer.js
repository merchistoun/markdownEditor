import React from 'react';
import ReactMarkdown from 'react-markdown';
import { createUseStyles } from 'react-jss';

const style = {
    section: {
        minHeight: '1.25rem',
        border: '1px solid #CCC'
    }
};

const getStyle = (isActive) => {
    return isActive ? { ...style.section, border: '1px solid orange' } : { ...style.section };
};

export default (props) => {
    const { sections, apiValue, index, setIndex } = props;
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
        <>
            {sections?.length
                ? sections.map((section, idx) => {
                    console.log(section.style);
                      const source = section.markdown.replaceAll('{{api}}', apiValue);
                      const style = section.style.length
                          ? JSON.parse(section.style.replaceAll('{{api}}', apiValue))
                          : '';

                      return (
                          <div
                              key={section.id}
                              style={getStyle(section.id === selectedId)}
                              onClick={() => setIndex(idx)}
                          >
                              <StyledMarkdown style={style} source={source} />
                          </div>
                      );
                  })
                : null}
        </>
    );
};
