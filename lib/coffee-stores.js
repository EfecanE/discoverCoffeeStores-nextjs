const GET_REQUESTS_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.FOURSQUARE_API_KEY,
  },
};

export const fetchCoffeeStores = async (
  latlong = "36.89448519004559,30.708588390886444",
  limit = 6
) => {
  console.log(latlong);
  const res = await fetch(
    `https://api.foursquare.com/v3/places/search?query=coffee&ll=${latlong}&limit=${limit}`,
    GET_REQUESTS_OPTION
  );
  const data = await res.json();
  return data.results;
};

export const fetchCoffeeStoresImage = async (coffeeStores) => {
  const imagePromises = coffeeStores.map(async (coffeeStore) => {
    const res = await fetch(
      `https://api.foursquare.com/v3/places/${coffeeStore.fsq_id}/photos?limit=1`,
      GET_REQUESTS_OPTION
    );
    const data = await res.json();
    const imagePath = data[0]
      ? data[0].prefix + "300x300" + data[0].suffix
      : "/blank.png";
    return {
      ...coffeeStore,
      image: imagePath,
    };
  });

  const coffeeStoresWithImage = await Promise.all(imagePromises);

  return coffeeStoresWithImage;
};
