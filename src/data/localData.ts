import tours from "@/data/toursdata/data.json";
import tajMahal from "@/assets/destinations/taj-mahal.jpg";
import nepal from "@/assets/destinations/nepal.jpg";
import bhutan from "@/assets/destinations/bhutan.jpg";
import srilanka from "@/assets/destinations/srilanka.jpg";
import varanasi from "@/assets/destinations/varanasi.jpg";

// Blog Images
import blog1 from "@/assets/blog/01-blog-1771393334643-ayur-eco-ashram.webp";
import blog2 from "@/assets/blog/04-blog-1771393667259-photo-1718881006825-b5aeb06c3c10.avif";
import blog3 from "@/assets/blog/06-blog-1771393085902-21-xalima-island-water-pavilion-a-vision-of-tropical-luxury-b.jpg";
import blog4 from "@/assets/blog/09-blog-1771391533226-tigers-around-dharamshala.webp";
import blog5 from "@/assets/blog/12-blog-1771394553681-nalanda-university.webp";
import blog6 from "@/assets/blog/13-blog-1771392494314-everest-base-camp-helicopter-tour-orig.jpg";
import blog7 from "@/assets/blog/15-blog-1771393830417-dsc-6366-1.jpg";
import blog8 from "@/assets/blog/17-blog-1771391789788-west.webp";
import blog9 from "@/assets/blog/18-blog-1771392096947-images.jpg";

export const localTours = tours as unknown[];

export const localCities = [
  {
    id: "city-1",
    name: "Delhi",
    country: "India",
    image: "/src/assets/destinations/delhi.jpg",
    tours: 12,
    description: "The heart of India, where history meets modernity.",
    popular: ["Red Fort", "Qutub Minar", "India Gate"]
  },
  {
    id: "city-2",
    name: "Jaipur",
    country: "India",
    image: "/src/assets/destinations/jaipur.jpg",
    tours: 8,
    description: "The Pink City, known for its magnificent palaces and forts.",
    popular: ["Amber Fort", "Hawa Mahal", "City Palace"]
  },
  {
    id: "city-3",
    name: "Kathmandu",
    country: "Nepal",
    image: "/src/assets/destinations/kathmandu.jpg",
    tours: 15,
    description: "A city of temples and gateway to the Himalayas.",
    popular: ["Swayambhunath", "Pashupatinath", "Boudhanath"]
  }
];

export const localDestinations = [
  {
    id: "dest-1",
    name: "India",
    tagline: "Incredible India",
    description: "A land of diverse cultures, stunning landscapes, and ancient history.",
    image: tajMahal,
    highlights: ["Taj Mahal", "Varanasi Ghats", "Kerala Backwaters"],
    subDestinations: [
      { name: "North India", image: tajMahal, tours: 25 },
      { name: "South India", image: srilanka, tours: 18 }
    ]
  },
  {
    id: "dest-2",
    name: "Nepal",
    tagline: "Roof of the World",
    description: "Home to Mount Everest and breathtaking mountain vistas.",
    image: nepal,
    highlights: ["Everest Base Camp", "Pokhara Lakes", "Chitwan Wildlife"],
    subDestinations: [
      { name: "Kathmandu Valley", image: nepal, tours: 12 },
      { name: "Annapurna Region", image: nepal, tours: 15 }
    ]
  }
];

export const localExploreDestinations = [
  {
    id: "exp-1",
    name: "Taj Mahal",
    landmark: "Agra, India",
    image: tajMahal,
    description: "An ivory-white marble mausoleum on the south bank of the Yamuna river."
  },
  {
    id: "exp-2",
    name: "Varanasi",
    landmark: "Uttar Pradesh, India",
    image: varanasi,
    description: "The spiritual capital of India, known for its many ghats."
  }
];

export const localFaqs = [
  {
    id: "faq-1",
    question: "When is the best time to visit India?",
    answer: "The best time to visit most of India is during the cool, dry season from November to March."
  },
  {
    id: "faq-2",
    question: "Do I need a visa for Nepal?",
    answer: "Most nationalities can obtain a visa on arrival in Nepal at the airport or land borders."
  }
];

