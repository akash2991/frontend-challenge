export function debounce(func, delay) {
  let inDebounce;
  return function (...args) {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func(...args), delay);
  };
}
