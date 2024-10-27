// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray
    .map((movie) => movie.director)
    .filter((element, index, array) => array.indexOf(element) === index);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  return moviesArray.filter(
    (element) =>
      element.director === "Steven Spielberg" && element.genre.includes("Drama")
  ).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length > 0) {
    let avg =
      moviesArray.reduce((sum, element) => {
        return element.score !== undefined ? sum + element.score : sum;
      }, 0) / moviesArray.length;
    return Math.round(avg * 100) / 100;
  } else {
    return 0;
  }
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  let dramaArray = moviesArray.filter((movie) => movie.genre.includes("Drama"));
  let dramaAvg =
    dramaArray.reduce(
      (sum, movie) => (movie.score !== undefined ? sum + movie.score : sum),
      0
    ) / dramaArray.length;
  return Math.round((dramaArray.length === 0 ? 0 : dramaAvg) * 100) / 100;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  let sortedArray = moviesArray.toSorted(
    (a, b) => a.year - b.year || a.title.localeCompare(b.title)
  );
  return sortedArray;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  let sortedArray = moviesArray
    .toSorted((a, b) => a.title.localeCompare(b.title))
    .map((element) => element.title);
  return sortedArray.filter((value, index) => index < 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  let newArray = JSON.parse(JSON.stringify(moviesArray));

  newArray.map((movie) => {
    let hours = movie.duration
      .split(" ")
      .filter((value) => value.includes("h"))
      .join("");

    let mins = movie.duration
      .split(" ")
      .filter((value) => value.includes("min"))
      .join("");

    hours = Number(hours.replace("h", ""));
    mins = Number(mins.replace("min", ""));

    let totalMins = hours * 60 + mins;
    movie.duration = totalMins;

    return movie;
  });
  return newArray;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  newArray = JSON.parse(JSON.stringify(moviesArray));

  let yearUnique = newArray
    .map((value) => value.year)
    .filter((item, index, array) => array.indexOf(item) === index);
  yearUnique.sort((a, b) => b - a);

  let avgScoreYearly = [];
  for (year of yearUnique) {
    avgScoreYearly.push([
      year,
      newArray
        .filter((item) => item.year === year)
        .map((element) => element.score)
        .reduce((sum, value) => sum + value, 0) /
        newArray.filter((item) => item.year === year).length,
    ]);
  }

  let finalList = avgScoreYearly.filter(
    (item) => typeof item[1] === "number" && typeof item[0] === "number"
  );
  let bestScore = 0;
  let bestYear = 0;

  console.log(finalList);

  for (item of finalList) {
    if (bestScore <= item[1]) {
      bestScore = Math.max(bestScore, item[1]);
      bestYear = item[0];
    }
  }

  return moviesArray.length === 0
    ? null
    : `The best year was ${bestYear} with an average score of ${bestScore}`;

  // return avgScoreYearly
}
