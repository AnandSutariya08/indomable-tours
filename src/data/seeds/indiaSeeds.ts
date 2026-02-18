import { Tour } from "@/hooks/useFirestoreData";

const indiaSeeds: Omit<Tour, "id">[] = [
  {
    title: "Ultimate Rajasthan: Taj, Wildlife & Palaces",
    location: "New Delhi - Agra - Jaipur - Ranthambore - Udaipur",
    country: "India",
    image: "https://images.unsplash.com/photo-1524492707947-505c45e39715?auto=format&fit=crop&q=80",
    duration: "12N 13D",
    groupSize: "Private Tour",
    price: "From 7999 CAD",
    rating: 4.9,
    description: "Classic North India journey blending iconic monuments, royal heritage, and tiger safaris.",
    fullDescription: "From the Taj Mahal to Jaipur's grand forts and tiger tracking in Ranthambore, concluding with the romantic lakes of Udaipur.",
    highlights: [
      "Guided Taj Mahal Tour",
      "Jungle Tiger Safari at Ranthambore",
      "Jaipur City Tour & Elephant Ride",
      "Kumbhalgarh - Second Largest Wall in the world",
      "Chokhi Dhani Village Experience"
    ],
    tags: ["Royal", "Wildlife", "Heritage"],
    included: [
      "12 Nights 4-Star Stay",
      "Breakfast & Dinner Daily",
      "Private A/C vehicle",
      "Professional driver",
      "Airport transfers"
    ],
    notIncluded: ["Flights", "Visa", "Tips", "Optional activities"],
    itinerary: [
      { day: 1, title: "Arrival Delhi", description: "Arrival and hotel check-in." },
      { day: 2, title: "Delhi Tour", description: "Red Fort, Lotus Temple, and Chandni Chowk." },
      { day: 3, title: "Delhi to Agra", description: "Drive to the city of Taj." },
      { day: 4, title: "Taj Mahal to Jaipur", description: "Taj Mahal tour and drive to Jaipur." },
      { day: 5, title: "Jaipur Forts", description: "City Palace, Amer Fort, and Hawa Mahal." },
      { day: 6, title: "Jaipur Local", description: "Old walled city market tour." },
      { day: 7, title: "Jaipur to Ranthambore", description: "Drive to the tiger reserve." },
      { day: 8, title: "Ranthambore Safari", description: "Morning private vehicle tiger safari." },
      { day: 9, title: "Ranthambore to Udaipur", description: "Long drive to the city of lakes." },
      { day: 10, title: "Udaipur Tour", description: "City Palace and Lake Pichola boat ride." },
      { day: 11, title: "Kumbhalgarh Excursion", description: "Visit the massive Kumbhalgarh Fort wall." },
      { day: 12, title: "Leisure Udaipur", description: "Self-exploration and shopping." },
      { day: 13, title: "Departure", description: "Transfer to Udaipur airport." }
    ],
    gallery: []
  },
  {
    title: "Southern Essence: Backwaters, Temples & Heritage",
    location: "Kochi - Munnar - Kumarakom - Madurai - Chettinad - Pondicherry",
    country: "India",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80",
    duration: "13N 14D",
    groupSize: "Private",
    price: "From 8999 CAD",
    rating: 4.8,
    description: "Thoughtfully paced journey through the cultural and natural heart of Kerala and Tamil Nadu.",
    fullDescription: "From colonial Kochi and tea hills of Munnar to backwater cruises and sacred rituals at Madurai's Meenakshi Temple.",
    highlights: [
      "Traditional Kathakali performance",
      "Tea Museum & plantation visit",
      "Private sunset backwater cruise",
      "Meenakshi Amman Temple ceremony",
      "Chettinad grand mansions"
    ],
    tags: ["South India", "Nature", "Slow Travel"],
    included: ["13 Nights 4-Star Deluxe", "MAPAI Plan", "Private vehicle", "Local guides"],
    notIncluded: ["Flights", "Visa", "Tips"],
    itinerary: [
      { day: 1, title: "Arrival Kochi", description: "Transfer to Fort Kochi hotel." }
    ],
    gallery: []
  }
];

export default indiaSeeds;
