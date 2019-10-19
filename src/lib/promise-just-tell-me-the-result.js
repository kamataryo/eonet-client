let promises = [];

/**
 *
 * @param {Promise} promise
 * @param {number} interval msec
 */
const justTellMeTheResult = (promise, interval) =>
  new Promise((resolve, reject) => {
    promises.push(promise);

    if (promise.length === 0) {
      setTimeout(() => {
        Promise.all(promises).then(data => {
          const result = data[promises.length - 1];
          promises = [];
          resolve(result);
        });
      }, interval);
    }
  });

export default justTellMeTheResult;
