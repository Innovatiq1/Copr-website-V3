export default function ExcelIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#1D6F42" />
      <path d="M7 7L10.5 12L7 17H9.5L12 13.5L14.5 17H17L13.5 12L17 7H14.5L12 10.5L9.5 7H7Z" fill="white" />
    </svg>
  );
}
