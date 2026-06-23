export default function Logo({ size = 48, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className} // Pengaturan drop-shadow dipindahkan penuh ke pemanggil komponen
    >
      {/* Sisi Kiri Kubus (Bayangan Dalam) */}
      <path
        d="M50 15 L15 35 L15 65 L50 45 Z"
        fill="url(#box-left)"
        opacity="0.7"
      />

      {/* Jalinan Garis Neon membentuk Huruf "S" */}
      <path
        d="M50 15 
           L85 35 
           L50 52 
           L15 35 
           L15 65 
           L50 85 
           L85 65 
           L85 50 
           M50 52 
           L50 85"
        stroke="url(#neon-purple)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Titik Inti Cahaya Rahasia */}
      <circle cx="50" cy="52" r="4" fill="#E9D5FF" />

      <defs>
        <linearGradient id="neon-purple" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D8B4FE" />
          <stop offset="0.3" stopColor="#A855F7" />
          <stop offset="1" stopColor="#6B21A8" />
        </linearGradient>

        <linearGradient id="box-left" x1="15" y1="15" x2="50" y2="65" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A855F7" stopOpacity="0.15" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}