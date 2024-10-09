export const getFilteredAndSortedNannies = (nannieArray, selectedFilter) => {
  let filteredNannies = [...nannieArray];

  switch (selectedFilter) {
    case "A to Z":
      filteredNannies.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "Z to A":
      filteredNannies.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "Price ascending": 
      filteredNannies = filteredNannies.sort(
        (a, b) => a.price_per_hour - b.price_per_hour
      );
      break;

    case "Price descending": 
      filteredNannies = filteredNannies.sort(
        (a, b) => b.price_per_hour - a.price_per_hour
      );
      break;
    case "Popular":
      filteredNannies.sort((a, b) => b.rating - a.rating);
      break;
    case "Not popular":
      filteredNannies.sort((a, b) => a.rating - b.rating);
      break;
    default:
      break;
  }

  return filteredNannies;
};
