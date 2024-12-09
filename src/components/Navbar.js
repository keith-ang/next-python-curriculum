import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { clearFilename } from '../lib/redux/reducers';
import styles from './Navbar.module.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const days = useSelector((state) => state.days);
  const filename = useSelector((state) => state.filename);
  const currentLessonIndex = days.findIndex(day => day.filename === filename);

  const isLessonPage = currentLessonIndex !== -1;

  const getPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      return `/${days[currentLessonIndex - 1].filename}`;
    }
    return null;
  };

  const getNextLesson = () => {
    if (currentLessonIndex < days.length - 1) {
      return `/${days[currentLessonIndex + 1].filename}`;
    }
    return null;
  };

  const previousLessonLink = getPreviousLesson();
  const nextLessonLink = getNextLesson();

  const handleHomeClick = () => {
    dispatch(clearFilename());
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <Link href="/" className={styles.home} onClick={handleHomeClick}>Home</Link>
      </div>
      <div className={styles.navbarCenter}>
        <h1>30 Days of Python</h1>
      </div>
      <div className={styles.navbarRight}>
        {isLessonPage && 
          <a href={process.env.NEXT_PUBLIC_CHATBOT_URL} target="_blank" rel="noopener noreferrer">
            Get Help
          </a>
        }
        {isLessonPage && previousLessonLink && <Link href={previousLessonLink}>Previous Lesson</Link>}
        {isLessonPage && nextLessonLink && <Link href={nextLessonLink}>Next Lesson</Link>}
      </div>
    </nav>
  );
};

export default Navbar;