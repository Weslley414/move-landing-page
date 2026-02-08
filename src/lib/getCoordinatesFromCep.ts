export async function getCoordinatesFromCep(cep: string) {
  const cleanCep = cep.replace(/\D/g, "");

  const response = await fetch(
    `https://viacep.com.br/ws/${cleanCep}/json/`
  );
  const data = await response.json();

  if (data.erro) throw new Error("CEP inválido");

  // Usamos endereço para geocoding simples (OpenStreetMap)
  const geoResponse = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${data.logradouro},${data.localidade},${data.uf}`
  );
  const geo = await geoResponse.json();

  return {
    lat: Number(geo[0].lat),
    lon: Number(geo[0].lon),
  };
}
