
export const getEvents = (category,past) =>{
    return fetch(`https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories/${category}?days=${past}`)
    .then(function(response) {
      return response.json();
    });
}