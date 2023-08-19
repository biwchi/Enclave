export default function ChevronIcon({ rotate }: { rotate?: boolean }) {
  return (
    <div className={'transition ' + (rotate ? 'rotate-180' : undefined)}>
      <svg width="10" height="6" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 0.125L7.75 3.875H0.25L4 0.125Z" fill="#586A84" />
      </svg>
    </div>
  );
}
