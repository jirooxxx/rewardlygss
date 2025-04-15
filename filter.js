firebase.firestore().collection("users").where("referralCode", "==", referralCode).get()
  .then((querySnapshot) => {
    if (!querySnapshot.empty) {
      const referrerDoc = querySnapshot.docs[0];
      const referrerData = referrerDoc.data();

      // Log if you found the referrer
      console.log("Found referrer:", referrerData);

      const newBalance = referrerData.balance + 150;
      referrerDoc.ref.update({
        balance: newBalance
      }).then(() => {
        console.log("Referral reward added to the referrer!");
      }).catch((error) => {
        console.error("Error updating referrer balance:", error);
      });
    } else {
      console.log("Referrer not found. Check the referral code.");
    }
  })
  .catch((error) => {
    console.error("Error checking referral code:", error);
  });
