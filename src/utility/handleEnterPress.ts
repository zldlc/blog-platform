export const handleEnterPress = (event: React.KeyboardEvent<HTMLFormElement>): void => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
};
