const firebaseConfig = {
    apiKey: "AIzaSyAEzZYKQNqQLteWsZmDJKq0sYVhvG6YE9E",
    authDomain: "rewardly-go.firebaseapp.com",
    projectId: "rewardly-go",
    storageBucket: "rewardly-go.appspot.com",
    messagingSenderId: "587297879139",
    appId: "1:587297879139:web:50499dff5b83aa420a3456",
    measurementId: "G-C3V2KQ8TWT"
  };
  
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  // Element references
  const welcomeText = document.getElementById('welcomeText');
  const balanceText = document.getElementById('balance');
  
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // Get the user document from Firestore using the user's UID
      const userDocRef = db.collection("users").doc(user.uid);
      const userDoc = await userDocRef.get();
  
      if (userDoc.exists) {
        const userData = userDoc.data();
        const fullName = `${userData.firstName || 'No'} ${userData.lastName || 'Name'}`;
        welcomeText.textContent = `Hello, ${fullName}!`;
  
        // Display the user's balance
        balanceText.textContent = (userData.balance || 0).toFixed(2);
      } else {
        welcomeText.textContent = "No user data found!";
      }
    } else {
      window.location.href = "login.html";  // Redirect to login if user is not authenticated
    }
  });
  