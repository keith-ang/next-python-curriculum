import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Resizable } from 're-resizable';
import { setFilename } from '../lib/redux/reducers';
import DayCurriculum from './DayCurriculum';
import PythonEditor from './PythonEditor';
import styles from './CurriculumPage.module.css';

const CurriculumPage = ({ days, filename }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (filename) {
      dispatch(setFilename(filename));
    }
  }, [filename, dispatch]);
  
  if (!filename) {
    return <div>Loading...</div>; 
  }

  return (
    <div className={styles.curriculumPage}>
      <Resizable
        defaultSize={{
          width: '50%',
          height: '100%'
        }}
        minWidth="20%"
        maxWidth="80%"
        enable={{ right: true }}
        className={styles.curriculumPane}
      >
        <div className={styles.curriculumScrollContainer}>
          <DayCurriculum days={days} filename={filename} />
        </div>
      </Resizable>
      <div className={styles.editorPane}>
        <PythonEditor />
      </div>
    </div>
  );
};

export default CurriculumPage;