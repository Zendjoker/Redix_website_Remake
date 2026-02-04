// src/components/VideoShowcase/VideoShowcase.jsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { videoProjects } from '../../data/videoShowcase';
import styles from './VideoShowcase.module.css';

const VideoShowcase = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  // Show first 8 videos in the gallery
  const displayedVideos = videoProjects.slice(0, 8);

  const openModal = (video, index) => {
    setSelectedVideo(video);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setSelectedVideo(null);
  };

  const nextVideo = () => {
    const newIndex = (currentIndex + 1) % displayedVideos.length;
    setCurrentIndex(newIndex);
    setSelectedVideo(displayedVideos[newIndex]);
  };

  const prevVideo = () => {
    const newIndex = (currentIndex - 1 + displayedVideos.length) % displayedVideos.length;
    setCurrentIndex(newIndex);
    setSelectedVideo(displayedVideos[newIndex]);
  };

  return (
    <section className={styles.showcase} id="video-showcase">
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className={styles.badge}>
            <FaPlay /> Portfolio
          </span>
          <h2 className={styles.title}>Our Creative Work</h2>
          <p className={styles.subtitle}>
            Stunning video content that captivates audiences and elevates brands
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className={styles.gallery}>
          {displayedVideos.map((video, index) => (
            <motion.div
              key={video.id}
              className={`${styles.galleryItem} ${video.type === 'landscape' ? styles.landscape : styles.portrait}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => openModal(video, index)}
            >
              <div className={styles.itemInner}>
                <video
                  src={video.videoUrl}
                  muted
                  loop
                  playsInline
                  className={styles.thumbnail}
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                />
                <div className={styles.overlay}>
                  <div className={styles.playIcon}>
                    <FaPlay />
                  </div>
                  <div className={styles.itemInfo}>
                    <span className={styles.category}>{video.category}</span>
                    <h3 className={styles.itemTitle}>{video.title}</h3>
                    <p className={styles.client}>{video.client}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={closeModal}>
                <FaTimes />
              </button>

              <button className={styles.modalNavBtn} onClick={prevVideo} style={{ left: '-60px' }}>
                <FaChevronLeft />
              </button>

              <div className={`${styles.videoContainer} ${selectedVideo.type === 'reel' ? styles.reelContainer : ''}`}>
                <video
                  ref={videoRef}
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  className={styles.modalVideo}
                />
              </div>

              <button className={styles.modalNavBtn} onClick={nextVideo} style={{ right: '-60px' }}>
                <FaChevronRight />
              </button>

              <div className={styles.modalInfo}>
                <span className={styles.modalCategory}>{selectedVideo.category}</span>
                <h3 className={styles.modalTitle}>{selectedVideo.title}</h3>
                <p className={styles.modalDesc}>{selectedVideo.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoShowcase;
