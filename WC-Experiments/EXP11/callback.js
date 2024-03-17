function simulateAPI(callback) {
    const randomDelay = Math.floor(Math.random() * 5000) ; // Random delay between 1 to 5 seconds
    setTimeout(() => {
      const data = `Data received after ${randomDelay / 1000} seconds`;
      callback(null, data);
    }, randomDelay);
  }
  
  // Define callback functions
  function callback1(error, result) {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Callback 1:", result);
    }
  }
  
  function callback2(error, result) {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Callback 2:", result);
    }
  }
  
  function callback3(error, result) {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Callback 3:", result);
    }
  }
  
  // Make multiple asynchronous calls with different callbacks
  simulateAPI(callback1);
  simulateAPI(callback2);
  simulateAPI(callback3);
  