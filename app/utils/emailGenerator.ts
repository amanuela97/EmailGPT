export const generateEmails = async (
  message: string,
  names: string[],
  length: number
) => {
  const res = await fetch(
    `/api/messages?message=${JSON.stringify(message)}&names=${JSON.stringify(
      names
    )}&length=${length}`
  );

  if (!res.ok) {
    return {
      error: res.statusText,
    };
  }

  const result: {
    message: string;
  }[] = await res.json();

  return { data: result };
};