export const localTeam = [
  {
    id: "team-1",
    name: "Aarav Sharma",
    role: "Founder & CEO",
    image: "/src/assets/team/aarav.jpg",
    bio: "Passionate traveler with 20 years of experience in South Asian tourism."
  },
  {
    id: "team-2",
    name: "Priya Patel",
    role: "Head of Operations",
    image: "/src/assets/team/priya.jpg",
    bio: "Expert in logistics and ensuring seamless travel experiences."
  }
];

export const localBlogPosts = [
    {
        "id": "7vzCwplLaPoqIkBXrUBx",
        "readTime": "5 min",
        "tags": [
            "Yoga retreats India",
            "spiritual tours India",
            "Ayurveda wellness India",
            "Rishikesh yoga travel"
        ],
        "category": "Wellness",
        "date": "February 18, 2025",
        "image": blog1,
        "title": "The Spiritual Side of India: Yoga, Ashrams & Transformational Journeys",
        "featured": false,
        "excerpt": "Discover India’s spiritual journeys — yoga in Rishikesh, Ayurveda in Kerala, and transformative cultural experiences for North American travelers.",
        "content": "<p><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\">Rishikesh: The Global Capital of Yoga</strong></p><p><br></p><p><img src=\"/src/assets/blog/02-200-hour-ashtanga-yoga-teacher-training-rishikesh-himalayan-yoga-association-1.jpg\" alt=\"Why Rishikesh Is Called The Yoga Capital Of The World\"></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Nestled in the Himalayan foothills, Rishikesh has drawn seekers for decades.</span></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Morning yoga sessions overlooking the Ganges.</span></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Ashram stays rooted in traditional teachings.</span></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Evening Ganga Aarti ceremonies — rhythmic, powerful, unforgettable.</span></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">For Canadian wellness agencies, Rishikesh provides:</span></p><ul><li><span style=\"background-color: transparent;\">Authentic teacher-led programs</span></li><li><span style=\"background-color: transparent;\">Structured retreat itineraries</span></li><li><span style=\"background-color: transparent;\">Combination of yoga + light Himalayan exploration</span></li></ul><p><br></p><p><br></p><p><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\">Varanasi: Witnessing Living Spirituality</strong></p><p><br></p><p><img src=\"/src/assets/blog/03-varanasi-exploring-the-spiritual-essence-of-the-city-of-light.jpg\" alt=\"Exploring Varanasi: The Spiritual Essence of the City of Light\"></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Varanasi is not polished. It is real.</span></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Here, rituals unfold daily along the riverbanks. Travelers witness cremation ceremonies, sunrise boat rides, and...",
        "additionalImages": [],
        "author": "Indomaple Team"
    },
    {
        "id": "BsBX9YhTmtL12g1n4bui",
        "category": "Wellness",
        "excerpt": "Explore India’s luxury trains — palace-style rail journeys combining heritage, fine dining, and curated cultural experiences",
        "image": blog2,
        "content": "<p><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">The Maharajas’ Express</strong></p><p><br></p><p><img src=\"/src/assets/blog/05-maharajas-express-train-1.jpg\" alt=\"Maharajas Express: Can India's luxury trains get back on track?\"></p><p><br></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Often ranked among the world’s most luxurious trains, it offers:</span></p><ul><li><span style=\"background-color: transparent;\">Private butler service</span></li><li><span style=\"background-color: transparent;\">En-suite cabins</span></li><li><span style=\"background-color: transparent;\">Curated off-train excursions</span></li><li><span style=\"background-color: transparent;\">Fine dining experiences</span></li></ul><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Routes typically cover Rajasthan, Agra, and Central India.</span></p><p><br></p><p><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">Palace on Wheels</strong></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Inspired by royal carriages of former princely states, it blends nostalgia with modern comfort.</span></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Ideal for:</span></p><ul><li><span style=\"background-color: transparent;\">Luxury small groups</span></li><li><span style=\"background-color: transparent;\">Affluent retirees</span></li><li><span style=\"background-color: transparent;\">High-end escorted tours</span></li></ul><p><br></p><p><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">Why Luxury Trains Appeal to North American Markets</strong></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">They solve key travel concerns:</span></p><ul><li><span style=\"background-color: transparent;\">Reduced packing/unpacking</span></li><li><span style=\"background-color: transparent;\">Controlled pacing</span></li><li><span style=\"background-color: transparent;\">Premium security</span></li></ul>",
        "date": "March 22, 2025",
        "additionalImages": [],
        "title": "Luxury Trains of India: Traveling Like Royalty",
        "tags": [
            "Luxury train India",
            "Maharajas Express tour",
            "Palace on Wheels experience"
        ],
        "featured": false,
        "readTime": "6 Min",
        "author": "Indomaple Team"
    },
    {
        "id": "CNnVDLKgHl0eDdZMAK1E",
        "tags": [
            "Best beaches in India",
            "luxury beach holidays India",
            "Andaman Islands travel"
        ],
        "featured": false,
        "additionalImages": [],
        "author": "Indomaple Team",
        "title": "India’s Best Beaches: Tropical Luxury Beyond Expectations",
        "image": blog3,
        "date": "Apr 1, 2025",
        "readTime": "5 Min",
        "content": "<p><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">Andaman Islands – India’s Tropical Paradise</strong></p><p><br></p><p><img src=\"/src/assets/blog/07-1754638854-404857-andaman-islands-travel-guide-beaches-adventures-places-to-visi.webp\" alt=\"Andaman Islands Travel Guide: Explore India's Tropical Paradise\"></p><p><br></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Crystal-clear water. Soft white sand. Minimal crowds.</span></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Radhanagar Beach frequently ranks among Asia’s best beaches.</span></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Perfect for:</span></p><ul><li><span style=\"background-color: transparent;\">Honeymoon extensions</span></li><li><span style=\"background-color: transparent;\">Post-cultural relaxation</span></li><li><span style=\"background-color: transparent;\">Boutique luxury stays</span></li></ul><p><br></p><p><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">Goa – Beyond the Party Image</strong></p><p><br></p><p><img src=\"/src/assets/blog/08-goa-image1-2.jpg\" alt=\"Goa Beyond Beach: What's More for Couples in Goa? - OYO\"></p><p><br></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Modern Goa offers:</span></p><ul><li><span style=\"background-color: transparent;\">Heritage Portuguese villas</span></li><li><span style=\"background-color: transparent;\">Boutique luxury resorts</span></li><li><span style=\"background-color: transparent;\">Wellness retreats</span></li><li><span style=\"background-color: transparent;\">Private beach dining experiences</span></li></ul><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Ideal for winter sun escapes from Canada.</span></p><p><br></p><p><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">Lakshadweep – Remote &amp; Exclusive</strong></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">For those seeking ultimate off-grid luxury, Lakshadweep’s atolls offer:</span></p><ul><li><span style=\"background-color: transparent;\">Pristine coral lagoons</span></li><li><span style=\"background-color: transparent;\">Exclusive eco-resorts</span></li><li><span style=\"background-color: transparent;\">World-class diving and snorkeling</span></li></ul>",
        "category": "Island",
        "excerpt": "Discover India’s best beaches — from Andaman’s turquoise waters to Goa’s luxury resorts — perfect for curated North American itineraries.\n"
    },
    {
        "id": "PAWaLYZsTa2mufgx1V7q",
        "date": "May 17, 2025",
        "author": "Indomaple Team",
        "featured": false,
        "image": blog4,
        "additionalImages": [
            "/src/assets/blog/10-blog-1771391344279-tigers-around-dharamshala.webp"
        ],
        "title": "Face to Face with the Bengal Tiger: A Safari Experience Your Clients Will Never Forget",
        "category": "Adventure",
        "content": "<p><img src=\"/src/assets/blog/19-bengal-tiger-inline.jpg\"></p><p><br></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">The jeep engine turns off.</span></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">There’s a stillness that settles across the jungle — broken only by the alarm call of a spotted deer.</span></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">And then, through tall golden grass, stripes appear.</span></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">A Bengal tiger. Not in a documentary. Not behind glass. Just meters away.</span></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">For many international travelers, this moment becomes the defining memory of their India journey.</span></p><p><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">Why India Is the Ultimate Tiger Destination</strong></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">India is home to nearly 75% of the world’s wild Bengal tiger population. Conservation efforts over the past decade have transformed its national parks into some of the best-managed wildlife reserves globally.</span></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Top safari regions include:</span></p><ul><li><span style=\"background-color: transparent;\">Ranthambore (Rajasthan)</span></li><li><span style=\"background-color: transparent;\">Bandhavgarh (Central India)</span></li><li><span style=\"background-color: transparent;\">Kanha (Central India)</span></li><li><span style=\"background-color: transparent;\">Tadoba (Maharashtra)</span></li></ul>",
        "excerpt": "Discover why a Bengal tiger safari in India is one of the world’s most unforgettable wildlife experiences for North American travelers.",
        "readTime": "4 Min",
        "tags": [
            "Bengal tiger safari India",
            "Ranthambore wildlife tour",
            "luxury safari India",
            "tiger sighting India"
        ]
    },
    {
        "id": "WPuvACtF8Pl4gU5xJPel",
        "readTime": "8 Min",
        "tags": [
            "Educational tours India",
            "student travel India",
            "study tour India programs"
        ],
        "author": "Indomaple Team",
        "category": "Wellness",
        "content": "<p><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">History &amp; Architecture</strong></p><p><br></p><p><img src=\"/src/assets/blog/11-nalanda-university-wikipedia.jpg\" alt=\"8 Ancient Indian Universities You Did Not Know Existed\"></p><p><br></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Delhi, Agra, Jaipur — foundational circuits for:</span></p><ul><li><span style=\"background-color: transparent;\">Islamic architecture</span></li><li><span style=\"background-color: transparent;\">Colonial influence</span></li><li><span style=\"background-color: transparent;\">Urban development studies</span></li></ul><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Field exposure deepens understanding beyond lectures.</span></p><p><br></p><p><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">Religion &amp; Philosophy</strong></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Few countries offer exposure to:</span></p><ul><li><span style=\"background-color: transparent;\">Hinduism</span></li><li><span style=\"background-color: transparent;\">Buddhism</span></li><li><span style=\"background-color: transparent;\">Sikhism</span></li><li><span style=\"background-color: transparent;\">Jainism</span></li><li><span style=\"background-color: transparent;\">Islam</span></li></ul>",
        "additionalImages": [],
        "excerpt": " Explore how India offers immersive educational travel opportunities in history, religion, sustainability, and global studies.",
        "image": blog5,
        "featured": false,
        "title": "India for Educational Institutions: Where History Comes Alive",
        "date": "July 23, 2025"
    },
    {
        "id": "uUVswmDmVvaVUOmGO8Nb",
        "date": "Jun 10, 2025",
        "image": blog6,
        "tags": [
            "Everest Base Camp helicopter tour",
            "luxury Nepal experience",
            "Himalayan helicopter breakfast"
        ],
        "category": "Island",
        "title": "Breakfast on Top of the World: Everest Base Camp Helicopter Experience",
        "additionalImages": [],
        "author": "Indomaple Team",
        "readTime": "5 Min",
        "excerpt": "Discover the Everest Base Camp helicopter breakfast experience — a premium Himalayan journey ideal for luxury and incentive travel.",
        "content": "<p><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">Why This Experience Works for North American Clients</strong></p><p><br></p><p><img src=\"/src/assets/blog/14-a9.jpg\" alt=\"Everest Helicopter Tour from Kathmandu with Landing for Breakfast - Viator\"></p><p><br></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Time-efficient.</span></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Bucket-list worthy.</span></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Safe and professionally operated.</span></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">For:</span></p><ul><li><span style=\"background-color: transparent;\">Luxury honeymooners</span></li><li><span style=\"background-color: transparent;\">Corporate incentive groups</span></li><li><span style=\"background-color: transparent;\">Milestone celebration travelers</span></li><li><span style=\"background-color: transparent;\">Premium small group departures</span></li></ul>",
        "featured": false
    },
    {
        "id": "v1uXlgqqGsmLZc7WLuqu",
        "author": "Indomaple Team",
        "category": "Wellness",
        "excerpt": "Discover why India is emerging as a dynamic destination for corporate incentive travel and experiential MICE programs.",
        "title": "Corporate Incentive Travel in India: Beyond the Ballroom",
        "featured": false,
        "tags": [
            "India incentive travel",
            "MICE India",
            "corporate retreat India"
        ],
        "readTime": "5 Min",
        "date": "Aug 18, 2025",
        "additionalImages": [],
        "image": blog7,
        "content": "<p><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">Desert Gala in Rajasthan</strong></p><p><br></p><p><img src=\"/src/assets/blog/16-images.jpg\" alt=\"Gala Dinner at Pushkar Adventure Desert Camp\"></p><p><br></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Imagine a private dinner under lantern-lit dunes.</span></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Folk musicians performing live.</span></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Camel caravans arriving at sunset.</span></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Luxury tents with curated service.</span></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Incentive travel becomes immersive storytelling.</span></p>",
    },
    {
        "id": "yu4w8THyCp9iJ5UcYzrp",
        "tags": [
            "Best time to visit India",
            "India travel by month",
            "India weather guide",
            "India seasonal travel planning",
            "India tour packages for Canadians"
        ],
        "additionalImages": [],
        "image": blog8,
        "date": "Nav 18, 2025",
        "readTime": "5 Min",
        "content": "<p><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">“When is the best time to visit India?”</strong></p><p><br></p><p><img src=\"/src/assets/blog/20-inline-blog-image-01.jpg\"></p><p><br></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">The honest answer?</span></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">It depends on where — and what kind of experience your clients want.</span></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">India isn’t one destination. It’s a subcontinent. Snow peaks, tropical beaches, desert kingdoms, tea estates, jungles, and spiritual towns — all in one country. Understanding seasonality is what separates a good itinerary from an unforgettable one.</span></p>",
        "featured": true,
        "excerpt": "Plan India travel by month with this expert seasonal guide for North American agencies. Weather insights, destination ideas & planning tips.",
        "title": "The Ultimate India Travel Guide by Month (For North American Travelers)",
        "category": "Adventure",
        "author": "Indomaple Team"
    },
    {
        "id": "zdI8MB3FeVF427ILWUTO",
        "tags": [
            "Hidden places in India",
            "offbeat India destinations",
            "unique India tours"
        ],
        "additionalImages": [],
        "date": "Jan 16, 2026",
        "excerpt": "Explore India’s hidden gems beyond the Golden Triangle. Unique destinations perfect for curated North American itineraries.",
        "category": "Island",
        "image": blog9,
        "featured": false,
        "title": "India’s Best Kept Secrets: 7 Destinations Beyond the Taj Mahal",
        "content": "<p><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">1. Hampi – The Lost Empire</strong></p><p><br></p><p><img src=\"/src/assets/blog/21-inline-blog-image-02.jpg\"></p><p><br></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Massive stone boulders scattered across ancient temple ruins. Hampi feels almost surreal.</span></p><p><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">Perfect for:</span></p><ul><li><span style=\"background-color: transparent;\">History-focused travelers</span></li><li><span style=\"background-color: transparent;\">Photography enthusiasts</span></li><li><span style=\"background-color: transparent;\">Cultural study programs</span></li></ul>",
        "author": "Indomaple Team",
        "readTime": "5 Min"
    }
];

