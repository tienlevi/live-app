export const getUrlParams = (url = window.location.href): URLSearchParams => {
  const urlObj = new URL(url);
  return urlObj.searchParams;
};

export const setUrlParams = (
  params: Record<string, string | number | boolean | null | undefined>,
) => {
  const url = new URL(window.location.href);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      url.searchParams.delete(key);
      return;
    }
    url.searchParams.set(key, String(value));
  });

  window.history.pushState({}, "", url.toString());
};
