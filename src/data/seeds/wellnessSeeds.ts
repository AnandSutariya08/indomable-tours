import { Tour } from "@/hooks/useFirestoreData";

const wellnessSeeds: Omit<Tour, "id">[] = [
  {
    title: "Art of Detox Programme",
    location: "Maharashtra, India",
    country: "India",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80",
    duration: "7N 8D",
    groupSize: "Wellness",
    price: "From 7999 USD",
    rating: 5.0,
    description: "Medically guided cleansing journey integrating Ayurveda, naturopathy, and mindful movement.",
    fullDescription: "Designed to reset digestion, circulation, and metabolic balance within a luxury wellness sanctuary.",
    highlights: [
      "Comprehensive Doctor Consultation",
      "Integrated Ayurveda & Naturopathy",
      "Daily Yoga & Pranayama",
      "Gut health & metabolic reset",
      "Personalised post-detox diet"
    ],
    tags: ["Wellness", "Detox", "Luxury"],
    included: [
      "7 Nights Luxury Resort",
      "All Wellness Meals",
      "Doctor consultations",
      "Daily therapies",
      "Airport transfers"
    ],
    notIncluded: ["Flights", "Visa", "Tips"],
    itinerary: [
      { day: 1, title: "Arrival & Consultation", description: "Assessment and plan creation." },
      { day: 8, title: "Departure", description: "Final consultation and check-out." }
    ],
    gallery: []
  },
  {
    title: "7-Night Yoga & Ayurveda Retreat in Rishikesh",
    location: "Rishikesh, Uttarakhand, India",
    country: "India",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80",
    duration: "7N 8D",
    groupSize: "Wellness",
    price: "From 2450 USD",
    rating: 4.9,
    description: "Physical healing and spiritual awakening along the sacred Ganges.",
    fullDescription: "Daily yoga, personalized Ayurvedic therapies, and participation in the sacred Ganga Aarti ceremony.",
    highlights: [
      "Daily Yoga & Meditation",
      "Sattvic Meals",
      "Ganga Aarti participation",
      "Himalayan environment",
      "Ayurvedic Cooking demonstration"
    ],
    tags: ["Yoga", "Spirituality", "Ayurveda"],
    included: ["7 Nights Deluxe Resort", "Sattvic Meals", "Doctor consultations", "Airport transfers"],
    notIncluded: ["Flights", "Visa"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Welcome drink and consultation." }
    ],
    gallery: []
  }
];

export default wellnessSeeds;
