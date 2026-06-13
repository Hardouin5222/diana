import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import parchmentLetter from './assets/parchment-letter.png';

function FlowingLetter({ text }) {
  const paragraphs = useMemo(
    () => text.split('\n\n').map((item) => item.trim()).filter(Boolean),
    [text]
  );

  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    setVisibleCount(1);

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= paragraphs.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [paragraphs.length]);

  return (
    <div className="letter-scroll">
      {paragraphs.slice(0, visibleCount).map((paragraph, index) => (
        <motion.p
          key={index}
          className="letter-text"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          {paragraph}
        </motion.p>
      ))}
    </div>
  );
}

export default function Overlay({
  started,
  showFirstPoem,
  onStart,
  onEnterScene,
  firstPoem,
  activeWord,
  onCloseWord,
  showLetter,
  secondPoem,
  onCloseLetter,
}) {
  return (
    <div className="overlay-root">
      <AnimatePresence>
        {!started && !showFirstPoem && (
          <motion.div
            className="start-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="start-card"
              initial={{ y: 45, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="start-top-text">Для тебя, моя вселенная...</div>
              <div className="start-sub-text">Тебя ждёт особенный сюрприз...</div>

              <button className="soul-button" onClick={onStart}>
                Коснись моей души
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFirstPoem && (
          <motion.div
            className="intro-poem-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="intro-poem-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 45, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 110, damping: 18 }}
            >
              <p className="intro-poem-text">{firstPoem}</p>

              <button className="enter-world-button" onClick={onEnterScene}>
                Войти
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeWord && (
          <motion.div
            className="word-overlay"
            onClick={onCloseWord}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="word-burst"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.82, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 18 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            >
              {activeWord}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLetter && (
          <motion.div
            className="letter-overlay"
            onClick={onCloseLetter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="letter-wrap"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 100, damping: 16 }}
            >
              <img
                className="parchment-image"
                src={parchmentLetter}
                alt="Письмо"
              />

              <div className="letter-content">
                <FlowingLetter text={secondPoem} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}