import React from 'react';
import styles from './HomeSection.module.css';

const HomeSection = ({ onCTAClick }) => {
  return (
    <section className={styles.mainSection}>
      <div className={styles.floatingShape + ' ' + styles.floatingShape1}></div>
      <div className={styles.floatingShape + ' ' + styles.floatingShape2}></div>
      <div className={styles.floatingShape + ' ' + styles.floatingShape3}></div>
      <div className={styles.centerContent}>
        <h1 className={styles.headline}>Welcome to TapFeed</h1>
        <p className={styles.subheadline}>Use "tap" to give feedback, fast and intuitive.</p>
        <button className={styles.ctaButton} onClick={onCTAClick}>
          Give Feedback
        </button>
      </div>
      <div className={styles.descriptionBox}>
        <p className={styles.descriptionText}>
          TapFeed is a modern platform that empowers users to share their thoughts and experiences about products and services. We help businesses improve by collecting, analyzing, and acting on real user feedback. Join us in making every voice count!
        </p>
      </div>
      {/* Reviews Card Section */}
      <div className={styles.reviewsSection}>
        <h2 className={styles.reviewsTitle}>What users say about TapFeed</h2>
        <div className={styles.reviewsGrid}>
          <div className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <span className={styles.reviewName}>Amit S.</span>
              <span className={styles.reviewRating}>★★★★★</span>
            </div>
            <p className={styles.reviewText}>
              "TapFeed made it so easy to share my feedback. The process was quick and the interface is beautiful!"
            </p>
          </div>
          <div className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <span className={styles.reviewName}>Priya K.</span>
              <span className={styles.reviewRating}>★★★★☆</span>
            </div>
            <p className={styles.reviewText}>
              "I love how intuitive TapFeed is. I could submit my review in seconds! Highly recommended."
            </p>
          </div>
          <div className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <span className={styles.reviewName}>Rahul M.</span>
              <span className={styles.reviewRating}>★★★★★</span>
            </div>
            <p className={styles.reviewText}>
              "Great platform for giving feedback. The animations and design are top-notch!"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection; 