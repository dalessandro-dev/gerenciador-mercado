import { db, getDocs, collection } from "./../firebase.js";

export async function getProduct(callback) {
  try {
    const querySnapshot = await getDocs(collection(db, "produtos"));

    const productsList = [];

    querySnapshot.forEach((product) => {
      const data = product.data();
      const id = product.id;

      productsList.push({ id, ...data });
    });

    callback(productsList);
  } catch (error) {
    console.log(error)
  }
}
