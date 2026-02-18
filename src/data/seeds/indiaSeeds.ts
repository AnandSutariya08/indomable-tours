import { Tour } from "@/hooks/useFirestoreData";

const indiaSeeds: Omit<Tour, "id">[] = [
  // ==================== TOUR 1 ====================
  {
    title: "Ultimate Rajasthan: Taj, Wildlife & Palaces",
    location:
      "New Delhi - Agra - Jaipur - Ranthambore - Udaipur (Kumbhalgarh Excursion from Udaipur)",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1599658880436-2f9c4a3e6b9a?auto=format&fit=crop&q=80",
    duration: "12N 13D",
    groupSize: "2 Pax",
    price: "From 7999 CAD per person on twin sharing basis",
    rating: 4.85,
    description:
      "A classic North India journey blending iconic monuments, royal heritage, and thrilling wildlife.",
    fullDescription:
      "Ultimate Rajasthan: Taj, Wildlife & Palaces is a classic North India journey blending iconic monuments, royal heritage, and thrilling wildlife. From witnessing the timeless beauty of the Taj Mahal to exploring Jaipur’s grand forts and experiencing a tiger safari in Ranthambore, this itinerary captures the essence of Rajasthan in style. Conclude with the romantic lakes and palaces of Udaipur, including a UNESCO-listed excursion to Kumbhalgarh—perfectly paced for travellers seeking culture, architecture, and unforgettable moments. Pricing as per 4 Star. Upgrade available for 5 star.",
    highlights: [
      "Guided Taj Mahal Tour",
      "Guided Jungle Tiger Safari at Ranthambore National Safari (once during the trip)",
      "Guided Jaipur City Tour",
      "Guided Udaipur City Tour",
      "Guided Day Excursion to Kumbhalgarh – Second Largest Wall in the world after Great Wall of China a UNESCO world heritage site.",
      "Chokhi Dhani Village Experience: Curated Rajasthan Village Festival Experience with local meal",
    ],
    tags: ["Wildlife", "Culture & Heritage", "Architecture"],
    included: [
      "Accommodations: Starting price mentioned for 4-star deluxe property",
      "Arrival Airport Transfers from New Delhi to New Delhi Hotel",
      "Departure Airport Departure from Udaipur Hotel to Udaipur Airport",
      "Optional: Domestic flight from Udaipur to New Delhi or Mumbai",
      "Meals Plan: MAPAI (Breakfast & Dinner)",
      "All Sightseeing’s and intercity transfers by private vehicle with professional driver",
    ],
    notIncluded: [
      "International or Domestic Flights, Visa",
      "Tips or Gratuities",
      "Anything not mentioned in inclusions or day wise itinerary",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day 1: Arrival New Delhi",
        description:
          "Arrival at New Delhi Airport and check-in to the hotel. Day at leisure. Dinner at the hotel.",
      },
      {
        day: 2,
        title: "Day 2: New Delhi Sightseeing",
        description:
          "Breakfast at the hotel. Full day guided tour of New Delhi. Red fort, lotus temple, Chandani chowk. Dinner at the hotel.",
      },
      {
        day: 3,
        title: "Day 3: New Delhi to Agra",
        description:
          "Breakfast at the hotel. Depart for Agra. Check in to the Agra Hotel. Dinner at the hotel.",
      },
      {
        day: 4,
        title: "Day 4: Agra to Jaipur",
        description:
          "Breakfast at the hotel. Guided Taj Mahal Tour and local shopping experience. Depart for Jaipur. Check in to the Jaipur Hotel. Dinner at the hotel.",
      },
      {
        day: 5,
        title: "Day 5: Jaipur City Tour",
        description:
          "Breakfast at the hotel. Full day guided tour of Jaipur. City Palace, Amer Fort (Elephant Ride at Amer Fort), Hawa Mahal. Dinner at the hotel.",
      },
      {
        day: 6,
        title: "Day 6: Jaipur Local Market & Optional Tours",
        description:
          "Breakfast at the hotel. Guided local market tour (pink city – old walled city of Jaipur) of Jaipur. Optional Tours – Cooking & dining experience with a local family, Tuk-Tuk ride, Heritage horse-cart ride. Dinner at the hotel.",
      },
      {
        day: 7,
        title: "Day 7: Jaipur to Ranthambore",
        description:
          "Breakfast at the hotel. Depart for Ranthambore. Check in to the Ranthambore Hotel. Enjoy evening folk show in the evening at the hotel. Dinner at the hotel.",
      },
      {
        day: 8,
        title: "Day 8: Ranthambore Tiger Safari",
        description:
          "Early Morning Guided Jungle Tiger Safari in private vehicle. Return to the hotel for breakfast. Enjoy rest of the day at the resort. Enjoy evening folk show in the evening at the hotel. Dinner at the hotel. Optional activities: Spa at the resort, Evening Jungle Safari.",
      },
      {
        day: 9,
        title: "Day 9: Ranthambore to Udaipur",
        description:
          "Breakfast at the hotel. Depart for Udaipur. Check in to the Udaipur Hotel. Dinner at the hotel. Note: Long Drive of 8-9 Hours.",
      },
      {
        day: 10,
        title: "Day 10: Udaipur City Tour",
        description:
          'Breakfast at the hotel. Full day guided tour of Udaipur. City Palace, Jagdish Temple, Sahelion ki Bari, the "Garden of the Maidens”, boat ride on Lake Pichola. Enjoy your evening to explore on your own. Dinner at the hotel.',
      },
      {
        day: 11,
        title: "Day 11: Udaipur – Kumbhalgarh Excursion",
        description:
          "Breakfast at the hotel. Guided excursion to Kumbhalgarh a UNESCO World Heritage Site to visit the majestic fort of Kumbhalgarh and The Largest Wall after The Great Wall of China is in India which is approximately 38 Kilometers. Return to the Udaipur Hotel. Dinner at the hotel.",
      },
      {
        day: 12,
        title: "Day 12: Udaipur Leisure Day",
        description:
          "Breakfast at the hotel. Enjoy you last day at leisure. You can explore the various cafes by the lake at your own pace, shop saviours for your family or friends. Optional Tours: Traditional handicraft experience, local cooking class, miniature painting workshop. Dinner at the hotel.",
      },
      {
        day: 13,
        title: "Day 13: Departure Udaipur",
        description:
          "Breakfast at the hotel. Check out from the hotel. Airport Departure with amazing memories.",
      },
    ],
    gallery: [],
  },

  // ==================== TOUR 2 ====================
  {
    title: "Southern Essence: Backwaters, Temples & Heritage South India",
    location: "Kochi - Munnar - Kumarakom - Madurai - Chettinad - Pondicherry",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1590077428593-9f1f2f2b6e3f?auto=format&fit=crop&q=80",
    duration: "13N 14D",
    groupSize: "2 Pax",
    price: "From 8999 CAD per person on twin sharing basis",
    rating: 4.9,
    description:
      "A thoughtfully paced journey through the cultural and natural heart of Kerala and Tamil Nadu.",
    fullDescription:
      "Southern Essence: Backwaters, Temples & Heritage South India is a thoughtfully paced journey through the cultural and natural heart of Kerala and Tamil Nadu. From the colonial charm of Kochi and the misty tea hills of Munnar to serene backwater cruises in Kumarakom and sacred rituals at Madurai’s Meenakshi Temple, this itinerary blends spirituality, cuisine, and slow living. Conclude with Chettinad’s grand mansions and the Indo-French elegance of Pondicherry—perfect for travellers seeking immersive culture, scenic landscapes, and authentic South Indian experiences. Pricing as per 4 Star Deluxe. Upgrade available for 5 star.",
    highlights: [
      "Kochi colonial heritage walk",
      "Munnar tea plantation & Eravikulam National Park",
      "Private sunset backwater cruise in Kumarakom",
      "Meenakshi Temple night ceremony in Madurai",
      "Chettinad mansions & culinary experience",
      "Auroville & Pondicherry French Quarter",
    ],
    tags: [
      "Culture & Heritage",
      "Nature",
      "Backwaters",
      "Culinary",
      "Slow Travel",
    ],
    included: [
      "Arrival Airport Transfers: From Kochi Airport to Kochi Hotel",
      "Departure Airport Transfer: From Pondicherry Hotel to Chennai Airport",
      "Meals Plan: MAPAI (Breakfast & Dinner)",
      "Transportation: All intercity transfers & sightseeing by private air-conditioned vehicle",
      "Guided Sightseeing: English speaking local guides as per itinerary",
    ],
    notIncluded: [
      "International or Domestic Flights, Visa",
      "Tips or Gratuities",
      "Anything not mentioned in inclusions or day wise itinerary",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day 1: Arrival Kochi",
        description:
          "Arrival at Kochi International Airport. Meet & greet followed by transfer to hotel in Fort Kochi. Evening at leisure to explore the charming colonial streets, waterfront promenade and iconic Chinese fishing nets at sunset.",
      },
      {
        day: 2,
        title: "Day 2: Kochi Colonial Heritage",
        description:
          "Breakfast at hotel. Guided heritage walk through Fort Kochi including: St. Francis Church, Santa Cruz Basilica, Dutch Palace (Mattancherry Palace), Jewish Synagogue & Jew Town, Spice market orientation walk. Afternoon free for boutique shopping or café hopping. Evening: Attend a traditional Kathakali performance with backstage costume demonstration.",
      },
      {
        day: 3,
        title: "Day 3: Kochi to Munnar",
        description:
          "Breakfast at hotel. Scenic drive into the Western Ghats to Munnar. Enroute enjoy: Cheeyappara & Valara waterfalls (seasonal), Spice & rubber plantations views. Check-in at hill resort. Evening at leisure to enjoy cool mountain air.",
      },
      {
        day: 4,
        title: "Day 4: Munnar Tea Country",
        description:
          "Breakfast at hotel. Full day exploring Munnar including: Tea Museum & plantation visit, Eravikulam National Park (Nilgiri Tahr habitat), Mattupetty Dam & Echo Point, Scenic photo stops across tea gardens. Optional: Short guided plantation walk or sunrise viewpoint visit.",
      },
      {
        day: 5,
        title: "Day 5: Munnar to Kumarakom",
        description:
          "Breakfast at hotel. Drive to Kumarakom on the banks of Vembanad Lake. Check-in at backwater resort. Evening at leisure to relax by the lake or enjoy resort activities.",
      },
      {
        day: 6,
        title: "Day 6: Kumarakom Backwater Immersion",
        description:
          "Breakfast at hotel. Private sunset backwater cruise through narrow canals and village waterways. Experience: Coconut groves, Traditional fishing methods, Local village life. Evening at leisure. Optional Ayurvedic spa session.",
      },
      {
        day: 7,
        title: "Day 7: Kumarakom Leisure & Village Life",
        description:
          "Breakfast at hotel. Free day to enjoy: Guided village walk, Canoe ride through smaller canals, Birdwatching at Kumarakom Bird Sanctuary, Cooking demonstration (optional). Relaxed day with no scheduled rush.",
      },
      {
        day: 8,
        title: "Day 8: Kumarakom to Madurai",
        description:
          "Breakfast at hotel. Scenic drive crossing into Tamil Nadu. Check-in at hotel. Evening guided visit to Meenakshi Amman Temple to witness the spectacular night ceremony (Palliyarai ritual – subject to temple schedule).",
      },
      {
        day: 9,
        title: "Day 9: Madurai Temple City",
        description:
          "Breakfast at hotel. Guided sightseeing includes: Meenakshi Temple (detailed architectural tour), Thirumalai Nayakkar Palace, Gandhi Memorial Museum, Local flower & banana market walk. Evening free to explore street food scene.",
      },
      {
        day: 10,
        title: "Day 10: Madurai to Chettinad",
        description:
          "Breakfast at hotel. Drive to Chettinad region. Visit grand Chettinad mansions showcasing Indo-European architecture. Evening traditional Chettinad cuisine experience.",
      },
      {
        day: 11,
        title: "Day 11: Chettinad Cultural Immersion",
        description:
          "Breakfast at hotel. Explore: Local tile-making units, Handloom weaving clusters, Village temple architecture, Culinary masterclass with local family (optional). Leisure evening at heritage property.",
      },
      {
        day: 12,
        title: "Day 12: Chettinad to Pondicherry",
        description:
          "Breakfast at hotel. Drive to Pondicherry. Evening walking tour of French Quarter including: Notre Dame des Anges Church, Seaside Promenade, Colonial boulevards. Dinner at seaside café (optional).",
      },
      {
        day: 13,
        title: "Day 13: Pondicherry Indo-French Experience",
        description:
          "Breakfast at hotel. Visit Auroville (visitor areas) and Matrimandir viewing point. Explore: White Town cafés, Art galleries, Boutique handicraft stores. Optional: Cycling tour through heritage lanes.",
      },
      {
        day: 14,
        title: "Day 14: Pondicherry to Chennai - Departure",
        description:
          "Breakfast at hotel. Drive to Chennai International Airport for onward journey.",
      },
    ],
    gallery: [],
  },

  // ==================== TOUR 3 ====================
  {
    title: "Himalayan Spirit: Sacred Ganges & Mountain Serenity",
    location: "Delhi - Rishikesh - Mussoorie - Corbett - Nainital - Delhi",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1590077428593-9f1f2f2b6e3f?auto=format&fit=crop&q=80",
    duration: "12N 13D",
    groupSize: "2 Pax",
    price: "From CAD 8,750 per person on twin sharing basis",
    rating: 4.9,
    description:
      "A soul-enriching journey through India’s spiritual heartland and breathtaking Himalayan foothills.",
    fullDescription:
      "Himalayan Spirit: Sacred Ganges & Mountain Serenity is a soul-enriching journey through India’s spiritual heartland and breathtaking Himalayan foothills. From the vibrant lanes of Old Delhi to riverside rituals in Rishikesh, colonial hill charm in Mussoorie, and wildlife encounters in Corbett, this itinerary blends culture, nature, and mindfulness at an unhurried pace. Conclude by the serene lakes of Nainital before returning to Delhi—perfect for travellers seeking mountain landscapes, spiritual immersion, and authentic Himalayan experiences. Pricing as per 4 Star Deluxe. Upgrade available for 5 star.",
    highlights: [
      "Ganga Aarti in Rishikesh",
      "Beatles Ashram & Laxman Jhula",
      "Kempty Falls & Mall Road in Mussoorie",
      "Jeep Safari in Corbett National Park",
      "Boat ride on Naini Lake",
      "Snow View Point & Naina Devi Temple",
    ],
    tags: [
      "Spiritual",
      "Nature",
      "Culture",
      "Slow Travel",
      "Himalayan Landscapes",
    ],
    included: [
      "Accommodations: Starting price mentioned for 4-star deluxe property",
      "Arrival Airport Transfers: From Delhi International Airport to Delhi Hotel",
      "Departure Airport Transfer: From Delhi Hotel to Delhi International Airport",
      "Meals Plan: MAPAI (Breakfast & Dinner)",
      "Transportation: All intercity transfers & sightseeing by private air-conditioned vehicle",
      "Guided Sightseeing: English speaking local guides as per itinerary",
    ],
    notIncluded: [
      "International or Domestic Flights, Visa",
      "Tips or Gratuities",
      "Anything not mentioned in inclusions or day wise itinerary",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day 1: Arrival Delhi",
        description:
          "Arrival at Delhi International Airport. Meet & greet followed by transfer to hotel. Evening at leisure to recover from long-haul journey.",
      },
      {
        day: 2,
        title: "Day 2: Delhi Old & New Delhi",
        description:
          "Breakfast at hotel. Guided sightseeing includes: Jama Masjid, Rickshaw ride in Chandni Chowk, Raj Ghat, Humayun’s Tomb, India Gate drive past, Qutub Minar. Optional: Curated street food tasting with hygiene-focused guide.",
      },
      {
        day: 3,
        title: "Day 3: Delhi to Rishikesh",
        description:
          "Breakfast at hotel. Drive to Rishikesh, gateway to the Himalayas and the Ganges. Check-in at riverside retreat. Evening attend the Ganga Aarti ceremony at Parmarth Niketan Ashram.",
      },
      {
        day: 4,
        title: "Day 4: Rishikesh Yoga & River Life",
        description:
          "Morning optional yoga or meditation session. Explore: Ram Jhula & Laxman Jhula, Beatles Ashram, Riverside cafés, Guided Ganges walk with local storyteller. Optional: Gentle rafting experience (seasonal).",
      },
      {
        day: 5,
        title: "Day 5: Rishikesh Himalayan Village",
        description:
          "Excursion to nearby Himalayan village for: Village walk, Interaction with local families, Organic farm visit. Evening free to relax at retreat.",
      },
      {
        day: 6,
        title: "Day 6: Rishikesh to Mussoorie",
        description:
          "Drive up to Mussoorie, the “Queen of Hills.” Evening walk along Mall Road and sunset at Gun Hill viewpoint.",
      },
      {
        day: 7,
        title: "Day 7: Mussoorie Colonial Hill Charm",
        description:
          "Visit: Kempty Falls, Camel’s Back Road, Company Garden, Lal Tibba viewpoint. Afternoon at leisure for café culture and mountain views.",
      },
      {
        day: 8,
        title: "Day 8: Mussoorie to Corbett",
        description:
          "Drive to Jim Corbett National Park. Evening at leisure in wildlife lodge near forest zone.",
      },
      {
        day: 9,
        title: "Day 9: Corbett Wildlife",
        description:
          "Early morning jeep safari in Corbett National Park (subject to permit availability). Afternoon at leisure or optional second safari.",
      },
      {
        day: 10,
        title: "Day 10: Corbett to Nainital",
        description:
          "Drive to Nainital, scenic Himalayan lake town. Evening boat ride on Naini Lake.",
      },
      {
        day: 11,
        title: "Day 11: Nainital Lakes & Viewpoints",
        description:
          "Visit: Snow View Point, Tiffin Top, Naina Devi Temple, Eco Cave Gardens. Afternoon free for leisure walk along lake promenade.",
      },
      {
        day: 12,
        title: "Day 12: Nainital to Delhi",
        description:
          "Return drive to Delhi. Evening at leisure or farewell dinner experience.",
      },
      {
        day: 13,
        title: "Day 13: Departure Delhi",
        description:
          "Breakfast at hotel. Transfer to Delhi International Airport for onward journey.",
      },
    ],
    gallery: [],
  },

  // ==================== TOUR 4 ====================
  {
    title: "The Royal Tiger Trail: Central India Luxury Safari",
    location: "Delhi - Agra - Ranthambore - Bandhavgarh - Kanha - Delhi",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1590077428593-9f1f2f2b6e3f?auto=format&fit=crop&q=80",
    duration: "13N 14D",
    groupSize: "2 Pax",
    price: "From CAD 10,950 per person on twin sharing basis",
    rating: 4.95,
    description:
      "A premium wildlife expedition through India’s most celebrated tiger reserves.",
    fullDescription:
      "The Royal Tiger Trail: Central India Luxury Safari is a premium wildlife expedition through India’s most celebrated tiger reserves. Combining the timeless beauty of the Taj Mahal with immersive safaris in Ranthambore, Bandhavgarh, and Kanha, this journey offers exceptional tiger sighting opportunities alongside refined jungle lodges and expert naturalist-led experiences. Designed for wildlife enthusiasts and photographers, it delivers adventure, comfort, and the thrill of tracking the majestic Bengal tiger across diverse landscapes of Central India. Pricing as per 4 Star Deluxe Wildlife Lodges. Upgrade available to 5-star luxury jungle lodges.",
    highlights: [
      "Taj Mahal at sunset",
      "2 Jeep Safaris in Ranthambore",
      "2 Jeep Safaris in Bandhavgarh",
      "2 Jeep Safaris in Kanha",
      "Domestic flight Jaipur → Jabalpur",
      "Expert naturalist guides",
    ],
    tags: ["Wildlife", "Tigers", "Luxury", "Nature", "Photography"],
    included: [
      "Domestic Flights: 1 Domestic flight: Jaipur → Jabalpur",
      "Accommodations: Starting price mentioned for premium wildlife lodges",
      "Arrival Airport Transfers: Delhi International Airport → Delhi Hotel",
      "Departure Airport Transfer: Delhi Hotel → Delhi International Airport",
      "Meals Plan: MAPAI in cities & Full Board in wildlife lodges",
      "Safari Permits: 2 Jeep Safaris in each national park (subject to availability)",
      "Transportation: Private air-conditioned vehicle for all transfers",
      "Guided Sightseeing: Professional naturalist guides during safaris",
    ],
    notIncluded: [
      "International Flights, Visa, no domestic flight other than what is mentioned in Inclusions",
      "Tips or Gratuities",
      "Anything not mentioned in inclusions or day wise itinerary",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day 1: Arrival Delhi",
        description:
          "Arrival at Delhi International Airport. Transfer to hotel. Evening at leisure.",
      },
      {
        day: 2,
        title: "Day 2: Delhi Cultural Introduction",
        description:
          "Guided highlights tour including: Qutub Minar, Humayun’s Tomb, India Gate, Drive past Rashtrapati Bhavan, Rickshaw ride in Old Delhi. Evening safari briefing for upcoming wildlife experience.",
      },
      {
        day: 3,
        title: "Day 3: Delhi to Agra",
        description:
          "Drive to Agra. Visit Taj Mahal at sunset and Agra Fort. Overnight in Agra.",
      },
      {
        day: 4,
        title: "Day 4: Agra to Ranthambore",
        description:
          "Drive to Ranthambore National Park. Check-in at wildlife lodge. Evening at leisure.",
      },
      {
        day: 5,
        title: "Day 5: Ranthambore Tiger Safari",
        description:
          "Morning Jeep Safari in Ranthambore. Afternoon at leisure. Evening safari in different zone (subject to allocation).",
      },
      {
        day: 6,
        title: "Day 6: Ranthambore Safari & Relaxation",
        description:
          "Morning safari. Afternoon relax at lodge or visit Ranthambore Fort (optional).",
      },
      {
        day: 7,
        title: "Day 7: Ranthambore to Bandhavgarh",
        description:
          "Drive to Jaipur Airport. Domestic flight to Jabalpur. Drive to Bandhavgarh National Park. Check-in at jungle lodge.",
      },
      {
        day: 8,
        title: "Day 8: Bandhavgarh Tiger Territory",
        description:
          "Morning Jeep Safari in Bandhavgarh (high tiger density zone). Afternoon at leisure. Evening safari.",
      },
      {
        day: 9,
        title: "Day 9: Bandhavgarh Wildlife Immersion",
        description:
          "Morning safari. Afternoon nature walk & tribal village visit (outside core zone).",
      },
      {
        day: 10,
        title: "Day 10: Bandhavgarh to Kanha",
        description:
          "Drive to Kanha National Park. Check-in at lodge. Evening at leisure.",
      },
      {
        day: 11,
        title: "Day 11: Kanha Safari Experience",
        description:
          "Morning Jeep Safari. Afternoon at leisure. Evening safari in different zone.",
      },
      {
        day: 12,
        title: "Day 12: Kanha Wilderness & Photography",
        description:
          "Morning safari. Afternoon optional guided nature walk in buffer zone.",
      },
      {
        day: 13,
        title: "Day 13: Kanha to Delhi",
        description:
          "Drive to Jabalpur Airport. Flight to Delhi. Transfer to hotel.",
      },
      {
        day: 14,
        title: "Day 14: Departure Delhi",
        description:
          "Breakfast at hotel. Transfer to airport for onward journey.",
      },
    ],
    gallery: [],
  },

  // ==================== TOUR 5 ====================
  {
    title: "Regal West: Palaces, Desert & Living Heritage",
    location: "Ahmedabad - Dasada - Udaipur - Jodhpur - Jaipur - Delhi",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1590077428593-9f1f2f2b6e3f?auto=format&fit=crop&q=80",
    duration: "13N 14D",
    groupSize: "2 Pax",
    price: "From CAD 9,850 per person on twin sharing basis",
    rating: 4.9,
    description:
      "A refined journey through the royal heart of Gujarat and Rajasthan.",
    fullDescription:
      "Regal West: Palaces, Desert & Living Heritage is a refined journey through the royal heart of Gujarat and Rajasthan, where architecture, artistry, and aristocratic traditions come alive. From Ahmedabad’s intricate stepwells and textile studios to desert safaris in the Little Rann of Kutch and immersive pottery experiences in rural villages, this itinerary blends culture with meaningful local interaction. Continue through the lake palaces of Udaipur, the blue lanes of Jodhpur, and the grandeur of Jaipur—perfect for travellers seeking luxury stays, craft immersion, and authentic heritage beyond the ordinary. Pricing as per 4 Star Deluxe Heritage Hotels. Upgrade available to Palace & Luxury 5-Star properties.",
    highlights: [
      "Adalaj Stepwell & Sabarmati Ashram",
      "Little Rann of Kutch jeep safari & Wild Ass",
      "Private pottery experience with local family in Dasada",
      "Private boat ride on Lake Pichola Udaipur",
      "Mehrangarh Fort Jodhpur",
      "Amber Fort & Block Printing Workshop Jaipur",
    ],
    tags: [
      "Luxury",
      "Heritage",
      "Architecture",
      "Craft Immersion",
      "Desert Landscapes",
    ],
    included: [
      "Accommodations as mentioned",
      "Arrival & departure transfers",
      "Domestic flight (Ahmedabad → Udaipur)",
      "Private air-conditioned vehicle",
      "Expert local guides",
      "MAPAI (Breakfast & Dinner)",
    ],
    notIncluded: [
      "International Flights, Visa, no domestic flight other than what is mentioned in Inclusions",
      "Tips or Gratuities",
      "Anything not mentioned in inclusions or day wise itinerary",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day 1: Arrival Ahmedabad",
        description:
          "Arrival and private transfer to hotel. Evening guided walk through the UNESCO-listed Old City: Intricately carved wooden “Pol” houses, Hidden Jain temples, Traditional bird feeders (Chabutras), Street snacks with hygiene-curated stops. This is India through architecture, not traffic.",
      },
      {
        day: 2,
        title: "Day 2: Ahmedabad Design & Textiles",
        description:
          "Morning visit to: Sabarmati Ashram (Gandhi’s residence), Adalaj Stepwell – a 15th-century underground architectural marvel, Calico Museum (subject to availability). Afternoon: Private textile studio interaction. Meet artisans working with Bandhani (tie-dye) and handloom weaving. Guests can try basic resist-dye techniques under supervision.",
      },
      {
        day: 3,
        title: "Day 3: Ahmedabad to Dasada",
        description:
          "Drive to desert lodge (2.5–3 hrs). Evening jeep safari into the salt desert landscape: Indian Wild Ass, Desert fox, Flamingos (seasonal). Sunset here feels lunar and cinematic.",
      },
      {
        day: 4,
        title: "Day 4: Dasada Artisan Immersion",
        description:
          "Morning visit to nearby craft villages: Pottery Experience with Local Family. Not a showroom. Not staged. You enter a working home. Guests sit with a master potter and: Learn how clay is prepared, Try shaping basic forms on a manual wheel, Understand traditional kiln firing, Hear stories of generational craftsmanship. It’s tactile. It’s grounding. It’s deeply human. Also visit: Embroidery clusters (Rabari & Meghwal communities), Bandhani workshops, Traditional mud-mirror houses. Afternoon at leisure in desert lodge.",
      },
      {
        day: 5,
        title: "Day 5: Dasada to Udaipur",
        description:
          "Drive back to Ahmedabad. Flight to Udaipur. Transfer to lake-facing heritage palace hotel. Evening: Private boat ride on Lake Pichola at sunset.",
      },
      {
        day: 6,
        title: "Day 6: Udaipur Royal Grandeur",
        description:
          "Visit: City Palace (with private guide focusing on royal lineage), Jagdish Temple, Saheliyon Ki Bari. Afternoon: Miniature Painting Studio Visit. Meet master painters who create intricate Rajput-style artwork using natural pigments. Guests can attempt fine brush detailing on handmade paper.",
      },
      {
        day: 7,
        title: "Day 7: Udaipur Countryside & Culinary",
        description:
          "Excursion to: Eklingji Temple, Nagda ruins. Evening: Royal Home Dining Experience. Hosted dinner in a heritage haveli with storytelling about Mewar dynasty.",
      },
      {
        day: 8,
        title: "Day 8: Udaipur to Jodhpur",
        description:
          "Scenic drive (4.5–5 hrs). Check-in at heritage palace property. Evening rooftop dinner overlooking Mehrangarh Fort.",
      },
      {
        day: 9,
        title: "Day 9: Jodhpur Blue City",
        description:
          "Visit: Mehrangarh Fort, Jaswant Thada, Clock Tower Market. Afternoon: Stepwell & Blue Lanes Photography Walk.",
      },
      {
        day: 10,
        title: "Day 10: Jodhpur Bishnoi Village & Pottery",
        description:
          "Jeep safari into Bishnoi countryside. Here, pottery becomes deeper: Visit a rural pottery cluster, Observe hand-thrown water pots used for desert cooling, Participate and make a clay pot, Learn about desert sustainability traditions. Also experience: Hand block printing demonstration, Rural opium ceremony tradition (observational only), Wildlife spotting (blackbuck & antelope). This isn’t sightseeing. It’s cultural participation.",
      },
      {
        day: 11,
        title: "Day 11: Jodhpur to Jaipur",
        description:
          "Drive to Jaipur (5–6 hrs). Check-in at heritage palace hotel.",
      },
      {
        day: 12,
        title: "Day 12: Jaipur Royal Pink City",
        description:
          "Visit: Amber Fort, City Palace, Jantar Mantar, Hawa Mahal (photo stop). Afternoon: Private Block Printing Workshop. Guests design and print their own scarf using hand-carved wooden blocks.",
      },
      {
        day: 13,
        title: "Day 13: Jaipur to Delhi",
        description: "Drive to Delhi. Evening curated farewell dinner.",
      },
      {
        day: 14,
        title: "Day 14: Departure Delhi",
        description: "Transfer to Delhi International Airport.",
      },
    ],
    gallery: [],
  },

  // ==================== TOUR 6 ====================
  {
    title: "Eastern Himalayas: Colonial Charm, Tea Hills & Sikkim Serenity",
    location: "Kolkata - Darjeeling - Pelling - Gangtok - Kalimpong",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1622290291469-4e5e4c1e8b0e?auto=format&fit=crop&q=80",
    duration: "11N 12D",
    groupSize: "2 Pax",
    price:
      "From 4,599 CAD per person on twin sharing basis (4 Star Premium – 2 Pax)",
    rating: 4.9,
    description:
      "A refined journey through the cultural heart of Kolkata and the breathtaking mountain landscapes of Darjeeling and Sikkim.",
    fullDescription:
      "Eastern Himalayas is a refined journey through the cultural heart of Kolkata and the breathtaking mountain landscapes of Darjeeling and Sikkim. From colonial-era architecture and literary cafés in Kolkata to tea plantations in Darjeeling and peaceful Buddhist monasteries in Sikkim, this itinerary blends heritage, Himalayan scenery, and spiritual calm. Witness sunrise over Mt. Kanchenjunga, ride the iconic Darjeeling Himalayan Railway, explore ancient monasteries in Pelling and Gangtok, and enjoy panoramic mountain vistas rarely experienced by mainstream travellers — ideal for those seeking culture, serenity, and natural beauty in India’s lesser-explored east. Final price depends on hotel category & group size. Accommodation: 4 Star Premium. Upgrade available to 5 Star Boutique / Luxury Heritage & Mountain Resorts.",
    highlights: [
      "Kolkata colonial heritage walk",
      "Victoria Memorial & Howrah Bridge",
      "Darjeeling Himalayan Toy Train Ride",
      "Sunrise at Tiger Hill (Kanchenjunga views)",
      "Tea estate visit & tasting experience",
      "Pemayangtse Monastery in Pelling",
      "Kanchenjunga Falls & Skywalk experience",
      "Rumtek Monastery in Gangtok",
      "Tsomgo Lake excursion (weather permitting)",
      "Himalayan sunrise views from Kalimpong",
    ],
    tags: [
      "Culture & Heritage",
      "Mountains",
      "Tea Plantations",
      "Monasteries",
      "Scenic Landscapes",
    ],
    included: [
      "02 Nights accommodation in Kolkata with Breakfast",
      "03 Nights accommodation in Darjeeling with Breakfast",
      "02 Nights accommodation in Pelling with Breakfast & Dinner",
      "03 Nights accommodation in Gangtok with Breakfast",
      "01 Night accommodation in Kalimpong with Breakfast",
      "Airport transfers by private A/C vehicle",
      "All intercity transfers & sightseeing by private vehicle",
      "English-speaking local guides during sightseeing",
      "Entrance fees as per itinerary",
      "Toy Train Joy Ride in Darjeeling (subject to availability)",
      "Kanchenjunga viewpoint excursions",
      "Applicable hotel taxes",
    ],
    notIncluded: [
      "International & Domestic Flights",
      "Sikkim Inner Line Permit (if applicable for foreign nationals)",
      "Personal expenses (laundry, drinks, phone calls, etc.)",
      "Tips & gratuities",
      "Optional activities",
      "Anything not mentioned in inclusions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day- 01 Arrival – Kolkata",
        description:
          "Meeting at Kolkata International Airport upon arrival. Transfer to hotel. Evening at leisure to explore Park Street and colonial cafés. Overnight at hotel.",
      },
      {
        day: 2,
        title: "Day- 02 Kolkata",
        description:
          "Full day guided city tour including: Victoria Memorial, St. Paul’s Cathedral, Indian Museum, Howrah Bridge & Flower Market. Explore Kumartuli (artisan district famous for Durga idol-making). Evening heritage walk through old colonial quarters. Overnight at hotel.",
      },
      {
        day: 3,
        title: "Day- 03 Kolkata – Bagdogra – Darjeeling",
        description:
          "Flight to Bagdogra (direct flight not included). Drive to Darjeeling (approx. 3–4 hours). Evening at leisure in Mall Road area. Overnight at hotel.",
      },
      {
        day: 4,
        title: "Day- 04 Darjeeling",
        description:
          "Early morning excursion to Tiger Hill for sunrise over Mt. Kanchenjunga (weather permitting). Visit Ghoom Monastery and Batasia Loop. Later enjoy Darjeeling Himalayan Railway Toy Train Joy Ride. Afternoon visit to Himalayan Mountaineering Institute and Tea Estate. Overnight at hotel.",
      },
      {
        day: 5,
        title: "Day- 05 Darjeeling",
        description:
          "Visit Peace Pagoda and Japanese Temple. Tea plantation walk and tasting session. Afternoon free to explore local markets. Overnight at hotel.",
      },
      {
        day: 6,
        title: "Day- 06 Darjeeling – Pelling",
        description:
          "Drive to Pelling (approx. 4–5 hours). Check-in at hotel with panoramic mountain views. Evening at leisure. Overnight at hotel.",
      },
      {
        day: 7,
        title: "Day- 07 Pelling",
        description:
          "Visit Pemayangtse Monastery and Rabdentse Ruins. Explore Kanchenjunga Falls and Singshore Bridge. Skywalk experience at Chenrezig Statue. Overnight at hotel.",
      },
      {
        day: 8,
        title: "Day- 08 Pelling – Gangtok",
        description:
          "Drive to Gangtok (approx. 4–5 hours). Evening walk along MG Marg promenade. Overnight at hotel.",
      },
      {
        day: 9,
        title: "Day- 09 Gangtok",
        description:
          "Visit Rumtek Monastery and Enchey Monastery. Explore Do Drul Chorten and Namgyal Institute of Tibetology. Afternoon at leisure. Overnight at hotel.",
      },
      {
        day: 10,
        title: "Day- 10 Gangtok – Tsomgo Lake Excursion",
        description:
          "Excursion to Tsomgo Lake (subject to weather & permit). Optional Yak ride. Return to Gangtok. Overnight at hotel.",
      },
      {
        day: 11,
        title: "Day- 11 Gangtok – Kalimpong",
        description:
          "Drive to Kalimpong (approx. 3 hours). Visit Durpin Monastery and local flower nurseries. Evening at leisure with Himalayan sunset views. Overnight at hotel.",
      },
      {
        day: 12,
        title: "Day- 12 Kalimpong – Bagdogra – Departure",
        description:
          "Drive to Bagdogra Airport (approx. 2.5 hours). Departure for onward journey with unforgettable Eastern Himalayan memories.",
      },
    ],
    gallery: [],
  },

  // ==================== TOUR 7 ====================
  {
    title: "Wild North East: Assam Safaris & Meghalaya’s Living Landscapes",
    location: "Guwahati - Kaziranga - Shillong - Cherrapunji - Guwahati",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1590077428593-9f1f2f2b6e3f?auto=format&fit=crop&q=80",
    duration: "11N 12D",
    groupSize: "2 Pax",
    price:
      "From 4,799 CAD per person on twin sharing basis (4 Star Premium – 2 Pax)",
    rating: 4.85,
    description:
      "A captivating journey into India’s most pristine and culturally distinct region.",
    fullDescription:
      "Wild North East is a captivating journey into India’s most pristine and culturally distinct region. Explore Kaziranga National Park — home to the world’s largest population of the endangered one-horned rhinoceros — cruise along the mighty Brahmaputra River, and discover Meghalaya’s dramatic waterfalls, living root bridges, and mist-covered hills. This itinerary blends wildlife safaris, tribal heritage, lush landscapes, and offbeat experiences rarely found in mainstream India tours — ideal for travellers seeking authenticity, biodiversity, and breathtaking scenery. Final price depends on hotel category & group size. Accommodation: 4 Star Premium. Upgrade available to Boutique Luxury Jungle Lodges & Premium Hill Resorts.",
    highlights: [
      "Jeep Safaris in Kaziranga National Park",
      "One-Horned Rhinoceros sightings",
      "Brahmaputra River sunset cruise",
      "Kamakhya Temple visit in Guwahati",
      "Shillong hill station charm",
      "Umiam Lake panoramic views",
      "Living Root Bridge trek in Meghalaya",
      "Nohkalikai Falls (India’s tallest plunge waterfall)",
      "Mawsmai Caves exploration",
      "Cleanest village visit – Mawlynnong",
    ],
    tags: [
      "Wildlife",
      "Tribal Culture",
      "Waterfalls",
      "Scenic Landscapes",
      "Offbeat India",
    ],
    included: [
      "02 Nights accommodation in Guwahati with Breakfast",
      "03 Nights accommodation in Kaziranga with Breakfast & Dinner",
      "03 Nights accommodation in Shillong with Breakfast",
      "02 Nights accommodation in Cherrapunji with Breakfast & Dinner",
      "01 Night accommodation in Guwahati with Breakfast",
      "Airport transfers by private A/C vehicle",
      "All intercity transfers & sightseeing by private vehicle",
      "English-speaking naturalist in Kaziranga",
      "Entrance fees as per itinerary",
      "02 Jeep Safaris in Kaziranga National Park",
      "Applicable hotel taxes",
    ],
    notIncluded: [
      "International & Domestic Flights",
      "Camera fees in National Parks",
      "Personal expenses (laundry, drinks, phone calls, etc.)",
      "Tips & gratuities",
      "Optional activities",
      "Anything not mentioned in inclusions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day- 01 Arrival – Guwahati",
        description:
          "Meeting at Guwahati Airport upon arrival by our representative. Transfer to hotel. Evening at leisure or optional Brahmaputra River sunset cruise. Overnight at hotel.",
      },
      {
        day: 2,
        title: "Day- 02 Guwahati",
        description:
          "Morning visit to Kamakhya Temple, one of the most revered Shakti Peethas in India. Later visit Umananda Temple located on Peacock Island in the Brahmaputra River. Evening free to explore local markets. Overnight at hotel.",
      },
      {
        day: 3,
        title: "Day- 03 Guwahati – Kaziranga",
        description:
          "Drive to Kaziranga National Park (approx. 4–5 hours). Check-in at jungle lodge. Evening at leisure. Overnight at hotel.",
      },
      {
        day: 4,
        title: "Day- 04 Kaziranga",
        description:
          "Early morning Jeep Safari in Central Range — famous for one-horned rhinoceros and elephants. Afternoon at leisure. Evening second safari in Western Range (subject to availability). Overnight at hotel.",
      },
      {
        day: 5,
        title: "Day- 05 Kaziranga",
        description:
          "Morning safari or birdwatching session with naturalist. Afternoon visit to nearby tea gardens and interaction with local communities. Evening cultural performance showcasing Assamese folk traditions. Overnight at hotel.",
      },
      {
        day: 6,
        title: "Day- 06 Kaziranga – Shillong",
        description:
          "Drive to Shillong (approx. 4–5 hours). Enroute stop at Umiam Lake viewpoint. Evening walk along Police Bazaar and local cafés. Overnight at hotel.",
      },
      {
        day: 7,
        title: "Day- 07 Shillong",
        description:
          "Full day exploration including: Shillong Peak, Elephant Falls, Don Bosco Museum, and Ward’s Lake. Optional kayaking at Umiam Lake. Overnight at hotel.",
      },
      {
        day: 8,
        title: "Day- 08 Shillong – Cherrapunji",
        description:
          "Drive to Cherrapunji (approx. 2 hours). Visit Nohkalikai Falls and Mawsmai Caves. Evening at leisure overlooking dramatic valley views. Overnight at hotel.",
      },
      {
        day: 9,
        title: "Day- 09 Cherrapunji",
        description:
          "Excursion to Nongriat Village to experience the Living Root Bridge trek (moderate trek). Visit Mawlynnong – Asia’s cleanest village. Return to Cherrapunji. Overnight at hotel.",
      },
      {
        day: 10,
        title: "Day- 10 Cherrapunji – Guwahati",
        description:
          "Drive back to Guwahati (approx. 5 hours). Evening at leisure. Overnight at hotel.",
      },
      {
        day: 11,
        title: "Day- 11 Guwahati",
        description:
          "Free day for relaxation or optional Brahmaputra cruise experience. Overnight at hotel.",
      },
      {
        day: 12,
        title: "Day- 12 Guwahati – Departure",
        description:
          "Transfer to Guwahati Airport for onward journey. Return home with memories of India’s wild and mystical North East.",
      },
    ],
    gallery: [],
  },

  // ==================== TOUR 8 ====================
  {
    title: "Sacred Heart of India: Varanasi, Khajuraho & Orchha",
    location: "Varanasi - Khajuraho - Orchha - Jhansi",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1590077428593-9f1f2f2b6e3f?auto=format&fit=crop&q=80",
    duration: "8N 9D",
    groupSize: "2 Pax",
    price:
      "From 3,999 CAD per person on twin sharing basis (4 Star Premium – 2 Pax)",
    rating: 4.9,
    description:
      "A deeply immersive journey through India’s spiritual and artistic core.",
    fullDescription:
      "Sacred Heart of India is a deeply immersive journey through India’s spiritual and artistic core. Witness life along the sacred Ganges in Varanasi, explore the intricate UNESCO-listed temples of Khajuraho, and wander through the quiet medieval charm of Orchha — a hidden architectural gem. This itinerary offers slow travel, rich storytelling, and profound cultural encounters — ideal for travellers seeking depth, history, philosophy, and an authentic glimpse into India’s timeless traditions. Final price depends on hotel category & group size. Accommodation: 4 Star Premium. Upgrade available to 5 Star Boutique / Heritage Properties.",
    highlights: [
      "Sunrise boat ride on the River Ganges",
      "Evening Ganga Aarti ceremony on the ghats",
      "Visit to Sarnath (Buddha’s first sermon site)",
      "UNESCO Khajuraho Temple Complex",
      "Western & Eastern temple groups exploration",
      "Orchha Fort & Raja Mahal frescoes",
      "Betwa River sunset views",
      "Ram Raja Temple evening ceremony",
      "Medieval palace & cenotaph architecture",
    ],
    tags: [
      "Spirituality",
      "Culture & Heritage",
      "UNESCO Sites",
      "Temple Architecture",
    ],
    included: [
      "03 Nights accommodation in Varanasi with Breakfast",
      "02 Nights accommodation in Khajuraho with Breakfast",
      "02 Nights accommodation in Orchha with Breakfast",
      "01 Night accommodation in Jhansi with Breakfast",
      "Airport transfers by private A/C vehicle",
      "All intercity transfers & sightseeing by private vehicle",
      "English-speaking local guides during sightseeing",
      "Entrance fees as per itinerary",
      "Morning boat ride on the Ganges in Varanasi",
      "Evening Ganga Aarti ceremony experience",
      "Applicable hotel taxes",
    ],
    notIncluded: [
      "International & Domestic Flights",
      "Camera fees at monuments",
      "Personal expenses (laundry, drinks, phone calls, etc.)",
      "Tips & gratuities",
      "Optional activities",
      "Anything not mentioned in inclusions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day- 01 Arrival – Varanasi",
        description:
          "Meeting at Varanasi Airport upon arrival by our representative. Transfer to hotel. Evening visit to Dashashwamedh Ghat to witness the spectacular Ganga Aarti ceremony — a ritual of fire, chants, and devotion performed on the riverbanks. Overnight at hotel.",
      },
      {
        day: 2,
        title: "Day- 02 Varanasi",
        description:
          "Early morning boat ride on the River Ganges at sunrise. Observe life unfolding along the ghats — pilgrims bathing, priests performing rituals, and ancient temples lining the river. Later guided walking tour through the narrow lanes of old Varanasi, visiting Kashi Vishwanath Temple (outer area), local markets, and traditional silk weaving workshops. Afternoon excursion to Sarnath, where Lord Buddha delivered his first sermon. Overnight at hotel.",
      },
      {
        day: 3,
        title: "Day- 03 Varanasi",
        description:
          "Morning at leisure or optional yoga session by the Ganges. Visit Bharat Mata Temple and explore Banaras Hindu University campus. Evening free to explore local cafés and riverside ghats. Overnight at hotel.",
      },
      {
        day: 4,
        title: "Day- 04 Varanasi – Khajuraho",
        description:
          "Transfer to airport for flight to Khajuraho (or surface transfer if preferred). Upon arrival, check-in at hotel. Evening at leisure. Overnight at hotel.",
      },
      {
        day: 5,
        title: "Day- 05 Khajuraho",
        description:
          "Full day guided exploration of the UNESCO-listed Khajuraho Temple Complex, renowned for its extraordinary sandstone carvings and architectural precision. Visit Western Group of Temples including Kandariya Mahadeva Temple. Explore Eastern & Jain temples showcasing diverse artistic traditions. Optional Sound & Light Show in the evening. Overnight at hotel.",
      },
      {
        day: 6,
        title: "Day- 06 Khajuraho – Orchha",
        description:
          "Drive to Orchha (approx. 4–5 hours). Check-in at heritage hotel overlooking Betwa River. Evening walk along riverbanks and cenotaphs at sunset. Overnight at hotel.",
      },
      {
        day: 7,
        title: "Day- 07 Orchha",
        description:
          "Guided exploration of Orchha Fort Complex including Jahangir Mahal, Raja Mahal, and Lakshmi Narayan Temple with frescoes. Visit Ram Raja Temple, the only temple in India where Lord Ram is worshipped as a king. Evening at leisure. Overnight at hotel.",
      },
      {
        day: 8,
        title: "Day- 08 Orchha – Jhansi",
        description:
          "Short drive to Jhansi (approx. 30 minutes). Visit Jhansi Fort associated with Rani Lakshmibai and India’s independence movement. Afternoon at leisure. Overnight at hotel.",
      },
      {
        day: 9,
        title: "Day- 09 Jhansi – Departure",
        description:
          "Transfer to Jhansi Railway Station or nearby airport for onward journey. Return with memories of India’s sacred, artistic, and timeless heartland.",
      },
    ],
    gallery: [],
  },

  // ==================== TOUR 9 ====================
  {
    title: "Sacred Odisha: Temples, Tribes & Timeless Traditions",
    location:
      "Bhubaneswar - Puri - Gopalpur - Rayagada - Jeypore - Bhubaneswar",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1590077428593-9f1f2f2b6e3f?auto=format&fit=crop&q=80",
    duration: "10N 11D",
    groupSize: "2 Pax",
    price:
      "From 4,299 CAD per person on twin sharing basis (4 Star Premium – 2 Pax)",
    rating: 4.85,
    description:
      "A profound cultural journey through one of India’s most spiritually and artistically rich states.",
    fullDescription:
      "Sacred Odisha is a profound cultural journey through one of India’s most spiritually and artistically rich states. Explore ancient temple architecture in Bhubaneswar and the UNESCO-listed Sun Temple of Konark, witness rituals at the sacred Jagannath Temple in Puri, and venture into remote tribal heartlands where centuries-old traditions are still preserved. This itinerary blends sacred heritage, rural authenticity, indigenous culture, and coastal landscapes — ideal for travellers seeking meaningful cultural immersion far from mainstream tourist circuits. Final price depends on hotel category & group size. Accommodation: 4 Star Premium. Upgrade available to Boutique Heritage & Luxury Eco Lodges (where available).",
    highlights: [
      "Lingaraj Temple & Mukteshwar Temple (Bhubaneswar)",
      "UNESCO Sun Temple at Konark",
      "Jagannath Temple rituals in Puri",
      "Raghurajpur artisan village (Pattachitra paintings)",
      "Tribal market visit (Rayagada/Jeypore region)",
      "Interaction with Dongria Kondh / Desia tribes",
      "Scenic Eastern Ghats landscapes",
      "Ramchandi Beach coastal experience",
    ],
    tags: [
      "Temple Architecture",
      "Tribal Culture",
      "UNESCO Sites",
      "Spirituality",
      "Heritage",
    ],
    included: [
      "02 Nights accommodation in Bhubaneswar with Breakfast",
      "02 Nights accommodation in Puri with Breakfast",
      "01 Night accommodation in Gopalpur with Breakfast",
      "02 Nights accommodation in Rayagada with Breakfast & Dinner",
      "02 Nights accommodation in Jeypore with Breakfast & Dinner",
      "01 Night accommodation in Bhubaneswar with Breakfast",
      "Airport transfers by private A/C vehicle",
      "All intercity transfers & sightseeing by private vehicle",
      "English-speaking guide during temple & heritage visits",
      "Local tribal guide during tribal village visits",
      "Entrance fees as per itinerary",
      "Applicable hotel taxes",
    ],
    notIncluded: [
      "International & Domestic Flights",
      "Special temple darshan tickets (if applicable)",
      "Camera fees",
      "Personal expenses (laundry, drinks, phone calls, etc.)",
      "Tips & gratuities",
      "Optional activities",
      "Anything not mentioned in inclusions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day- 01 Arrival – Bhubaneswar",
        description:
          "Meeting at Bhubaneswar Airport upon arrival by our representative. Transfer to hotel. Evening visit to Mukteshwar Temple and Rajarani Temple — excellent introduction to Odisha’s temple architecture. Overnight at hotel.",
      },
      {
        day: 2,
        title: "Day- 02 Bhubaneswar",
        description:
          "Visit Lingaraj Temple (outer complex for non-Hindus), one of the most important Shaivite temples in India. Explore Udayagiri & Khandagiri Caves — ancient Jain rock-cut caves. Afternoon at leisure or optional Odissi dance performance. Overnight at hotel.",
      },
      {
        day: 3,
        title: "Day- 03 Bhubaneswar – Konark – Puri",
        description:
          "Drive to Konark (approx. 1.5 hours). Visit the UNESCO-listed Sun Temple, designed as a colossal stone chariot. Continue to Puri. Evening walk along the beach. Overnight at hotel.",
      },
      {
        day: 4,
        title: "Day- 04 Puri",
        description:
          "Morning visit to Jagannath Temple (non-Hindus may explore outer complex and rituals). Later visit Raghurajpur artisan village, famous for Pattachitra paintings and traditional crafts. Optional Chilika Lake excursion for dolphin spotting. Overnight at hotel.",
      },
      {
        day: 5,
        title: "Day- 05 Puri – Gopalpur",
        description:
          "Drive to Gopalpur (approx. 3–4 hours). Relax at coastal resort overlooking the Bay of Bengal. Overnight at hotel.",
      },
      {
        day: 6,
        title: "Day- 06 Gopalpur – Rayagada",
        description:
          "Drive to Rayagada (approx. 5–6 hours) through scenic Eastern Ghats. Evening at leisure. Overnight at hotel.",
      },
      {
        day: 7,
        title: "Day- 07 Rayagada – Tribal Experience",
        description:
          "Visit weekly tribal market (based on local schedule). Interaction with local tribes such as Dongria Kondh (conducted respectfully and guided). Return to hotel. Overnight at hotel.",
      },
      {
        day: 8,
        title: "Day- 08 Rayagada – Jeypore",
        description:
          "Drive to Jeypore (approx. 4 hours). Visit nearby tribal villages and rural communities. Overnight at hotel.",
      },
      {
        day: 9,
        title: "Day- 09 Jeypore",
        description:
          "Visit Gupteswar Cave Temple and scenic tribal villages. Experience local market interactions and cultural insights. Overnight at hotel.",
      },
      {
        day: 10,
        title: "Day- 10 Jeypore – Bhubaneswar",
        description:
          "Drive back to Bhubaneswar (approx. 6–7 hours). Evening at leisure. Overnight at hotel.",
      },
      {
        day: 11,
        title: "Day- 11 Bhubaneswar – Departure",
        description:
          "Transfer to Bhubaneswar Airport for onward journey. Return home with a deeper understanding of India’s sacred and indigenous heritage.",
      },
    ],
    gallery: [],
  },

  // ==================== TOUR 10 ====================
  {
    title: "Andaman Escape: Turquoise Waters & Island Luxury",
    location: "Port Blair - Havelock Island - Neil Island - Port Blair",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1587502537745-84b86da1204f?auto=format&fit=crop&q=80",
    duration: "8N 9D",
    groupSize: "2 Pax",
    price:
      "From 4,899 CAD per person on twin sharing basis (4 Star Premium – 2 Pax)",
    rating: 4.9,
    description:
      "A refined island journey through India’s most pristine tropical archipelago.",
    fullDescription:
      "Andaman Escape is a refined island journey through India’s most pristine tropical archipelago. With crystal-clear waters, white sand beaches, coral reefs, and emerald forests, this itinerary blends relaxation, marine adventure, and understated luxury. From sunset at Asia’s best-rated Radhanagar Beach to snorkeling in vibrant coral ecosystems and unwinding in boutique beachfront resorts, this experience is designed for travellers seeking exclusivity, tranquility, and Indian Ocean beauty — without leaving India. Final price depends on hotel category & group size. Accommodation: 4 Star Premium Beach Resorts. Upgrade available to 5 Star Luxury Beachfront Villas.",
    highlights: [
      "Radhanagar Beach sunset (Havelock)",
      "Snorkeling at Elephant Beach",
      "Private ferry transfers between islands",
      "Cellular Jail Light & Sound Show (historic storytelling)",
      "Natural coral reefs & turquoise lagoons",
      "Neil Island natural rock formations",
      "Bharatpur & Laxmanpur Beach exploration",
      "Slow island life & boutique luxury stays",
    ],
    tags: ["Beaches", "Islands", "Marine Life", "Luxury", "Slow Travel"],
    included: [
      "02 Nights accommodation in Port Blair with Breakfast",
      "03 Nights accommodation in Havelock Island with Breakfast",
      "02 Nights accommodation in Neil Island with Breakfast",
      "01 Night accommodation in Port Blair with Breakfast",
      "Airport transfers by private A/C vehicle",
      "All inter-island transfers by private / premium ferry",
      "All sightseeing & beach transfers by private vehicle",
      "English-speaking representative assistance",
      "Cellular Jail Light & Sound Show",
      "Snorkeling experience at Elephant Beach (Havelock)",
      "Applicable hotel taxes",
    ],
    notIncluded: [
      "International & Domestic Flights",
      "Water sports not mentioned in inclusions",
      "Personal expenses (laundry, drinks, phone calls, etc.)",
      "Tips & gratuities",
      "Optional activities",
      "Anything not mentioned in inclusions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day- 01 Arrival – Port Blair",
        description:
          "Meeting at Veer Savarkar International Airport upon arrival. Transfer to hotel. Afternoon visit to Cellular Jail followed by the Light & Sound Show narrating the island’s colonial history. Overnight at hotel.",
      },
      {
        day: 2,
        title: "Day- 02 Port Blair",
        description:
          "Visit Corbyn’s Cove Beach for relaxation. Optional excursion to Ross Island (Netaji Subhash Chandra Bose Island) to explore colonial ruins surrounded by lush greenery. Evening at leisure. Overnight at hotel.",
      },
      {
        day: 3,
        title: "Day- 03 Port Blair – Havelock Island",
        description:
          "Transfer by premium ferry to Havelock Island (approx. 1.5–2.5 hours). Check-in at beachfront resort. Evening visit to Radhanagar Beach for spectacular sunset. Overnight at hotel.",
      },
      {
        day: 4,
        title: "Day- 04 Havelock Island",
        description:
          "Morning excursion to Elephant Beach for snorkeling experience in coral reefs. Afternoon at leisure to relax at resort. Optional scuba diving experience. Overnight at hotel.",
      },
      {
        day: 5,
        title: "Day- 05 Havelock Island",
        description:
          "Free day to enjoy pristine beaches, spa experiences, or optional kayaking through mangroves. Evening private beach dining (optional). Overnight at hotel.",
      },
      {
        day: 6,
        title: "Day- 06 Havelock – Neil Island",
        description:
          "Transfer by ferry to Neil Island. Visit Bharatpur Beach and Laxmanpur Beach. Evening sunset at Natural Rock Formation (Howrah Bridge). Overnight at hotel.",
      },
      {
        day: 7,
        title: "Day- 07 Neil Island",
        description:
          "Leisure day to relax on serene beaches. Optional glass-bottom boat ride or cycling around the island. Overnight at hotel.",
      },
      {
        day: 8,
        title: "Day- 08 Neil Island – Port Blair",
        description:
          "Transfer by ferry back to Port Blair. Evening at leisure for shopping or seaside dining. Overnight at hotel.",
      },
      {
        day: 9,
        title: "Day- 09 Port Blair – Departure",
        description:
          "Transfer to Port Blair Airport for onward journey. Return home with memories of turquoise waters and island serenity.",
      },
    ],
    gallery: [],
  },

  // ==================== TOUR 11 ====================
  {
    title: "Luxury Ladakh: Monasteries, High Passes & Himalayan Majesty",
    location: "Leh - Nubra Valley - Pangong Lake - Leh",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1622290291469-4e5e4c1e8b0e?auto=format&fit=crop&q=80",
    duration: "9N 10D",
    groupSize: "2 Pax",
    price:
      "From 5,999 CAD per person on twin sharing basis (4 Star Premium – 2 Pax)",
    rating: 4.95,
    description:
      "An extraordinary high-altitude journey through one of the world’s most dramatic mountain regions.",
    fullDescription:
      "Luxury Ladakh is an extraordinary high-altitude journey through one of the world’s most dramatic mountain regions. Set at over 11,000 feet above sea level, Ladakh blends Tibetan Buddhist culture, stark desert landscapes, turquoise alpine lakes, and ancient monasteries in a way few destinations can. This itinerary is thoughtfully paced for proper acclimatization while offering immersive experiences — from crossing Khardung La (one of the world’s highest motorable passes) to staying in luxury lakeside camps at Pangong. Ideal for travellers seeking serenity, adventure, and unmatched Himalayan grandeur. Final price depends on hotel category & group size. Accommodation: 4 Star Premium Boutique Mountain Hotels & Luxury Camps. Upgrade available to 5 Star Luxury Himalayan Retreats (seasonal).",
    highlights: [
      "Scenic flight into Leh (aerial Himalayan views)",
      "Hemis & Thiksey Monastery visits",
      "Sham Valley “Apricot Route”",
      "Khardung La Pass crossing",
      "Nubra Valley sand dunes & double-humped camels",
      "Pangong Lake luxury camp stay",
      "Sunrise & sunset photography at Pangong",
      "Leh Palace & Shanti Stupa panoramic views",
      "Traditional Ladakhi home visit",
    ],
    tags: [
      "Himalayas",
      "Luxury",
      "Monasteries",
      "Scenic Landscapes",
      "Adventure",
    ],
    included: [
      "03 Nights accommodation in Leh with Breakfast & Dinner",
      "02 Nights accommodation in Nubra Valley with Breakfast & Dinner",
      "02 Nights accommodation in Pangong Lake Luxury Camp with Breakfast & Dinner",
      "02 Nights accommodation in Leh with Breakfast & Dinner",
      "Airport transfers by private vehicle",
      "All intercity transfers & sightseeing by private SUV (Innova/Xylo/4x4)",
      "Inner Line Permits for Nubra & Pangong",
      "English-speaking local guide during sightseeing",
      "Entrance fees as per itinerary",
      "Applicable hotel taxes",
    ],
    notIncluded: [
      "International & Domestic Flights",
      "Travel Insurance (mandatory for high altitude travel)",
      "Camera fees at monasteries",
      "Personal expenses (laundry, drinks, phone calls, etc.)",
      "Tips & gratuities",
      "Optional activities",
      "Anything not mentioned in inclusions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day- 01 Arrival – Leh",
        description:
          "Meeting at Leh Airport upon arrival by our representative. Transfer to hotel. Complete rest for acclimatization due to high altitude (11,500 ft). Light evening walk in Leh market if comfortable. Overnight at hotel.",
      },
      {
        day: 2,
        title: "Day- 02 Leh (Acclimatization & Monasteries)",
        description:
          "Morning visit to Shanti Stupa for panoramic views over Leh. Later visit Leh Palace and Hall of Fame Museum. Afternoon excursion to Thiksey Monastery and Shey Palace. Evening at leisure. Overnight at hotel.",
      },
      {
        day: 3,
        title: "Day- 03 Leh – Sham Valley Excursion",
        description:
          "Drive along Indus River visiting: Magnetic Hill, Gurudwara Pathar Sahib, Sangam (confluence of Indus & Zanskar rivers). Optional short rafting experience (seasonal). Return to Leh. Overnight at hotel.",
      },
      {
        day: 4,
        title: "Day- 04 Leh – Nubra Valley",
        description:
          "Drive to Nubra Valley via Khardung La Pass (18,380 ft). Check-in at luxury camp/resort. Evening at leisure. Overnight at hotel.",
      },
      {
        day: 5,
        title: "Day- 05 Nubra Valley",
        description:
          "Visit Diskit Monastery with giant Maitreya Buddha statue. Explore Hunder sand dunes and optional double-humped Bactrian camel ride. Afternoon at leisure to relax amidst mountain scenery. Overnight at hotel.",
      },
      {
        day: 6,
        title: "Day- 06 Nubra – Pangong Lake",
        description:
          "Drive to Pangong Lake via scenic mountain roads (approx. 5–6 hours). Check-in at luxury lakeside camp. Evening enjoy changing shades of the lake at sunset. Overnight at camp.",
      },
      {
        day: 7,
        title: "Day- 07 Pangong Lake",
        description:
          "Morning sunrise photography at Pangong Lake. Leisure day to relax and explore surrounding landscape. Optional stargazing experience at night. Overnight at camp.",
      },
      {
        day: 8,
        title: "Day- 08 Pangong – Leh",
        description:
          "Drive back to Leh via Chang La Pass (approx. 5–6 hours). Evening at leisure. Overnight at hotel.",
      },
      {
        day: 9,
        title: "Day- 09 Leh",
        description:
          "Free day for optional experiences such as monastery meditation, spa, or local market exploration. Farewell dinner at local restaurant. Overnight at hotel.",
      },
      {
        day: 10,
        title: "Day- 10 Leh – Departure",
        description:
          "Transfer to Leh Airport for onward journey. Return home with memories of towering peaks, silent monasteries, and Himalayan serenity.",
      },
    ],
    gallery: [],
  },

  // ==================== TOUR 12 ====================
  {
    title: "Kashmir Luxury Escape: Lakes, Meadows & Himalayan Romance",
    location: "Srinagar - Gulmarg - Pahalgam - Srinagar",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1590077428593-9f1f2f2b6e3f?auto=format&fit=crop&q=80",
    duration: "9N 10D",
    groupSize: "2 Pax",
    price:
      "From 4,899 CAD per person on twin sharing basis (4 Star Premium – 2 Pax)",
    rating: 4.95,
    description:
      "A serene Himalayan retreat through India’s most romantic landscape.",
    fullDescription:
      "Kashmir Luxury Escape is a serene Himalayan retreat through India’s most romantic landscape. From gliding across Dal Lake in a traditional Shikara to strolling through Mughal gardens and experiencing alpine meadows in Gulmarg and Pahalgam, this itinerary blends natural beauty with refined comfort. Designed for slow travel and immersive mountain experiences, the journey offers luxury stays, scenic drives through pine forests, and peaceful moments surrounded by snow-capped peaks — perfect for couples, families, and travellers seeking tranquility in the Himalayas. Final price depends on hotel category & group size. Accommodation: 4 Star Premium Deluxe Hotels & Luxury Houseboat. Upgrade available to 5 Star Luxury Resorts & Private Houseboat Suites.",
    highlights: [
      "Stay in a luxury houseboat on Dal Lake",
      "Shikara ride through floating gardens",
      "Mughal Gardens – Shalimar & Nishat Bagh",
      "Gondola ride in Gulmarg (one of the highest cable cars in the world)",
      "Meadow walks in Gulmarg",
      "Betaab Valley in Pahalgam",
      "Saffron fields visit (seasonal)",
      "Kashmiri Wazwan dinner experience",
      "Sunset views over Zabarwan Mountains",
    ],
    tags: ["Himalayas", "Luxury", "Scenic Landscapes", "Culture & Heritage"],
    included: [
      "03 Nights accommodation in Srinagar (Hotel) with Breakfast & Dinner",
      "01 Night accommodation in Srinagar (Luxury Houseboat) with Breakfast & Dinner",
      "02 Nights accommodation in Gulmarg with Breakfast & Dinner",
      "02 Nights accommodation in Pahalgam with Breakfast & Dinner",
      "01 Night accommodation in Srinagar (Hotel) with Breakfast & Dinner",
      "Airport transfers by private vehicle",
      "All intercity transfers & sightseeing by private vehicle",
      "Shikara ride on Dal Lake",
      "Gondola ride Phase 1 in Gulmarg",
      "English-speaking local guide during sightseeing",
      "Applicable hotel taxes",
    ],
    notIncluded: [
      "International & Domestic Flights",
      "Pony rides in Gulmarg/Pahalgam",
      "Gondola Phase 2 tickets (if applicable)",
      "Personal expenses (laundry, drinks, phone calls, etc.)",
      "Tips & gratuities",
      "Optional activities",
      "Anything not mentioned in inclusions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day- 01 Arrival – Srinagar",
        description:
          "Meeting at Srinagar Airport upon arrival. Transfer to hotel. Evening at leisure overlooking Dal Lake. Overnight at hotel.",
      },
      {
        day: 2,
        title: "Day- 02 Srinagar",
        description:
          "Visit Mughal Gardens including Shalimar Bagh and Nishat Bagh. Explore Shankaracharya Temple for panoramic views. Afternoon Shikara ride on Dal Lake through floating vegetable markets and lotus gardens. Overnight at hotel.",
      },
      {
        day: 3,
        title: "Day- 03 Srinagar – Gulmarg",
        description:
          "Drive to Gulmarg (approx. 2 hours). Check-in at mountain resort. Gondola ride Phase 1 offering panoramic Himalayan views. Overnight at hotel.",
      },
      {
        day: 4,
        title: "Day- 04 Gulmarg",
        description:
          "Day at leisure for meadow walks or optional Gondola Phase 2 ride. Winter: snow activities such as skiing and snowboarding (seasonal). Overnight at hotel.",
      },
      {
        day: 5,
        title: "Day- 05 Gulmarg – Pahalgam",
        description:
          "Drive to Pahalgam (approx. 4–5 hours). Enroute visit saffron fields (seasonal). Check-in at resort overlooking Lidder River. Overnight at hotel.",
      },
      {
        day: 6,
        title: "Day- 06 Pahalgam",
        description:
          "Visit Betaab Valley and Aru Valley. Optional short river walk or pony ride experience. Evening at leisure. Overnight at hotel.",
      },
      {
        day: 7,
        title: "Day- 07 Pahalgam – Srinagar (Houseboat Stay)",
        description:
          "Drive back to Srinagar. Check-in at luxury houseboat on Dal Lake. Evening leisure on deck with mountain sunset views. Overnight on houseboat.",
      },
      {
        day: 8,
        title: "Day- 08 Srinagar",
        description:
          "Explore old Srinagar including Jamia Masjid and local handicraft markets. Optional private Wazwan dining experience. Overnight at hotel.",
      },
      {
        day: 9,
        title: "Day- 09 Srinagar",
        description:
          "Free day for relaxation, spa, or optional countryside excursion to Sonamarg (seasonal). Farewell dinner. Overnight at hotel.",
      },
      {
        day: 10,
        title: "Day- 10 Srinagar – Departure",
        description:
          "Transfer to Srinagar Airport for onward journey. Return home with memories of serene lakes, alpine valleys, and Himalayan elegance.",
      },
    ],
    gallery: [],
  },
];

export default indiaSeeds;
