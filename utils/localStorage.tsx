import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFavourites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('favouriteRadios');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log('Error GET', e);
    return [];
  }
};

export const storeFavourites = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('favouriteRadios', jsonValue);
  } catch (e) {
    console.log('error STORE', e);
  }
};

export const addToFavourites = async (value) => {
  let favourites = await getFavourites();
  console.log(favourites, value, 'FAVE');

  const stationIndex = favourites.findIndex((alreadyFavourited) => {
    return alreadyFavourited.stationuuid === value.stationuuid;
  });

  if (stationIndex !== -1) {
  } else {
    favourites.push(value);
  }

  console.log(favourites, stationIndex, 'FAVE After');
  await storeFavourites(favourites);
};

export const deteleFromFavourties = async (value) => {
  let favourites = await getFavourites();

  const stationIndex = favourites.findIndex((alreadyFavourited) => {
    return alreadyFavourited.stationuuid === value.stationuuid;
  });

  if (stationIndex !== -1) {
    favourites.splice(stationIndex, 1);
  }
  storeFavourites(favourites);
};

// export const setCart = (cart) => {
//   localStorage.setItem('cart', JSON.stringify(cart))
// };

// export const getCart = () => {
//   try {
//     const cart = JSON.parse(localStorage.getItem('cart'))
//     if (cart) {
//       return cart;
//     } else {
//       return []
//     }
//   } catch (error) {
//     return [];
//   }
// }
// export const deleteFromCart = (product) => {
//   let cart = getCart();

//   const productIndex = cart.findIndex((alreadyInCart) => {
//     return alreadyInCart.id === product.id;
//   });

//   if (productIndex !== -1) {
//     cart.splice(productIndex, 1);
//   }
//   setCart(cart);
// };

// export const addToCart = (product, quantity) => {
//   let cart = getCart();

//   const productIndex = cart.findIndex((alreadyInCart) => {
//     return alreadyInCart.id === product.id;
//   });

//   if (productIndex !== -1) {
//     cart[productIndex].quantity = cart[productIndex].quantity + quantity;
//   } else {
//     product.quantity = quantity;
//     cart.push(product);
//   }

//   setCart(cart);
// };

// export const updateCart = (product, quantity) => {
//   let cart = getCart();

//   const productIndex = cart.findIndex((alreadyInCart) => {
//     return alreadyInCart.id === product.id;
//   });

//   if (productIndex !== -1) {
//     cart[productIndex].quantity =
//       Number(cart[productIndex].quantity) + quantity;
//     // cart[productIndex].quantity.toString();
//   } else {
//     product.quantity = quantity;
//     cart.push(product);
//   }

//   setCart(cart);
// };
