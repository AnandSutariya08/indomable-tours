import { Tour } from "@/hooks/useFirestoreData";

const srilankaSeeds: Omit<Tour, "id">[] = [
  {
    title: "Sri Lanka Signature: Heritage, Tea Hills & Coastal Luxury",
    location: "Colombo - Sigiriya - Kandy - Nuwara Eliya - Yala - Galle",
    country: "Sri Lanka",
    image: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&q=80",
    duration: "11N 12D",
    groupSize: "2 Pax",
    price: "From 4799 CAD",
    rating: 4.9,
    description: "Curated luxury journey through ancient rock fortresses, tea estates, and golden beaches.",
    fullDescription: "Climb Sigiriya, enjoy a scenic train ride, track leopards in Yala, and unwind in colonial Galle Fort.",
    highlights: [
      "Sigiriya Rock Fortress sunrise climb",
      "Temple of the Sacred Tooth Relic",
      "Scenic train journey through tea country",
      "Yala National Park Leopard Safari",
      "Dutch Fort Galle heritage walk"
    ],
    tags: ["Luxury", "Wildlife", "Beaches"],
    included: [
      "11 Nights Premium Stay",
      "Breakfast Daily",
      "Private A/C vehicle",
      "English-speaking chauffeur guide",
      "Scenic train ride tickets"
    ],
    notIncluded: ["International Flights", "Visa", "Personal expenses", "Tips"],
    itinerary: [
      { day: 1, title: "Arrival Colombo", description: "Arrival and city orientation." },
      { day: 2, title: "Colombo to Sigiriya", description: "Drive to Sigiriya via Matale Spice Garden." },
      { day: 3, title: "Sigiriya Rock & Dambulla", description: "Climb Sigiriya Rock and visit Dambulla Cave Temple." },
      { day: 4, title: "Sigiriya to Kandy", description: "Drive to Kandy, visit Tooth Relic Temple and cultural show." },
      { day: 5, title: "Kandy Exploration", description: "Visit Botanical Gardens and Kandy town." },
      { day: 6, title: "Train to Nuwara Eliya", description: "Scenic train ride and tea factory visit." },
      { day: 7, title: "Nuwara Eliya", description: "Explore 'Little England' and Gregory Lake." },
      { day: 8, title: "Nuwara Eliya to Yala", description: "Drive to Yala wildlife region." },
      { day: 9, title: "Yala Safari", description: "Early morning Jeep Safari in leopard territory." },
      { day: 10, title: "Yala to Galle", description: "Drive to the coastal town of Galle." },
      { day: 11, title: "Galle Fort", description: "Walking tour of UNESCO Dutch Fort." },
      { day: 12, title: "Departure", description: "Transfer to airport." }
    ],
    gallery: []
  }
];

export default srilankaSeeds;
