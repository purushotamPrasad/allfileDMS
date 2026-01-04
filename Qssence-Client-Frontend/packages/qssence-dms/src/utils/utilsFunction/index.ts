export const getQueryParamAsInt = (paramName: string, urlParams: URLSearchParams | null = null): number => {
  if (typeof window !== 'undefined') {
    const params = urlParams || new URLSearchParams(window.location.search);
    const paramValue = params.get(paramName);
    const parsedValue = parseFloat(paramValue || "");
    return parsedValue;
  }

  // Default return value when running on server-side
  return 0;
};

export const getQueryParamAsString = (paramName: string, urlParams: URLSearchParams | null = null): string => {
  // Check if window object is available (running on client-side)
  if (typeof window !== 'undefined') {
    const params = urlParams || new URLSearchParams(window.location.search);
    const paramValue = params.get(paramName);
    const parsedValue = paramValue || "";
    return parsedValue;
  }

  // Default return value when running on server-side
  return "";
};

export const getQueryParamAsDate = (paramName: string, urlParams: URLSearchParams | null = null): string | null => {
  if (typeof window !== 'undefined') {
    const params = urlParams || new URLSearchParams(window.location.search);
    const paramValue = params.get(paramName);
    return paramValue || null;
  }

  // Default return value when running on server-side
  return "";
};

export const formatDateYYMMDD = (inputDate: string): string => {
  if (typeof window !== 'undefined') {
    const dateObject = new Date(inputDate);

    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const date = dateObject.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${date}`;
    return formattedDate;
  }

  // Default return value when running on server-side
  return "";
};

export const convertDateFormatLong = (inputDate: string): string => {
  const [year, month, day] = inputDate.split('-').map(Number);
  const dateObject = new Date(year, month - 1, day); // Month is zero-based

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  };

  const formattedDate = dateObject.toLocaleString('en-US', options);
  return formattedDate;
};