import { Tour } from "@/hooks/useFirestoreData";

const bhutanSeeds: Omit<Tour, "id">[] = [
  {
    title: "Royal Bhutan: Monasteries, Valleys & Himalayan Majesty",
    location: "Paro - Thimphu - Punakha - Gangtey",
    country: "Bhutan",
    image:
      "https://images.unsplash.com/photo-1622290291469-4e5e4c1e8b0e?auto=format&fit=crop&q=80",
    duration: "8N 9D",
    groupSize: "2 Pax",
    price:
      "From 4,999 CAD per person on twin sharing basis (4 Star Premium – 2 Pax)",
    rating: 4.95,
    description:
      "A deeply immersive Himalayan journey through the last great Buddhist kingdom.",
    fullDescription:
      "Royal Bhutan is a deeply immersive Himalayan journey through the last great Buddhist kingdom. Discover fortress-monasteries perched on cliffs, serene valleys dotted with prayer flags, and a culture that measures success in Gross National Happiness. From the iconic Tiger’s Nest Monastery hike in Paro to the peaceful glacial valley of Gangtey, this itinerary offers spiritual depth, pristine landscapes, and authentic cultural encounters — designed for travellers seeking tranquility, meaning, and mountain majesty. Final price depends on hotel category & group size. Accommodation: 4 Star Premium. Upgrade available to 5 Star Luxury Resorts.",
    highlights: [
      "Hike to Tiger’s Nest Monastery (Taktsang)",
      "Thimphu Buddha Dordenma panoramic views",
      "Punakha Dzong – Bhutan’s most beautiful fortress",
      "Dochula Pass with 108 stupas",
      "Gangtey Valley & Black-Necked Crane habitat",
      "Traditional farmhouse visit & local interaction",
      "Bhutanese archery experience",
      "Monastic blessing ceremony (subject to availability)",
    ],
    tags: [
      "Culture & Heritage",
      "Mountains",
      "Spirituality",
      "Scenic Landscapes",
    ],
    included: [
      "03 Nights accommodation in Paro with Breakfast & Dinner",
      "02 Nights accommodation in Thimphu with Breakfast & Dinner",
      "02 Nights accommodation in Punakha with Breakfast & Dinner",
      "02 Nights accommodation in Gangtey with Breakfast & Dinner",
      "Airport transfers by private vehicle",
      "All sightseeing by private vehicle",
      "English-speaking licensed Bhutanese guide throughout the trip",
      "Monument entrance fees as per itinerary",
      "Sustainable Development Fee (SDF) as per Bhutan regulations",
      "Applicable hotel taxes",
    ],
    notIncluded: [
      "International Flights",
      "Travel Insurance",
      "Personal expenses (laundry, drinks, phone calls, etc.)",
      "Tips & gratuities",
      "Optional activities",
      "Anything not mentioned in inclusions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival – Paro",
        description:
          "Meeting at Paro International Airport upon arrival by our representative. The flight into Paro is one of the most scenic mountain approaches in the world. Transfer to hotel. Rest of the day at leisure to acclimatize. Evening walk in Paro town. Overnight at hotel.",
      },
      {
        day: 2,
        title: "Paro",
        description:
          "Visit Ta Dzong (National Museum) and Rinpung Dzong, an impressive fortress monastery overlooking the Paro valley. Later drive to Kyichu Lhakhang, one of the oldest temples in Bhutan. Afternoon preparation briefing for Tiger’s Nest hike. Overnight at hotel.",
      },
      {
        day: 3,
        title: "Paro – Tiger’s Nest Hike",
        description:
          "Early morning hike to Taktsang Monastery (Tiger’s Nest), perched dramatically on a cliff 900 meters above the valley. This sacred site is one of the most revered monasteries in the Himalayas. Enjoy time for photography and reflection before descending. Evening at leisure. Overnight at hotel.",
      },
      {
        day: 4,
        title: "Paro – Thimphu",
        description:
          "Drive to Thimphu (1.5 hours). Visit Memorial Chorten, Buddha Dordenma statue, and Tashichho Dzong. Evening explore local handicraft markets. Overnight at hotel.",
      },
      {
        day: 5,
        title: "Thimphu",
        description:
          "Visit Folk Heritage Museum and National Textile Museum. Enjoy archery demonstration – Bhutan’s national sport. Optional farmhouse visit for cultural interaction. Overnight at hotel.",
      },
      {
        day: 6,
        title: "Thimphu – Punakha",
        description:
          "Drive via Dochula Pass (3,100 m) offering panoramic Himalayan views. Visit Punakha Dzong, located at the confluence of two rivers. Evening riverside walk. Overnight at hotel.",
      },
      {
        day: 7,
        title: "Punakha – Gangtey",
        description:
          "Drive to Gangtey Valley (approx. 3 hours). Visit Gangtey Monastery and explore Phobjikha Valley, winter home of Black-necked Cranes. Evening at leisure. Overnight at hotel.",
      },
      {
        day: 8,
        title: "Gangtey – Paro",
        description:
          "Drive back to Paro. Afternoon at leisure for shopping or optional hot stone bath. Overnight at hotel.",
      },
      {
        day: 9,
        title: "Paro – Departure",
        description:
          "Drive to Paro International Airport for onward journey. Bid farewell to Bhutan with unforgettable Himalayan memories.",
      },
    ],
    gallery: [],
  },
];

export default bhutanSeeds;
