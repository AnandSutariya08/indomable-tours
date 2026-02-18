import { Tour } from "@/hooks/useFirestoreData";

const srilankaSeeds: Omit<Tour, "id">[] = [
  {
    title: "Sri Lanka Signature: Heritage, Tea Hills & Coastal Luxury",
    location: "Colombo - Sigiriya - Kandy - Nuwara Eliya - Yala - Galle",
    country: "Sri Lanka",
    image:
      "https://images.unsplash.com/photo-1587502537745-84b86da1204f?auto=format&fit=crop&q=80",
    duration: "11N 12D",
    groupSize: "2 Pax",
    price:
      "From 4,799 CAD per person on twin sharing basis (4 Star Premium – 2 Pax)",
    rating: 4.9,
    description:
      "A beautifully curated luxury journey through the island’s most iconic landscapes — from ancient UNESCO rock fortresses and sacred Buddhist temples to misty tea plantations and golden Indian Ocean beaches.",
    fullDescription:
      "Sri Lanka Signature is a beautifully curated luxury journey through the island’s most iconic landscapes — from ancient UNESCO rock fortresses and sacred Buddhist temples to misty tea plantations and golden Indian Ocean beaches. Climb the legendary Sigiriya Rock Fortress, enjoy a scenic hill-country train ride through emerald tea estates, track leopards in Yala National Park, and unwind in the colonial charm of Galle Fort. This itinerary blends culture, wildlife, nature, and coastal elegance — perfect for travellers seeking a refined island escape with diverse experiences in under two weeks. Final price depends on hotel category & group size. Accommodation: 4 Star Premium. Upgrade available to 5 Star Standard / Luxury Resorts & Boutique Villas.",
    highlights: [
      "Sigiriya Rock Fortress sunrise climb",
      "Dambulla Cave Temple visit",
      "Temple of the Sacred Tooth Relic in Kandy",
      "Scenic train journey through tea country",
      "Tea estate visit & tasting session",
      "Yala National Park Jeep Safari (leopard territory)",
      "Dutch Fort Galle heritage walk",
      "Indian Ocean coastal relaxation",
      "Spice garden experience in Matale",
    ],
    tags: ["Culture & Heritage", "Wildlife", "Tea Plantations", "Beaches"],
    included: [
      "01 Night accommodation in Colombo with Breakfast",
      "02 Nights accommodation in Sigiriya with Breakfast & Dinner",
      "02 Nights accommodation in Kandy with Breakfast",
      "02 Nights accommodation in Nuwara Eliya with Breakfast",
      "02 Nights accommodation in Yala with Breakfast & Dinner",
      "02 Nights accommodation in Galle with Breakfast",
      "Airport transfers by private A/C vehicle",
      "All sightseeing & intercity transfers by private A/C vehicle",
      "English-speaking chauffeur guide throughout the tour",
      "Entrance fees as per itinerary",
      "01 Jeep Safari in Yala National Park",
      "Scenic train ride from Kandy to Nuwara Eliya (subject to availability)",
      "Applicable hotel taxes",
    ],
    notIncluded: [
      "International Flights",
      "Sri Lanka Visa Fees (ETA required)",
      "Personal expenses (laundry, drinks, phone calls, etc.)",
      "Tips & gratuities",
      "Optional activities",
      "Anything not mentioned in inclusions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival – Colombo",
        description:
          "Meeting at Bandaranaike International Airport upon arrival by our representative. Transfer to Colombo and check-in at hotel. Evening city orientation including Galle Face Green, colonial buildings, and seaside promenade. Overnight at hotel.",
      },
      {
        day: 2,
        title: "Colombo – Sigiriya",
        description:
          "Drive to Sigiriya (approx. 4–5 hours). Enroute visit a Spice Garden in Matale to learn about Sri Lanka’s cinnamon, cardamom, and clove cultivation. Check-in at resort near Sigiriya. Evening at leisure. Overnight at hotel.",
      },
      {
        day: 3,
        title: "Sigiriya",
        description:
          "Early morning climb to Sigiriya Rock Fortress, a UNESCO World Heritage Site known as the “Eighth Wonder of the World.” Later visit Dambulla Cave Temple with its ancient Buddhist murals and statues. Optional village experience with bullock cart ride & traditional lunch. Overnight at hotel.",
      },
      {
        day: 4,
        title: "Sigiriya – Kandy",
        description:
          "Drive to Kandy (approx. 3 hours). Visit Temple of the Sacred Tooth Relic, one of the most important Buddhist pilgrimage sites in the world. Evening cultural dance performance featuring Kandyan traditional arts. Overnight at hotel.",
      },
      {
        day: 5,
        title: "Kandy",
        description:
          "Visit Royal Botanical Gardens in Peradeniya. Explore Kandy town and lake area. Afternoon at leisure or optional cooking class experience. Overnight at hotel.",
      },
      {
        day: 6,
        title: "Kandy – Nuwara Eliya (Train Experience)",
        description:
          "Scenic train ride from Kandy to Nuwara Eliya (approx. 4 hours, subject to availability). This is considered one of the most beautiful train journeys in the world. Visit tea plantation & factory to learn about Ceylon tea production. Overnight at hotel.",
      },
      {
        day: 7,
        title: "Nuwara Eliya",
        description:
          "Explore “Little England” including Gregory Lake and colonial-era buildings. Optional nature walk in Horton Plains National Park (World’s End viewpoint). Overnight at hotel.",
      },
      {
        day: 8,
        title: "Nuwara Eliya – Yala",
        description:
          "Drive to Yala (approx. 4–5 hours). Check-in at wildlife lodge. Evening at leisure. Overnight at hotel.",
      },
      {
        day: 9,
        title: "Yala",
        description:
          "Early morning Jeep Safari in Yala National Park, home to leopards, elephants, crocodiles, and diverse birdlife. Afternoon at leisure. Optional second safari. Overnight at hotel.",
      },
      {
        day: 10,
        title: "Yala – Galle",
        description:
          "Drive to Galle (approx. 4 hours). Check-in at boutique coastal hotel. Evening at leisure by the beach. Overnight at hotel.",
      },
      {
        day: 11,
        title: "Galle",
        description:
          "Guided walking tour of Dutch Fort Galle, a UNESCO site with colonial architecture, cafés, and boutiques. Afternoon at leisure to relax on the beach or enjoy optional whale watching excursion (seasonal). Overnight at hotel.",
      },
      {
        day: 12,
        title: "Galle – Departure",
        description:
          "Drive to Colombo International Airport (approx. 2–2.5 hours). Bid farewell to Sri Lanka with unforgettable island memories.",
      },
    ],
    gallery: [],
  },
];

export default srilankaSeeds;
