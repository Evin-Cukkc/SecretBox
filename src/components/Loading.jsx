import Logo from "./Logo";

export default function Loading({ text = "Memuat..." }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050816]">
      {/* Logo */}
      <Logo size={72} />

      {/* Spinner */}
      <div className="mt-8">
        <div className="
          w-12
          h-12
          rounded-full
          border-4
          border-purple-500
          border-t-transparent
          animate-spin
        " />
      </div>

      {/* Text */}
      <p className="mt-6 text-gray-400 text-sm tracking-wide">
        {text}
      </p>
    </div>
  );
}