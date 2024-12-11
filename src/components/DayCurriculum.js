import React from 'react';
import { useSelector } from 'react-redux';
import styles from './DayCurriculum.module.css'
import SpeechButton from './SpeechButton';

const DayCurriculum = () => {
  const days = useSelector((state) => state.days);
  const filename = useSelector((state) => state.filename);
  const dayContent = days.find(day => day.filename === filename);

  if (!dayContent) {
    return <div>Loading...</div>;
  }

  const parseStyle = (styleString) => {
    try {
      return JSON.parse(styleString.replace(/([a-zA-Z0-9-]+?):/g, '"$1":').replace(/'/g, '"'));
    } catch (error) {
      console.error('Failed to parse style string:', styleString);
      return {};
    }
  };

  const blockElements = ['div', 'blockquote'];

  const renderContent = (item, isLastSibling = false) => {
    if (!item) return null;

    if (item.type === 'Text') {
      return item.content.trim() + ' ';
    }

    const { tagName, attributes = {}, children = [] } = item;
    const Tag = tagName;

    const finalAttributes = { ...attributes };
    if (attributes.style && typeof attributes.style === 'string') {
      finalAttributes.style = parseStyle(attributes.style);
    }

    const voidElements = ['br', 'hr', 'img', 'input', 'link', 'meta', 'source'];
    if (voidElements.includes(Tag)) {
      return <Tag key={Math.random()} {...finalAttributes} />;
    }

    const extractTextContent = (children) => {
      return children
        .filter(child => child.type === 'Text')
        .map(child => child.content.trim())
        .join(' ')
        .trim();
    };

    const containsImgOrCode = children.some(
      child => child.tagName === 'img' || child.tagName === 'code'
    );

    // Extract the text content
    const textContent = extractTextContent(children);

    return (
      <React.Fragment key={Math.random()}>
        <Tag {...finalAttributes}>
          {children.map((child, index) => (
            <React.Fragment key={index}>
              {renderContent(child, index === children.length - 1)}
            </React.Fragment>
          ))}
          {(Tag === 'p' || Tag === 'li') &&
            !containsImgOrCode &&
            textContent && (
              <SpeechButton text={textContent} />
          )}
        </Tag>
        {!isLastSibling && blockElements.includes(Tag) ? <br /> : null}
      </React.Fragment>
    );
  };

  return (
    <div className={styles.dayCurriculum}>
      {dayContent.content.children.map((child, index) => (
        <React.Fragment key={index}>
          {renderContent(child, index === dayContent.content.children.length - 1)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default DayCurriculum;