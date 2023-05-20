const GET_REQUESTS_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.FOURSQUARE_API_KEY,
  },
};

export const fetchCoffeeStores = async (
  latlong = "36.90203281559855,30.654303200097637",
  limit = 8
) => {
  console.log(latlong);
  const res = await fetch(
    `https://api.foursquare.com/v3/places/search?query=coffee&ll=${latlong}&limit=${limit}`,
    GET_REQUESTS_OPTION
  );
  const data = await res.json();
  return data.results;
};

export const fetchCoffeeStoresImage = async (coffeeStores, image_res) => {
  const imagePromises = coffeeStores.map(async (coffeeStore) => {
    const res = await fetch(
      `https://api.foursquare.com/v3/places/${coffeeStore.fsq_id}/photos?limit=1`,
      GET_REQUESTS_OPTION
    );
    const data = await res.json();
    const imagePath = data[0]
      ? data[0].prefix + image_res + data[0].suffix
      : "/blank.png";
    return {
      fsq_id: coffeeStore.fsq_id,
      name: coffeeStore.name,
      link: coffeeStore.link,
      formatted_address: coffeeStore.location.formatted_address,
      image: imagePath,
    };
  });

  const coffeeStoresWithImage = await Promise.all(imagePromises);

  return coffeeStoresWithImage;
};
