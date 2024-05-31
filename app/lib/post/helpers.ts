export const handleToastMessage = (success: number, fail: number): string => {
  if (!fail) return `${success} image/s has been successfully uploaded`;
  if (!success) return `${fail} image/s has failed to upload`;
  else
    return `${success} image/s has been successfully uploaded and ${fail} image/s has failed to upload`;
};
