export const getRecruitmentStateMessage = (recruitmentState: number) => {
  switch (recruitmentState) {
    case 1:
      return 'Preparation';
    case 2:
      return 'Invitation sent';
    case 3:
      return 'Invitation accepted';
    case 4:
      return 'Invitation rejected';
    case 5:
      return 'Finished';
  }
};
