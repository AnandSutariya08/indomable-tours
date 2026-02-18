import { Tour } from "@/hooks/useFirestoreData";

const nepalSeeds: Omit<Tour, "id">[] = [
  {
    title: "Magical Nepal: Culture, Wildlife & Himalayan Views",
    location: "Kathmandu - Chitwan - Pokhara - Nagarkot",
    country: "Nepal",
    image:
      "https://images.unsplash.com/photo-1544806318-77717478637c?auto=format&fit=crop&q=80",
    duration: "8N 9D",
    groupSize: "2 Pax",
    price:
      "From 1899 CAD per person on twin sharing basis (4 Star Premium – 2 Pax)",
    rating: 4.8,
    description:
      "A balanced journey through spiritual heart, wildlife jungles, and Himalayan landscapes.",
    fullDescription:
      "Magical Nepal is a beautifully balanced journey through Nepal’s spiritual heart, wildlife-rich jungles, and breathtaking Himalayan landscapes. Explore sacred Hindu and Buddhist shrines in Kathmandu, witness sunrise over the Annapurna range in Pokhara, experience thrilling jungle safaris in Chitwan National Park, and end your journey with panoramic Himalayan views from Nagarkot — including glimpses of Mt. Everest on clear days. This itinerary blends culture, nature, adventure, and scenic beauty — ideal for travellers seeking an immersive Himalayan experience in under 10 days. Final price depends on hotel category & group size. Accommodation: 4 Star Premium. Upgrade available to 5 Star Standard / Premium / Luxury.",
    highlights: [
      "Guided visit to Pashupatinath & interaction with Sadhus",
      "Bouddhanath Stupa & Lama interaction",
      "Bhaktapur & Patan Durbar Squares",
      "Swayambhunath (Monkey Temple) panoramic views",
      "Chitwan National Park Jeep Safari",
      "Canoeing & Jungle Walk experience",
      "Sunrise excursion to Sarangkot",
      "Annapurna & Dhaulagiri Himalayan views",
      "Boating at Fewa Lake (Optional)",
      "Sunrise & Himalayan panorama from Nagarkot",
    ],
    tags: ["Culture & Heritage", "Wildlife", "Mountains", "Scenic Landscapes"],
    included: [
      "03 Nights accommodation in Kathmandu with Breakfast",
      "02 Nights accommodation in Chitwan with Breakfast, Lunch & Dinner",
      "02 Nights accommodation in Pokhara with Breakfast",
      "01 Night accommodation in Nagarkot with Breakfast",
      "Airport transfers by A/C vehicle",
      "All sightseeing in Kathmandu & Pokhara by private A/C vehicle",
      "English-speaking guide during sightseeing as per itinerary",
      "Entrance fees as per itinerary",
      "Jungle activities in Chitwan National Park (SIC basis)",
      "01 Jeep Safari",
      "01 Boat Safari",
      "Transportation: Kathmandu – Chitwan – Pokhara – Nagarkot – Kathmandu",
      "Applicable hotel taxes",
    ],
    notIncluded: [
      "International Flights",
      "Nepal Visa Fees (Visa on Arrival available)",
      "Personal expenses (laundry, drinks, phone calls, etc.)",
      "Tips & gratuities",
      "Optional activities (e.g., boating at Fewa Lake)",
      "Anything not mentioned in inclusions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival Kathmandu",
        description:
          "Meeting at airport upon arrival by Office Personnel. Kathmandu is the capital of Nepal and the Kathmandu Valley is the political and cultural heart of the Kingdom. The urban sprawl that makes up modern Kathmandu is in fact two cities, Patan and Kathmandu. Overnight at hotel.",
      },
      {
        day: 2,
        title: "Kathmandu Culture",
        description:
          "This morning you will be taken for a visit of the Hindu culture in Nepal, Pashupatinath. This is the place where holy saddhus pray and cremations on the Bagmati River are carried out. Also interact with the Sadhus in Pashupatinath. We then continue to the holiest shrine for the Buddhist culture in Nepal, Bouddhanath, with its large stupa, this is the place where all devout Buddhists come for a pilgrimage. Interaction with the Lamas in Boudhanth. Later visit Bhaktapur. Bhaktapur lies only at the distance of 13 km to the east from the capital city, Kathmandu, one can have an opportunity to experience a different world, the world full of vibrant cultures, colorful festivals, generation old craftsmanship, and on top of that the very worth experiencing indigenous lifestyle – still preserved old house, still practiced traditional ways of welcoming guests, still practiced culinary and cutlery and what not, still many more to experience, simply live in Bhaktapur.",
      },
      {
        day: 3,
        title: "Patan & Swayambhunath",
        description:
          "Today you will be taken for a visit to Patan. Also known as Lalitpur, the city of beauty is separated from Kathmandu only by the Bagmati River and is the second largest town in the valley. Lalitpur is fragmented from other cities due to its substantive architectural ancient masterpieces. Patan's central Durbar Square is absolutely packed with temples: It's an architectural center point with a far greater concentration of temples per sq. meter than in Kathmandu or Bhaktapur. Within the city also lies the Tibetan refugee center, home to most of the valley's Tibetan population. While technically refugees, the Tibetans are some of the wealthiest people in the valley because of the carpet industry they operate. For those looking to bring home a fine Tibetan carpet, this is the place to shop. You will then go to Swayambhunath the golden spire of the 5th-century Swayambhu stupa is adorned with a colorful fluttering of prayer flags; it crowns a hill overlooking the Kathmandu Valley and offers fantastic views over the city of Kathmandu. Swayambhunath is one of the most recognizable symbols in Nepal and the painted eyes of Buddha watch all who ascend the worn stone steps. Later drive from Swayambunath to Kathmandu Durbar Square. Kathmandu’s number one tourist attraction swarms with life. Though a few of the square’s 50-plus monuments date from the 12th century, most are from the time of the Malla Kings. Probably the most famous building here is the Kumari Bahal, a building richly decorated with beautiful woodcarvings, which is home to the Royal Kumari, the Living Goddess, a manifestation of the great goddess Durga. Nearby the former Royal Palace is a Mall Dynasty dwelling, once considerably more extensive than today. Within, the courtyard Nassal Chowk, originally hosted dramatic dance performances, now it is the coronation site of the Shah kings and contains some of the finest wood carvings you will see anywhere in the kingdom. Overnight at the hotel.",
      },
      {
        day: 4,
        title: "Kathmandu to Chitwan",
        description:
          "Drive to Chitwan. Chitwan is 180 Km from Kathmandu & is a 06 hours drive from Kathmandu. Chitwan is one of Asia's premier wildlife reserves. Its 360 square miles of tall grasslands and forests are home to a wide variety of mammals and birds, including several endangered species. Overnight in Chitwan.",
      },
      {
        day: 5,
        title: "Chitwan Wildlife",
        description:
          "Enjoy Jungle observation at Chitwan National park. The highlight being the Elephant Safari in the jungles. Other activities are Canoeing, Dugout canoe, Nature Walk and Bird Watching. Also experience walking through the forests with naturalists and watch the Native folk dances of the Terais. Overnight in Chitwan.",
      },
      {
        day: 6,
        title: "Chitwan to Pokhara",
        description:
          "Drive to Pokhara. Pokhara is 180 Km & is a 04 hours drive from Chitwan. From Pokhara town (2,352 feet) the 25,000+ peaks of the Annapurna and Dhaulagiri ranges rise a scant 20 miles away with no intervening ridges to spoil the view. Overnight at hotel.",
      },
      {
        day: 7,
        title: "Pokhara Sightseeing",
        description:
          "Early morning excursion trip to Sarangkot. Situated in the western part of Nepal at an elevation of about 1700 meters Sarangkot is very popular for mountain scenery. Here you can see panoramic views of Annapurna (8091m/26,545ft), Manasalu (8165m/26,781ft), Ganesh Himal (7446m/24,422ft), Dhaulagiri (8167m/26,795ft), Machhapuchare (the sacred mountain) and 25 other mountains over 6000 meters (19,680ft) high. This area also offers you views of the Pokhara Valley with all its natural beauty. Sarangkot is another spot renown for seeing the sunrise over the Himalayas. Later return back to Pokhara. Later in the afternoon visit Bindebasini Temple. This is one of the oldest temples in Pokhara was a part of Kaski Kingdom, the main deity of the temple, Goddess Durga, was brought from India. Apart from the peace and tranquility that can be felt in this region, the premises of the temple offers a good view of the Himalaya on a clear day. The temple is in the area of the bazaar, hence, a journey of the old bazaar can be combined with a visit to the temple. Sightseeing to Devi’s fall, also known as Patale Chango is an awesome waterfall lying 2 km southwest of Pokhara. During summer and rainy season, the waterfall takes its real form, with gushing water splashing and making its way through the rocks. Just opposite of Devi’s fall, on the other side of the road, there is Gupteshwor Cave. This cave is popular for the different natural forms made from limestone deposits. Photography is strictly prohibited inside the cave. In the evening enjoy the boating at Fewa Lake. (On Direct payment basis)",
      },
      {
        day: 8,
        title: "Pokhara to Nagarkot",
        description:
          "Drive back to Kathmandu. Continue drive to Nagarkot. Nagarkot is situated 32 kilometers, 1.5 hrs drive east of Kathmandu at an altitude of 2,175 meters. The panoramic view of the major peaks including Mt. Everest can be seen from here. This place is also famous for viewing sunrise and sunset. Overnight at hotel.",
      },
      {
        day: 9,
        title: "Departure",
        description:
          "Drive to the international airport for onward journey. It will take approximately 1.5 hours for you to reach the airport. Bid farewell to the treasures of Nepal and return with memories to cherish for a life time.",
      },
    ],
    gallery: [],
  },
  {
    title: "Magical Nepal: Heritage, Himalayas & Sacred Lumbini",
    location: "Kathmandu - Kuringtar - Pokhara - Lumbini - Chitwan - Nagarkot",
    country: "Nepal",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80",
    duration: "11N 12D",
    groupSize: "2 Pax",
    price:
      "From 2674 CAD per person on twin sharing basis (4 Star Premium – 2 Pax)",
    rating: 4.9,
    description:
      "Comprehensive circuit covering spiritual capital, Himalayan viewpoints, and Buddha's birthplace.",
    fullDescription:
      "Magical Nepal – Extended Circuit is a comprehensive 12-day journey covering Nepal’s spiritual capital, Himalayan viewpoints, wildlife-rich jungles, and the sacred birthplace of Lord Buddha. From the ancient temples of Kathmandu Valley to sunrise over Annapurna in Pokhara, from serene riverside relaxation in Kuringtar to the spiritual pilgrimage town of Lumbini, and thrilling safaris in Chitwan — this itinerary is ideal for travellers seeking culture, spirituality, nature, and soft adventure in one seamless journey. Final price depends on hotel category & group size. Accommodation: 4 Star Premium. Upgrade available to 5 Star Standard / Premium / Luxury.",
    highlights: [
      "Pashupatinath Temple & interaction with Sadhus",
      "Bouddhanath Stupa & Lama interaction",
      "Bhaktapur, Patan & Kathmandu Durbar Squares",
      "Swayambhunath (Monkey Temple)",
      "Optional Manakamana Temple cable car visit",
      "Sarangkot Himalayan sunrise",
      "Pokhara sightseeing including Devi’s Fall & Gupteshwor Cave",
      "Sacred Lumbini – Birthplace of Lord Buddha",
      "Chitwan National Park Jeep Safari",
      "Nagarkot Himalayan sunrise views",
    ],
    tags: [
      "Culture & Heritage",
      "Buddhist Pilgrimage",
      "Wildlife",
      "Mountains",
    ],
    included: [
      "03 Nights accommodation in Kathmandu with Breakfast",
      "01 Night accommodation in Kuringtar with Breakfast",
      "03 Nights accommodation in Pokhara with Breakfast",
      "01 Night accommodation in Lumbini with Breakfast",
      "02 Nights accommodation in Chitwan with Breakfast, Lunch & Dinner",
      "01 Night accommodation in Nagarkot with Breakfast",
      "Airport transfers by A/C vehicle",
      "Sightseeing in Kathmandu & Pokhara by private A/C vehicle",
      "English-speaking guide during sightseeing as per itinerary",
      "Entrance fees as per itinerary",
      "Jungle activities in Chitwan National Park (SIC basis)",
      "01 Jeep Safari",
      "01 Boat Safari",
      "Transportation: Kathmandu – Kuringtar – Pokhara – Lumbini – Chitwan – Nagarkot – Kathmandu",
      "Applicable hotel taxes",
    ],
    notIncluded: [
      "International Flights",
      "Nepal Visa Fees (Visa on Arrival available)",
      "Cable Car Tickets to Manakamana Temple",
      "Boating at Fewa Lake",
      "Adventure activities in Pokhara",
      "Personal expenses (laundry, drinks, etc.)",
      "Tips & gratuities",
      "Anything not mentioned in inclusions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival Kathmandu",
        description:
          "Meeting at airport upon arrival by Office Personnel. Kathmandu is the capital of Nepal and the Kathmandu Valley is the political and cultural heart of the Kingdom. The urban sprawl that makes up modern Kathmandu is in fact two cities, Patan and Kathmandu. Overnight at hotel.",
      },
      {
        day: 2,
        title: "Kathmandu Spiritual",
        description:
          "This morning you will be taken for a visit of the Hindu culture in Nepal, Pashupatinath. This is the place where holy saddhus pray and cremations on the Bagmati River are carried out. Also interact with the Sadhus in Pashupatinath. We then continue to the holiest shrine for the Buddhist culture in Nepal, Bouddhanath, with its large stupa, this is the place where all devout Buddhists come for a pilgrimage. Interaction with the Lamas in Boudhanth. Later visit Bhaktapur. Bhaktapur lies only at the distance of 13 km to the east from the capital city, Kathmandu, one can have an opportunity to experience a different world, the world full of vibrant cultures, colorful festivals, generation old craftsmanship, and on top of that the very worth experiencing indigenous lifestyle – still preserved old house, still practiced traditional ways of welcoming guests, still practiced culinary and cutlery and what not, still many more to experience, simply live in Bhaktapur.",
      },
      {
        day: 3,
        title: "Patan & Swayambhunath",
        description:
          "Today you will be taken for a visit to Patan. Also known as Lalitpur, the city of beauty is separated from Kathmandu only by the Bagmati River and is the second largest town in the valley. Lalitpur is fragmented from other cities due to its substantive architectural ancient masterpieces. Patan's central Durbar Square is absolutely packed with temples: Its an architectural center point with a far greater concentration of temples per sq. meter than in Kathmandu or Bhaktapur. Within the city also lies the Tibetan refugee center, home to most of the valley's Tibetan population. You will then go to Swayambhunath the golden spire of the 5th-century Swayambhu stupa is adorned with a colorful fluttering of prayer flags; it crowns a hill overlooking the Kathmandu Valley and offers fantastic views over the city of Kathmandu. Later drive from Swayambhunath to Kathmandu Durbar Square. Kathmandu’s number one tourist attraction swarms with life. Overnight at the hotel.",
      },
      {
        day: 4,
        title: "Kathmandu to Kuringtar",
        description:
          "Today drive to Kuringtar. Kuringtar is approximately 100 kms away from Kathmandu. The clients have the option of visiting Manakamna Temple. Cable car tickets to be paid for directly. Enjoy the rest of the day relax at the resort by the river side.",
      },
      {
        day: 5,
        title: "Kuringtar to Pokhara",
        description:
          "Drive to Pokhara. Pokhara is 150 Km & is a 04 hours drive from Kuringtar. From Pokhara town (2,352 feet) the 25,000+ peaks of the Annapurna and Dhaulagiri ranges rise a scant 20 miles away with no intervening ridges to spoil the view. Overnight at hotel.",
      },
      {
        day: 6,
        title: "Pokhara Sightseeing",
        description:
          "Today after breakfast visit Bindebasini Temple. Sightseeing to Devi’s fall, also known as Patale Chango and Gupteshwor Cave. In the evening enjoy the boating at Fewa Lake. (On Direct payment basis) Overnight in Pokhara.",
      },
      {
        day: 7,
        title: "Pokhara - Sarangkot Sunrise",
        description:
          "Early morning excursion trip to Sarangkot. Panoramic views of Annapurna, Manasalu, Ganesh Himal, Dhaulagiri and Machhapuchare. Rest of the day is free to relax and do adventure activities on direct payment basis. Overnight in Pokhara.",
      },
      {
        day: 8,
        title: "Pokhara to Lumbini",
        description:
          "Drive to Lumbini (7–8 hrs). Tour the Lumbini Garden which consists of the birth place of Lumbini and various Bodh Vihars built by different countries. You will tour by a rickshaw for 3 hrs. Overnight at hotel.",
      },
      {
        day: 9,
        title: "Lumbini to Chitwan",
        description:
          "Drive to Chitwan. Chitwan is one of Asia's premier wildlife reserves. Overnight in Chitwan.",
      },
      {
        day: 10,
        title: "Chitwan Wildlife",
        description:
          "Enjoy Jungle observation at Chitwan National park. The highlight being the Elephant Safari in the jungles. Other activities are Canoeing, Dugout canoe, Nature Walk and Bird Watching. Also experience walking through the forests with naturalists and watch the Native folk dances of the Terais. Overnight in Chitwan.",
      },
      {
        day: 11,
        title: "Chitwan to Nagarkot",
        description:
          "Retracing the same path for 6 hour drive back to Kathmandu. Continue drive to Nagarkot. Nagarkot is famous for sunrise and Himalayan panoramic views. Overnight at hotel.",
      },
      {
        day: 12,
        title: "Departure",
        description:
          "Drive to the international airport for onward journey. Bid farewell to the treasures of Nepal and return with memories to cherish for a life time.",
      },
    ],
    gallery: [],
  },
  {
    title: "Magical Nepal: Culture, Poon Hill Trek & Wildlife Adventure",
    location: "Kathmandu - Pokhara - Poon Hill Region - Chitwan - Nagarkot",
    country: "Nepal",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80",
    duration: "13N 14D",
    groupSize: "2 Pax",
    price:
      "From 3953 CAD per person on twin sharing basis (4 Star Premium – 2 Pax)",
    rating: 4.85,
    description:
      "Adventure combining culture, soft trekking in Himalayas, and wildlife.",
    fullDescription:
      "This 14-day adventure itinerary is designed for travellers who want to combine Nepal’s rich culture with an authentic Himalayan trekking experience. Explore sacred temples in Kathmandu Valley, witness Annapurna sunrise views from Poon Hill, stay in traditional tea houses during the trek, relax in scenic Pokhara, enjoy jungle safaris in Chitwan National Park, and conclude with Himalayan sunrise views from Nagarkot. A perfect blend of culture + soft adventure + wildlife + Himalayan landscapes. Final price depends on hotel category & group size. Accommodation: 4 Star Premium (Basic Lodge during trek). Upgrade available to 5 Star categories (except trek lodges).",
    highlights: [
      "Welcome Nepali cultural dinner",
      "Pashupatinath & Bouddhanath spiritual visits",
      "Bhaktapur, Patan & Kathmandu Durbar Squares",
      "Rickshaw ride in Thamel",
      "Scenic flight to Pokhara",
      "4-Day Poon Hill Trek (Ulleri, Ghorepani, Tadapani)",
      "Sunrise at Poon Hill (3,210m)",
      "Annapurna & Dhaulagiri panoramic views",
      "Chitwan National Park Safari",
      "Nagarkot Himalayan sunrise",
    ],
    tags: ["Trekking", "Himalayas", "Wildlife", "Culture & Heritage"],
    included: [
      "03 Nights accommodation in Kathmandu with Breakfast",
      "03 Nights accommodation in Pokhara with Breakfast",
      "03 Nights accommodation at Basic Lodge during Poon Hill Trek",
      "03 Nights accommodation in Chitwan with Breakfast, Lunch & Dinner",
      "01 Night accommodation in Nagarkot with Breakfast",
      "Welcome dinner in Kathmandu with cultural dance performance",
      "Airport transfers by A/C vehicle",
      "Sightseeing in Kathmandu & Pokhara by private A/C vehicle",
      "English-speaking guide during sightseeing as per itinerary",
      "ACAP Permit fees included (2 passport photos required)",
      "Jungle activities in Chitwan National Park (SIC basis)",
      "01 Jeep Safari",
      "01 Boat Safari",
      "Transportation: Kathmandu – Pokhara – Chitwan – Nagarkot – Kathmandu",
      "Applicable hotel taxes",
    ],
    notIncluded: [
      "International Flights",
      "Nepal Visa Fees",
      "Boating at Fewa Lake",
      "Adventure activities (paragliding, etc.)",
      "Personal expenses",
      "Tips & gratuities",
      "Anything not mentioned in inclusions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival Kathmandu",
        description:
          "Meeting at airport upon arrival by Office Personnel. Kathmandu is the capital of Nepal and the Kathmandu Valley is the political and cultural heart of the Kingdom. The urban sprawl that makes up modern Kathmandu is in fact two cities, Patan and Kathmandu. Welcome dinner at the Utsav Restaurant, a Nepali dinner with Nepali cultural dance performances.",
      },
      {
        day: 2,
        title: "Kathmandu",
        description:
          "Today you will be taken for a visit of the Hindu culture in Nepal, Pashupatinath. This is the place where holy saddhus pray and cremations on the Bagmati River are carried out. Also interact with the Sadhus in Pashupatinath. We then continue to the holiest shrine for the Buddhist culture in Nepal, Bouddhanath, with its large stupa. Interaction with the Lamas in Boudhanth. Later visit Bhaktapur.",
      },
      {
        day: 3,
        title: "Patan, Swayambhunath & Thamel",
        description:
          "Today you will be taken for a visit to Patan. You will then go to Swayambhunath the golden spire of the 5th-century Swayambhu stupa. Later drive from Swayambhunath to Kathmandu Durbar Square. Take a rickshaw ride from Kathmandu Durbar Square to Thamel. Overnight at the hotel.",
      },
      {
        day: 4,
        title: "Kathmandu to Pokhara",
        description:
          "Fly to Pokhara. Pokhara is a 20 mins flight from Kathmandu. Overnight at hotel.",
      },
      {
        day: 5,
        title: "Pokhara/Nayapul/trek to Tikhedhunga/Ulleri",
        description:
          "Pickup from Pokhara hotel. Drive to Nayapul (1 ½ hr). Trek to Tikhedhunga and then to Ulleri (1,950 meters). Overnight stay at basic tea house.",
      },
      {
        day: 6,
        title: "Ulleri to Ghorepani",
        description:
          "Trek from Ulleri to Ghorepani (2,850 meters, 5–6 hrs). Overnight stay at basic tea house.",
      },
      {
        day: 7,
        title: "Ghorepani to Poon Hill to Tadapani",
        description:
          "Trek from Ghorepani to Poon Hill (3,210 meters). Trek down to Tadapani (2,520 meters). Overnight stay at basic tea house.",
      },
      {
        day: 8,
        title: "Poon Hill/Nayapul/Pokhara",
        description:
          "Trek down from Poon Hill to Nayapul (5–6 hrs). Drive from Nayapul to Pokhara and drop to the hotel.",
      },
      {
        day: 9,
        title: "Pokhara",
        description:
          "Visit Devi’s fall and Gupteshwor Cave. In the evening enjoy boating at Fewa Lake (Direct payment basis). Overnight in Pokhara.",
      },
      {
        day: 10,
        title: "Pokhara to Chitwan",
        description: "Drive to Chitwan (approx. 5 hrs). Overnight in Chitwan.",
      },
      {
        day: 11,
        title: "Chitwan",
        description:
          "Enjoy Jungle observation at Chitwan National park. Overnight in Chitwan.",
      },
      {
        day: 12,
        title: "Chitwan Relax",
        description:
          "Relax in Chitwan and try more Jungle activities. Overnight in Chitwan.",
      },
      {
        day: 13,
        title: "Chitwan to Nagarkot",
        description:
          "Drive back to Kathmandu. Continue drive to Nagarkot. Overnight at hotel.",
      },
      {
        day: 14,
        title: "Departure",
        description:
          "Drive to the international airport for onward journey. Bid farewell to the treasures of Nepal.",
      },
    ],
    gallery: [],
  },
];

export default nepalSeeds;
