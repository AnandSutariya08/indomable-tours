import { Tour } from "@/hooks/useFirestoreData";

const wellnessSeeds: Omit<Tour, "id">[] = [
  // ==================== WELLNESS ITINERARY 1 ====================
  {
    title: "Art of Detox Programme (7N/8D)",
    location: "Maharashtra Wellness Resort",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&q=80",
    duration: "7N 8D",
    groupSize: "2 Pax",
    price: "From 7999 USD per person on twin sharing basis",
    rating: 4.9,
    description:
      "A comprehensive, medically guided cleansing journey set within a luxury wellness sanctuary in Maharashtra.",
    fullDescription:
      "Art of Detox is a comprehensive, medically guided cleansing journey set within a luxury wellness sanctuary in Maharashtra. Designed to reset digestion, circulation, and metabolic balance, the programme integrates Ayurveda, naturopathy, therapeutic cleansing practices, and mindful movement to gently eliminate accumulated toxins while restoring vitality. With personalised doctor consultations, daily yoga and pranayama, structured detox therapies, and guided lifestyle correction, this experience goes beyond short-term cleansing. It is ideal for travellers seeking deep physical reset, improved gut health, nervous-system balance, and sustainable wellness habits that extend long after departure. Accommodation: Luxury.",
    highlights: [
      "Comprehensive Doctor Consultation To Assess Toxin Load, Digestion And Lifestyle Patterns.",
      "Integrated Detox Approach Combining Ayurveda, Naturopathy And Therapeutic Cleansing Practices.",
      "Detox Therapies Focused On Improving Digestion, Circulation And Elimination.",
      "Daily Yoga, Pranayama And Meditation To Support Detoxification And Nervous-System Balance.",
      "Lifestyle And Dietary Correction Practices To Prevent Toxin Re-Accumulation.",
    ],
    tags: ["Wellness", "Detox", "Ayurveda", "Naturopathy", "Yoga"],
    included: [
      "Accommodation in a Luxury Wellness Resort in Maharashtra",
      "Airport Transfers from Mumbai",
      "Comprehensive Doctor Consultation",
      "Daily Yoga, Therapies & Wellness activities as mentioned in the day wise itinerary",
    ],
    notIncluded: [
      "Flights, Visa",
      "Tips or Gratuities",
      "Anything not mentioned in inclusions or day wise itinerary",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day 1: Arrival & Doctor Consultation",
        description:
          "Arrival and check-in followed by a personal consultation with the doctor. Detox suitability and lifestyle patterns are assessed and a customised detox plan is created. Evening includes gentle yoga and relaxation.",
      },
      {
        day: 2,
        title: "Day 2: Yoga, Pranayama & Detox Therapies",
        description:
          "Morning yoga and pranayama. Detox therapies begin focusing on digestion and circulation. Afternoon rest and hydration. Evening meditation.",
      },
      {
        day: 3,
        title: "Day 3: Continued Detox & Hydrotherapy",
        description:
          "Continued detox therapies and hydrotherapy practices as advised. Diet remains light and cleansing. Guided relaxation in the evening.",
      },
      {
        day: 4,
        title: "Day 4: Yoga, Breathwork & Lifestyle Guidance",
        description:
          "Yoga and breathwork continue. Body therapies support toxin elimination and muscle relaxation. Lifestyle correction guidance session in the afternoon.",
      },
      {
        day: 5,
        title: "Day 5: Deep Detox & Metabolic Balance",
        description:
          "Detox therapies deepen with emphasis on metabolic balance. Quiet time and restorative practices support recovery.",
      },
      {
        day: 6,
        title: "Day 6: Stabilising Therapies & Reflection",
        description:
          "Yoga, pranayama and stabilising therapies help restore energy. Reflection and relaxation practices in the evening.",
      },
      {
        day: 7,
        title: "Day 7: Consolidation & Rejuvenation",
        description:
          "Consolidation day with lighter detox and rejuvenation therapies. Diet and routine guidance reinforced.",
      },
      {
        day: 8,
        title: "Day 8: Closing Consultation & Departure",
        description:
          "Final morning yoga and meditation followed by a closing doctor consultation. Personalised post-detox diet and lifestyle recommendations are shared. Check-out by late morning.",
      },
    ],
    gallery: [],
  },

  // ==================== WELLNESS ITINERARY 2 ====================
  {
    title: "Integrative Detox Journey (6N/7D) at Six Senses Vana",
    location: "Dehradun, Uttarakhand",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&q=80",
    duration: "6N 7D",
    groupSize: "2 Pax",
    price: "From 9450 USD per person on twin sharing basis",
    rating: 4.95,
    description:
      "An ultra-luxury wellness immersion focused on restoring balance through clean nutrition, conscious movement, and restorative therapies.",
    fullDescription:
      "The Integrative Detox Journey at Six Senses Vana is an ultra-luxury wellness immersion focused on restoring balance through clean nutrition, conscious movement, and restorative therapies. Beginning with a comprehensive wellness screening, the programme creates a personalised path to improve digestion, reduce stress, and enhance metabolic efficiency. Blending functional movement, breathwork, body therapies, and sleep optimisation practices, this retreat emphasises sustainable wellbeing rather than aggressive detox. Ideal for discerning travellers seeking refined comfort alongside meaningful health transformation, the journey delivers both physical rejuvenation and mental clarity within a tranquil Himalayan foothill setting. Accommodation: Six Senses Vana, Dehradun (Ultra Luxury).",
    highlights: [
      "Comprehensive Wellness Screening To Understand Lifestyle Patterns, Stress Levels And Detox Readiness.",
      "Integrative Detox Programme Combining Clean Nutrition, Movement, Breathwork And Restorative Body Therapies.",
      "Daily Yoga, Functional Movement And Mindful Stretching To Enhance Circulation And Lymphatic Flow.",
      "Stress-Reduction Practices Including Meditation, Breathwork And Guided Relaxation.",
      "Lifestyle Guidance Focused On Sleep Quality, Hydration, Digestion And Long-Term Wellbeing Habits.",
    ],
    tags: ["Wellness", "Detox", "Ultra Luxury", "Yoga", "Six Senses"],
    included: [
      "Accommodation in a Luxury Wellness Resort in Dehradun, Uttarakhand, India",
      "Airport Transfers New Delhi",
      "Comprehensive Wellness Screening",
      "Daily Yoga, Therapies & Wellness activities as mentioned in the day wise itinerary",
    ],
    notIncluded: [
      "Flights, Visa",
      "Tips or Gratuities",
      "Anything not mentioned in inclusions or day wise itinerary",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day 1: Arrival & Wellness Assessment",
        description:
          "Arrival and check-in followed by a wellness assessment to understand lifestyle, nutrition and stress patterns. Evening includes gentle stretching and guided relaxation.",
      },
      {
        day: 2,
        title: "Day 2: Yoga, Breathwork & Restorative Therapy",
        description:
          "Morning yoga and breathwork. Detox-friendly meals and restorative body therapy support digestion and circulation. Evening mindfulness practice.",
      },
      {
        day: 3,
        title: "Day 3: Functional Movement & Meditation",
        description:
          "Functional movement and mobility session. Nutrition and hydration rituals continue. Afternoon rest and guided meditation.",
      },
      {
        day: 4,
        title: "Day 4: Yoga, Breathwork & Lifestyle Education",
        description:
          "Yoga and breath-focused movement in the morning. Restorative therapy supports muscle release and nervous-system calm. Lifestyle education session in the afternoon.",
      },
      {
        day: 5,
        title: "Day 5: Movement, Mindfulness & Metabolic Balance",
        description:
          "Movement, mindfulness and clean nutrition continue. Focus on sleep quality, stress reduction and metabolic balance.",
      },
      {
        day: 6,
        title: "Day 6: Lighter Activity & Consolidation",
        description:
          "Lighter activity day with stretching, meditation and consolidation of detox benefits. Preparation for post-programme routine.",
      },
      {
        day: 7,
        title: "Day 7: Closing Consultation & Departure",
        description:
          "Final morning movement session followed by a closing consultation. Personalised lifestyle and wellness recommendations are shared. Check-out by late morning.",
      },
    ],
    gallery: [],
  },

  // ==================== WELLNESS ITINERARY 3 ====================
  {
    title: "7 Days Ayurveda Treatment Program (6N/7D)",
    location: "Kerala Wellness Resort",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80",
    duration: "6N 7D",
    groupSize: "2 Pax",
    price: "From 3250 USD per person on twin sharing basis",
    rating: 4.85,
    description:
      "An authentic introduction to India’s ancient healing science in the birthplace of Ayurveda — Kerala.",
    fullDescription:
      "This 7-Day Ayurveda Treatment Program offers an authentic introduction to India’s ancient healing science in the birthplace of Ayurveda — Kerala. Guided by experienced Ayurvedic physicians, the programme combines personalised consultations, daily therapeutic treatments such as Abhyanga and Shirodhara, and carefully curated sattvic meals tailored to individual constitution (dosha). Complemented by yoga, pranayama, meditation, and serene natural surroundings, this journey focuses on restoring internal balance, reducing stress, and strengthening immunity. Ideal for travellers seeking traditional, time-tested healing methods in a peaceful tropical setting, the experience supports holistic rejuvenation of body and mind. Accommodation: Premium Resort.",
    highlights: [
      "Daily Ayurveda Therapies Like Abhyanga And Shirodhara With Consultation Of Doctors",
      "Personalized Ayurveda Consultation And Diet Guidance",
      "Morning Yoga And Pranayama Sessions",
      "Evening Meditation And Chanting",
      "Nutritious Ayurveda Meals",
    ],
    tags: ["Ayurveda", "Wellness", "Yoga", "Kerala", "Rejuvenation"],
    included: [
      "Accommodation in a Premium Wellness Resort in Kerela, India",
      "Airport Transfers from Kochi",
      "Comprehensive Wellness Consultant with an Ayurveda Professional",
      "Daily Yoga, Local Sightseeing & Wellness activities as mentioned in the day wise itinerary",
    ],
    notIncluded: [
      "Flights, Visa",
      "Tips or Gratuities",
      "Anything not mentioned in inclusions or day wise itinerary",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day 1: Arrival & Ayurveda Consultation",
        description:
          "Arrival, welcome herbal tea, Ayurveda consultation, light dinner, evening meditation.",
      },
      {
        day: 2,
        title: "Day 2: Yoga & First Ayurveda Treatments",
        description:
          "Morning yoga and pranayama. Ayurveda Treatment with Doctor prescriptions. Lunch. Evening chanting and relaxation.",
      },
      {
        day: 3,
        title: "Day 3: Sunrise Yoga & Shirodhara",
        description:
          "Sunrise yoga. Shirodhara therapy for stress relief. Herbal meals. Afternoon rest. Evening Yoga Nidra.",
      },
      {
        day: 4,
        title: "Day 4: Yoga, Steam Bath & Silent Meditation",
        description:
          "Yoga and pranayama. Ayurveda Treatment with Doctor prescriptions. Steam bath. Ayurveda lunch. Silent meditation in evening.",
      },
      {
        day: 5,
        title: "Day 5: Yoga & Restorative Practices",
        description:
          "Morning yoga. Ayurveda Treatment with Doctor prescriptions. Afternoon relaxation. Guided meditation. Ayurveda meals.",
      },
      {
        day: 6,
        title: "Day 6: Yoga, Pranayama & Chanting",
        description:
          "Morning yoga and pranayama. Ayurveda Treatment with Doctor prescriptions. Herbal lunch. Evening chanting and meditation.",
      },
      {
        day: 7,
        title: "Day 7: Closing Consultation & Departure",
        description:
          "Morning yoga. Closing consultation with doctor for lifestyle guidance. Breakfast. Departure transfers.",
      },
    ],
    gallery: [],
  },

  // ==================== WELLNESS ITINERARY 4 ====================
  {
    title: "7-Night Yoga & Ayurveda Retreat in Rishikesh (7N/8D)",
    location: "Rishikesh, Uttarakhand",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80",
    duration: "7N 8D",
    groupSize: "2 Pax",
    price: "From 2450 USD per person on twin sharing basis",
    rating: 4.9,
    description:
      "A Yoga & Ayurveda Retreat along the sacred Ganges in Rishikesh — the world capital of yoga.",
    fullDescription:
      "Set along the sacred Ganges in Rishikesh — the world capital of yoga — this Yoga & Ayurveda Retreat blends physical healing with spiritual awakening. Through daily yoga, pranayama, meditation, and personalised Ayurvedic therapies, the programme nurtures both body and inner awareness in a deeply serene Himalayan environment. With sattvic meals, guided consultations, nature walks by the Ganga, and participation in the sacred Ganga Aarti ceremony, this retreat is ideal for those seeking mental clarity, emotional balance, and gentle physical rejuvenation. It offers a meaningful pause from modern life while reconnecting with ancient wisdom and mindful living practices. Accommodation: Deluxe Resort.",
    highlights: [
      "Daily Yoga, Pranayama, And Meditation Sessions",
      "Personalized Ayurvedic Therapies And Doctor Consultations",
      "Sattvic Meals To Balance Body And Mind",
      "Ganga Aarti And Local Cultural Experiences",
      "Perfect Retreat For Physical Healing And Spiritual Awakening",
    ],
    tags: ["Yoga", "Ayurveda", "Wellness", "Rishikesh", "Ganges"],
    included: [
      "Accommodation in a Premium Wellness Resort in Rishikesh, Uttarakhand, India",
      "Airport Transfers from New Delhi",
      "Comprehensive Wellness Consultant with an Ayurveda Professional",
      "Daily Yoga, Local Sightseeing & Wellness activities as mentioned in the day wise itinerary",
    ],
    notIncluded: [
      "Flights, Visa",
      "Tips or Gratuities",
      "Anything not mentioned in inclusions or day wise itinerary",
    ],
    itinerary: [
      {
        day: 1,
        title: "Day 1: Arrival & Ayurvedic Consultation",
        description:
          "Arrival, herbal welcome drink, and consultation with Ayurvedic doctor. Evening yoga and meditation session.",
      },
      {
        day: 2,
        title: "Day 2: Hatha Yoga & Abhyanga",
        description:
          "Morning Hatha yoga, Abhyanga therapy, and guided meditation.",
      },
      {
        day: 3,
        title: "Day 3: Shirodhara & Sound Healing",
        description:
          "Shirodhara treatment, pranayama practice, and sound healing in the evening.",
      },
      {
        day: 4,
        title: "Day 4: Yoga & Ayurvedic Cooking",
        description:
          "Yoga, lifestyle consultation, and Ayurvedic cooking demonstration.",
      },
      {
        day: 5,
        title: "Day 5: Restorative Yoga & Nature Walk",
        description:
          "Restorative yoga, nature walk by the Ganga, and herbal steam bath.",
      },
      {
        day: 6,
        title: "Day 6: Meditation & Ganga Aarti",
        description:
          "Meditation, Abhyanga therapy, and optional cultural visit or Ganga Aarti.",
      },
      {
        day: 7,
        title: "Day 7: Morning Yoga & Closing Circle",
        description:
          "Morning yoga and pranayama; closing circle and relaxation therapy.",
      },
      {
        day: 8,
        title: "Day 8: Final Consultation & Departure",
        description: "Final consultation and departure after breakfast.",
      },
    ],
    gallery: [],
  },
];

export default wellnessSeeds;
