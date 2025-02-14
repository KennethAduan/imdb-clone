const ImagePlaceholder = ({ title }: { title: string }) => {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 400 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Placeholder for ${title}`}
    >
      <rect width="400" height="600" fill="#1A1A1A" />
      <path
        d="M200 250c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm0 80c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"
        fill="#666"
      />
      <path
        d="M200 270c-15.5 0-28 12.5-28 28s12.5 28 28 28 28-12.5 28-28-12.5-28-28-28zm0 40c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12z"
        fill="#666"
      />
      <text
        x="200"
        y="360"
        textAnchor="middle"
        fill="#666"
        fontSize="24"
        fontFamily="system-ui"
      >
        Image Not Available
      </text>
      <text
        x="200"
        y="390"
        textAnchor="middle"
        fill="#666"
        fontSize="18"
        fontFamily="system-ui"
      >
        {title}
      </text>
    </svg>
  );
};

export default ImagePlaceholder;
