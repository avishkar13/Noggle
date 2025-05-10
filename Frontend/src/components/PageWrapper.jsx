import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PageWrapper = ({ children }) => {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signUp';

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity:1, transition: { duration: 0.6 } },
    exit: { opacity:0, transition: { duration: 0.6 } },
  };

  return isAuthRoute ? (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className="min-h-screen w-full"
    >
      {children}
    </motion.div>
  ) : (
    <div className="min-h-screen">{children}</div>
  );
};

export default PageWrapper;
