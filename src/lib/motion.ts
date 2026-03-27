export const motionEasing = {
  emphasized: [0.22, 1, 0.36, 1] as const,
  standard: [0.16, 1, 0.3, 1] as const,
  exit: [0.4, 0, 0.2, 1] as const,
};

export const motionDurations = {
  hover: 0.14,
  fast: 0.16,
  base: 0.48,
  slow: 0.72,
  hero: 0.86,
};

export const motionViewport = {
  once: true,
  amount: 0.18,
} as const;

export function createFadeUpSoft(y = 18, delay = 0) {
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionDurations.base,
        delay,
        ease: motionEasing.emphasized,
      },
    },
  };
}

export const fadeInSoft = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: motionDurations.base,
      ease: motionEasing.emphasized,
    },
  },
};

export const fadeUpSoft = createFadeUpSoft();

export const staggerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
      ease: motionEasing.emphasized,
    },
  },
};

export const staggerStandard = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
      ease: motionEasing.emphasized,
    },
  },
};

export const dialogOverlay = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: motionDurations.base,
      ease: motionEasing.emphasized,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: motionDurations.fast,
      ease: motionEasing.exit,
    },
  },
};

export const dialogContent = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDurations.base,
      ease: motionEasing.emphasized,
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: {
      duration: motionDurations.fast,
      ease: motionEasing.exit,
    },
  },
};
