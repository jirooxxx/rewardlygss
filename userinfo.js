onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("User UID:", user.uid); // Ensure the user is authenticated
        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                console.log("Fetched data:", data); // Log fetched data

                const name = data.name || "No name found";
                const balance = data.balance?.toFixed(2) || "0.00";

                document.getElementById("userName").textContent = name;
                document.getElementById("userBalance").textContent = balance;
            } else {
                console.log("No such document found for user:", user.uid);
                document.getElementById("userName").textContent = "No record";
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    } else {
        console.log("No user signed in.");
        window.location.href = "login.html"; // Redirect to login if no user is signed in
    }
});
