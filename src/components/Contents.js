import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import styles from './Contents.module.css';

const Contents = () => {
  const days = useSelector((state) => state.days);

  return (
    <div className={styles.contents}>
      <table>
        <thead>
          <tr>
            <th># Day</th>
            <th style={{ textAlign: 'center' }}>Topics</th>
          </tr>
        </thead>
        <tbody>
          {days.map((dayObj, index) => (
            <tr key={index}>
              <td>{dayObj.day}</td>
              <td style={{ textAlign: 'center' }}>
                <Link href={`/${dayObj.filename}`}>{dayObj.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contents;