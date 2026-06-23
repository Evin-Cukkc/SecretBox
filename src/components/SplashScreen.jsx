import { motion } from "framer-motion";
import Logo from "./Logo";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-[#050816] flex flex-col items-center justify-center overflow-hidden">

      {/* Glow Background */}
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-purple-600/20 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />

      {/* Logo */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="z-10"
      >
        <Logo size={120} />
      </motion.div>

      {/* Nama */}
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.5,
          duration: 0.8,
        }}
        className="mt-8 text-4xl font-bold text-white tracking-wide z-10"
      >
        SecretBox
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.9,
          duration: 0.8,
        }}
        className="mt-3 text-gray-400 text-center z-10"
      >
        Tempat Aman Untuk Bercerita
      </motion.p>

      {/* Loading */}
      <motion.div
        className="absolute bottom-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.2,
        }}
      >
        <div className="flex gap-2">

          <motion.span
            className="w-2 h-2 rounded-full bg-purple-400"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
            }}
          />

          <motion.span
            className="w-2 h-2 rounded-full bg-purple-400"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: 0.2,
            }}
          />

          <motion.span
            className="w-2 h-2 rounded-full bg-purple-400"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: 0.4,
            }}
          />

        </div>
      </motion.div>

    </div>
  );
}