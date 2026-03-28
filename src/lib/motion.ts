export const motionEasing = {
  emphasized: [0.22, 1, 0.36, 1] as const,
  soft: [0.24, 0.9, 0.32, 1] as const,
  standard: [0.16, 1, 0.3, 1] as const,
  exit: [0.4, 0, 0.2, 1] as const,
};

export const motionTokens = {
  hover: 0.16,
  tap: 0.1,
  enterFast: 0.36,
  enterBase: 0.46,
  enterSlow: 0.62,
  exitFast: 0.2,
  pageEnter: 0.44,
  pageExit: 0.24,
  heroSlide: 0.68,
  heroTrack: 0.76,
  heroTrackFlow: 0.82,
  heroPreview: 0.52,
  heroContent: 0.42,
  heroInitial: 0.58,
  introBeat: 0.2,
  introShort: 0.32,
  introBase: 0.48,
  introPanel: 0.6,
  staggerTight: 0.03,
  staggerBase: 0.055,
} as const;

export const motionDurations = {
  hover: motionTokens.hover,
  fast: motionTokens.enterFast,
  base: motionTokens.enterBase,
  slow: motionTokens.enterSlow,
  hero: motionTokens.heroSlide,
};

export const motionViewport = {
  once: true,
  amount: 0.14,
} as const;

export function createFadeUp(y = 18, delay = 0, duration: number = motionTokens.enterBase) {
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: motionEasing.emphasized,
      },
    },
  };
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: motionTokens.enterBase,
      ease: motionEasing.soft,
    },
  },
};

export const fadeUp = createFadeUp();
export const fadeUpLarge = createFadeUp(26, 0, motionTokens.enterSlow);

export function maskReveal(delay = 0) {
  return {
    hidden: { opacity: 0, scale: 1.015, clipPath: "inset(0 0 100% 0)" },
    visible: {
      opacity: 1,
      scale: 1,
      clipPath: "inset(0 0 0% 0)",
      transition: {
        duration: motionTokens.enterSlow,
        delay,
        ease: motionEasing.emphasized,
      },
    },
  };
}

export function staggerContainer(density: "tight" | "base" = "base") {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: density === "tight" ? motionTokens.staggerTight : motionTokens.staggerBase,
        delayChildren: density === "tight" ? 0.02 : 0.05,
        ease: motionEasing.emphasized,
      },
    },
  };
}

export const staggerItem = fadeUp;

export const pageFrame = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.pageEnter,
      ease: motionEasing.soft,
    },
  },
  exit: {
    opacity: 0,
    y: 6,
    transition: {
      duration: motionTokens.pageExit,
      ease: motionEasing.exit,
    },
  },
};

export const pageOverlay = {
  hidden: { opacity: 0, scaleY: 0.84, transformOrigin: "top center" },
  visible: {
    opacity: 0.32,
    scaleY: 1,
    transition: {
      duration: motionTokens.pageEnter,
      ease: motionEasing.soft,
    },
  },
  exit: {
    opacity: 0,
    scaleY: 1.04,
    transition: {
      duration: motionTokens.pageExit,
      ease: motionEasing.exit,
    },
  },
};

export const dialogOverlay = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: motionTokens.enterBase,
      ease: motionEasing.soft,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: motionTokens.exitFast,
      ease: motionEasing.exit,
    },
  },
};

export const dialogContent = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.enterBase,
      ease: motionEasing.emphasized,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: motionTokens.exitFast,
      ease: motionEasing.exit,
    },
  },
};

export const drawerContent = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: motionTokens.enterFast,
      ease: motionEasing.soft,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: motionTokens.exitFast,
      ease: motionEasing.exit,
    },
  },
};

export const fadeInSoft = fadeIn;
export const fadeUpSoft = fadeUp;
export const staggerFast = staggerContainer("tight");
export const staggerStandard = staggerContainer("base");
export const createFadeUpSoft = createFadeUp;
