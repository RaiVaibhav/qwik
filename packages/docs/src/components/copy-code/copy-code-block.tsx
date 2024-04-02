import { $, component$, sync$, useStore, useStyles$ } from '@builder.io/qwik';
import { CopyCode as CopyCodeIcon } from '../svgs/copy-code-icon';
import styles from './copy-code.css?inline';

const Check = component$(({ height = '12', width = '12' }) => {
  useStyles$(styles);

  return (
    <svg
      class="w-3.5 h-3.5 text-white "
      height={height}
      width={width}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 12"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M1 5.917 5.724 10.5 15 1.5"
      />
    </svg>
  );
});
export const CopyCode = component$(({ code }: { code: string }) => {
  const store = useStore({
    copied: false,
  });
  return (
    <button
      onClick$={async (e) => {
        e.preventDefault();
        store.copied = !store.copied;
        if (store.copied) {
          setTimeout(() => (store.copied = false), 1500);
        }
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(code);
        }
      }}
      class="absolute text-white right-2 top-2 shadow-2xl bg-[#1e1e1e] z-10"
    >
      {store.copied ? (
        <span class="check">
          <Check />
        </span>
      ) : (
        <span class="check">
          <CopyCodeIcon />
        </span>
      )}
    </button>
  );
});
