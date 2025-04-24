import clsx from 'clsx';

export function Button({ children, className, ...rest }) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-black px-4 text-sm font-medium text-white transition-colors hover:bg-black/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-black/75 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 cursor-pointer',
        className,
      )}
    >
      {children}
    </button>
  );
}
