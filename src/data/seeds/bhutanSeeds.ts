import { Tour } from "@/hooks/useFirestoreData";

const bhutanSeeds: Omit<Tour, "id">[] = [
  {
    title: "Royal Bhutan: Monasteries, Valleys & Himalayan Majesty",
    location: "Paro - Thimphu - Punakha - Gangtey",
    country: "Bhutan",
    image: "https://images.unsplash.com/photo-1578509335553-66f80d7547b7?auto=format&fit=crop&q=80",
    duration: "8N 9D",
    groupSize: "2 Pax",
    price: "From 4999 CAD",
    rating: 4.9,
    description: "Immersive journey through the last Buddhist kingdom with cliffside monasteries and serene valleys.",
    fullDescription: "From the iconic Tiger's Nest hike to the glacial valley of Gangtey, experience spiritual depth and mountain majesty.",
    highlights: [
      "Hike to Tiger's Nest Monastery",
      "Punakha Dzong - Bhutan's most beautiful fortress",
      "Dochula Pass with 108 stupas",
      "Traditional farmhouse visit",
      "Bhutanese archery experience"
    ],
    tags: ["Spirituality", "Mountains", "Culture"],
    included: [
      "8 Nights Full Board",
      "Private vehicle",
      "English-speaking licensed guide",
      "Sustainable Development Fee (SDF)",
      "Monument entrance fees"
    ],
    notIncluded: ["Flights", "Travel Insurance", "Personal expenses", "Tips"],
    itinerary: [
      { day: 1, title: "Arrival Paro", description: "Scenic flight and arrival in Paro." },
      { day: 2, title: "Paro Sightseeing", description: "Visit National Museum and Rinpung Dzong." },
      { day: 3, title: "Tiger's Nest Hike", description: "Sacred hike to Taktsang Monastery." },
      { day: 4, title: "Paro to Thimphu", description: "Drive to capital city Thimphu." },
      { day: 5, title: "Thimphu Culture", description: "Visit Folk Heritage Museum and Archery demo." },
      { day: 6, title: "Thimphu to Punakha", description: "Drive via Dochula Pass to Punakha Dzong." },
      { day: 7, title: "Punakha to Gangtey", description: "Visit glacial Phobjikha Valley." },
      { day: 8, title: "Gangtey to Paro", description: "Drive back to Paro for leisure." },
      { day: 9, title: "Departure", description: "Transfer to Paro airport." }
    ],
    gallery: []
  }
];

export default bhutanSeeds;
