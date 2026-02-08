type QuoteData = {
  distanceKm: number;
  propertyType: "apartamento" | "casa";
  items: "poucos" | "medios" | "muitos";
  helpers: boolean;
};

export function calculatePrice(data: QuoteData) {
  let price = 250; // preço base

  // distância
  price += data.distanceKm * 3.5;

  // tipo de imóvel
  if (data.propertyType === "casa") {
    price += 80;
  }

  // quantidade de itens
  if (data.items === "medios") price += 120;
  if (data.items === "muitos") price += 250;

  // ajudantes extras
  if (data.helpers) price += 150;

  return Math.round(price);
}
