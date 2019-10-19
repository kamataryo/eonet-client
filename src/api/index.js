let loneliness = true;

export const getEvents = (category, past) => {
  if (loneliness === false) {
    return Promise.reject(
      new Error("Gentle regulation not to make too many access")
    );
  } else {
    loneliness = false;
    setTimeout(() => {
      loneliness = true;
    }, 1000);
    return fetch(
      `https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories/${category}?days=${past}`
    ).then(function(response) {
      return response.json();
    });
  }
};

export const getCategories = () => {
  if (loneliness === false) {
    return Promise.reject(
      new Error("Gentle regulation not to make too many access")
    );
  } else {
    loneliness = false;
    setTimeout(() => {
      loneliness = true;
    }, 1000);
    return fetch(
      `https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories`
    ).then(function(response) {
      return response.json();
    });
  }
};
