import { Tour } from "@/hooks/useFirestoreData";

const nepalSeeds: Omit<Tour, "id">[] = [
  {
    title: "Magical Nepal: Culture, Wildlife & Himalayan Views",
    location: "Kathmandu - Chitwan - Pokhara - Nagarkot",
    country: "Nepal",
    image: "https://images.unsplash.com/photo-1544806318-77717478637c?auto=format&fit=crop&q=80",
    duration: "8N 9D",
    groupSize: "2 Pax",
    price: "From 1899 CAD",
    rating: 4.8,
    description: "A balanced journey through spiritual heart, wildlife jungles, and Himalayan landscapes.",
    fullDescription: "Explore sacred Hindu and Buddhist shrines in Kathmandu, witness sunrise over the Annapurna range in Pokhara, experience thrilling jungle safaris in Chitwan National Park, and end with panoramic views from Nagarkot.",
    highlights: [
      "Pashupatinath & Sadhus interaction",
      "Bouddhanath Stupa & Lama interaction",
      "Bhaktapur & Patan Durbar Squares",
      "Chitwan Jeep Safari",
      "Sarangkot Sunrise excursion"
    ],
    tags: ["Culture", "Wildlife", "Mountains"],
    included: [
      "3 Nights Kathmandu",
      "2 Nights Chitwan (Full Board)",
      "2 Nights Pokhara",
      "1 Night Nagarkot",
      "Private A/C Vehicle",
      "English-speaking guide"
    ],
    notIncluded: [
      "International Flights",
      "Nepal Visa Fees",
      "Personal expenses",
      "Tips"
    ],
    itinerary: [
      { day: 1, title: "Arrival Kathmandu", description: "Meeting at airport and transfer to hotel." },
      { day: 2, title: "Kathmandu Culture", description: "Visit Pashupatinath and Bouddhanath Stupa. Later visit Bhaktapur." },
      { day: 3, title: "Patan & Swayambhunath", description: "Visit Patan Durbar Square and Monkey Temple. Explore Kathmandu Durbar Square." },
      { day: 4, title: "Kathmandu to Chitwan", description: "6-hour drive to Chitwan National Park." },
      { day: 5, title: "Chitwan Wildlife", description: "Elephant Safari, Canoeing, Nature Walk, and Bird Watching." },
      { day: 6, title: "Chitwan to Pokhara", description: "4-hour drive to Pokhara with views of Annapurna." },
      { day: 7, title: "Pokhara Sightseeing", description: "Sarangkot sunrise, Bindebasini Temple, Devi's fall, and Fewa Lake boating." },
      { day: 8, title: "Pokhara to Nagarkot", description: "Drive back to Kathmandu and continue to Nagarkot for sunset." },
      { day: 9, title: "Departure", description: "Transfer to airport for onward journey." }
    ],
    gallery: []
  },
  {
    title: "Magical Nepal: Heritage, Himalayas & Sacred Lumbini",
    location: "Kathmandu - Kuringtar - Pokhara - Lumbini - Chitwan - Nagarkot",
    country: "Nepal",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80",
    duration: "11N 12D",
    groupSize: "2 Pax",
    price: "From 2674 CAD",
    rating: 4.9,
    description: "Comprehensive circuit covering spiritual capital, Himalayan viewpoints, and Buddha's birthplace.",
    fullDescription: "From ancient temples to sunrise over Annapurna, serene riverside in Kuringtar to pilgrimage in Lumbini, and thrilling safaris in Chitwan.",
    highlights: [
      "All 3 Durbar Squares",
      "Lumbini - Birthplace of Buddha",
      "Manakamana Temple Cable Car (Optional)",
      "Chitwan Jeep Safari",
      "Nagarkot Himalayan sunrise"
    ],
    tags: ["Heritage", "Pilgrimage", "Wildlife"],
    included: [
      "11 Nights Accommodation",
      "Breakfast Daily",
      "Chitwan Full Board",
      "Private A/C Vehicle",
      "English-speaking guide"
    ],
    notIncluded: ["Flights", "Visa", "Cable Car tickets", "Tips"],
    itinerary: [
      { day: 1, title: "Arrival Kathmandu", description: "Arrival and hotel transfer." },
      { day: 2, title: "Kathmandu Spiritual", description: "Pashupatinath and Bouddhanath visits." }
    ],
    gallery: []
  }
];

export default nepalSeeds;
