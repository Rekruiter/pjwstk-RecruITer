export const getStatusMessage = (status: boolean | null) => {
  switch (status) {
    case null:
      return 'Waiting for response';
    case true:
      return 'Accepted';
    case false:
      return 'Rejected';
  }
};
