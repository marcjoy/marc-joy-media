import { useEffect } from 'react';
import { motion } from 'motion/react';
import { KemetopolisStarfield } from '@/components/kemetopolis/KemetopolisStarfield';
import KemetopolisWorldFeature from '@/components/kemetopolis/KemetopolisWorldFeature';

export default function Kemetopolis() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Kemetopolis | Marc Joy Media';
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <motion.div
      data-page="kemetopolis"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <KemetopolisStarfield />
      <KemetopolisWorldFeature />
    </motion.div>
  );
}