export const localTestimonials = [
  {
    id: "test-1",
    name: "Sarah Mitchell",
    location: "Toronto, Canada",
    quote:
      "Flawless execution from planning to on-ground support. Every hotel and transfer felt premium.",
    rating: 5,
    avatar: "SM",
    image: "/src/assets/testimonials/sarah.jpg"
  },
  {
    id: "test-2",
    name: "Arjun Patel",
    location: "Vancouver, Canada",
    quote:
      "Their India routing was practical and luxurious. We saved time and still saw so much.",
    rating: 5,
    avatar: "AP",
    image: "/src/assets/testimonials/arjun.jpg"
  },
  {
    id: "test-3",
    name: "Emma Rodriguez",
    location: "Calgary, Canada",
    quote:
      "Nepal + Bhutan was curated beautifully. Highly responsive team and excellent local guides.",
    rating: 5,
    avatar: "ER",
    image: "/src/assets/testimonials/emma.jpg"
  },
];

export const localTravelEssentials = [
  {
    id: "te-1",
    icon: "FileText",
    title: "Visa & Entry",
    description: "Most destinations support clear tourist visa pathways.",
    details: [
      "Check passport validity (minimum 6 months).",
      "Carry digital and printed travel documents.",
      "Review destination-specific visa rules before departure.",
    ],
  },
  {
    id: "te-2",
    icon: "Stethoscope",
    title: "Health & Wellness",
    description: "Prepare basic health needs before departure.",
    details: [
      "Consult a travel clinic 4–6 weeks prior.",
      "Carry a personal first-aid kit.",
      "Check for required or recommended vaccinations.",
    ],
  },
  {
    id: "te-3",
    icon: "Shield",
    title: "Safety & Ethics",
    description: "Travel responsibly and stay safe.",
    details: [
      "Follow local laws and customs.",
      "Use reputable transport services.",
      "Respect wildlife and natural environments.",
    ],
  },
];
