export const initialAnimals = [
  {
    id: "a1",
    name: "Bengal Tiger",
    category: "Animal",
    scientificName: "Panthera tigris tigris",
    description: "The Bengal tiger is a population of the Panthera tigris tigris subspecies. It ranks among the biggest wild cats alive today.",
    image: "/images/bengal_tiger_1776439553258.png",
    conservationStatus: "Endangered"
  },
  {
    id: "a2",
    name: "Indian Elephant",
    category: "Animal",
    scientificName: "Elephas maximus indicus",
    description: "The Indian elephant is native to mainland Asia. It has been listed as Endangered on the IUCN Red List.",
    image: "/images/indian_elephant_1776439573898.png",
    conservationStatus: "Endangered"
  },
  {
    id: "a3",
    name: "Snow Leopard",
    category: "Animal",
    scientificName: "Panthera uncia",
    description: "The snow leopard is a felid in the genus Panthera native to the mountain ranges of Central and South Asia.",
    image: "/images/snow_leopard_1776439596888.png",
    conservationStatus: "Vulnerable"
  },
  {
    id: "a4",
    name: "Asiatic Lion",
    category: "Animal",
    scientificName: "Panthera leo persica",
    description: "The Asiatic lion is a Panthera leo population surviving today only in India. Since the turn of the 20th century, its range is restricted to Gir National Park.",
    image: "/images/asiatic_lion_1776440481034.png",
    conservationStatus: "Endangered"
  },
  {
    id: "a5",
    name: "African Elephant",
    category: "Animal",
    scientificName: "Loxodonta africana",
    description: "The African bush elephant is the largest living terrestrial animal, known for its highly intelligent and social nature.",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=800",
    conservationStatus: "Endangered"
  },
  {
    id: "a6",
    name: "Giant Panda",
    category: "Animal",
    scientificName: "Ailuropoda melanoleuca",
    description: "The giant panda is a bear species endemic to China, characterized by its bold black-and-white coat and rotund body.",
    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&q=80&w=800",
    conservationStatus: "Vulnerable"
  },
  {
    id: "a7",
    name: "Cheetah",
    category: "Animal",
    scientificName: "Acinonyx jubatus",
    description: "The cheetah is a large cat native to Africa and central Iran. It is the fastest land animal, estimated to be capable of running at 80 to 128 km/h.",
    image: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&q=80&w=800",
    conservationStatus: "Vulnerable"
  },
  {
    id: "a8",
    name: "Black Rhinoceros",
    category: "Animal",
    scientificName: "Diceros bicornis",
    description: "The black rhinoceros or hook-lipped rhinoceros is a species of rhinoceros, native to eastern and southern Africa.",
    image: "https://images.unsplash.com/photo-1535941339077-2dd1c7963163?auto=format&fit=crop&q=80&w=800",
    conservationStatus: "Critically Endangered"
  },
  {
    id: "b1",
    name: "Indian Peafowl",
    category: "Bird",
    scientificName: "Pavo cristatus",
    description: "The Indian peafowl, also known as the common peafowl, and blue peafowl, is a peafowl species native to the Indian subcontinent.",
    image: "/images/indian_peafowl_1776440439661.png",
    conservationStatus: "Least Concern"
  },
  {
    id: "b2",
    name: "Great Hornbill",
    category: "Bird",
    scientificName: "Buceros bicornis",
    description: "The great hornbill also known as the concave-casqued hornbill, great Indian hornbill or great pied hornbill, is one of the larger members of the hornbill family.",
    image: "/images/great_hornbill_1776440460708.png",
    conservationStatus: "Vulnerable"
  },
  {
    id: "b3",
    name: "Scarlet Macaw",
    category: "Bird",
    scientificName: "Ara macao",
    description: "The scarlet macaw is a large red, yellow, and blue Central and South American parrot.",
    image: "https://images.unsplash.com/photo-1552728089-571ebd13eb32?auto=format&fit=crop&q=80&w=800",
    conservationStatus: "Least Concern"
  },
  {
    id: "b4",
    name: "Emperor Penguin",
    category: "Bird",
    scientificName: "Aptenodytes forsteri",
    description: "The emperor penguin is the tallest and heaviest of all living penguin species and is endemic to Antarctica.",
    image: "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&q=80&w=800",
    conservationStatus: "Near Threatened"
  },
  {
    id: "b5",
    name: "Greater Flamingo",
    category: "Bird",
    scientificName: "Phoenicopterus roseus",
    description: "The greater flamingo is the most widespread and largest species of the flamingo family.",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800",
    conservationStatus: "Least Concern"
  }
];

export const initialHotspots = [
  // Bengal Tiger Hotspots
  { id: "h1", animalId: "a1", name: "Ranthambore National Park", description: "One of the largest national parks in northern India, famous for its Bengal tiger population.", latitude: 26.0173, longitude: 76.5026, bestTimeToVisit: "October to June" },
  { id: "h2", animalId: "a1", name: "Jim Corbett National Park", description: "The oldest national park in India, known for protecting the endangered Bengal tiger.", latitude: 29.5300, longitude: 78.7747, bestTimeToVisit: "November to June" },
  { id: "h2_1", animalId: "a1", name: "Bandhavgarh National Park", description: "Known for the highest density of Bengal tigers in the world.", latitude: 23.7225, longitude: 81.0125, bestTimeToVisit: "October to June" },
  
  // Indian Elephant Hotspots
  { id: "h3", animalId: "a2", name: "Kaziranga National Park", description: "A national park in the state of Assam, India. Hosts large populations of elephants.", latitude: 26.5775, longitude: 93.1711, bestTimeToVisit: "November to April" },
  { id: "h4", animalId: "a2", name: "Periyar National Park", description: "Notable as an elephant reserve and a tiger reserve in Kerala.", latitude: 9.4679, longitude: 77.1396, bestTimeToVisit: "September to April" },

  // Snow Leopard Hotspots
  { id: "h5", animalId: "a3", name: "Hemis National Park", description: "A high altitude national park in Ladakh, India. Globally famous for its snow leopards.", latitude: 33.7917, longitude: 77.3467, bestTimeToVisit: "May to September" },
  { id: "h5_1", animalId: "a3", name: "Kibber Wildlife Sanctuary", description: "High altitude sanctuary situated in the Spiti Valley, a prime snow leopard territory.", latitude: 32.3333, longitude: 78.0000, bestTimeToVisit: "June to October" },

  // Asiatic Lion
  { id: "h6", animalId: "a4", name: "Gir National Park", description: "The only remaining natural habitat of the Asiatic lion.", latitude: 21.1243, longitude: 70.8242, bestTimeToVisit: "December to March" },

  // African Elephant
  { id: "h9", animalId: "a5", name: "Chobe National Park", description: "Known for its massive elephant population in Botswana.", latitude: -18.6644, longitude: 24.6293, bestTimeToVisit: "May to October" },
  { id: "h10", animalId: "a5", name: "Amboseli National Park", description: "Famous for being the best place in the world to get close to free-ranging elephants.", latitude: -2.6527, longitude: 37.2606, bestTimeToVisit: "June to October" },
  
  // Giant Panda
  { id: "h11", animalId: "a6", name: "Chengdu Research Base", description: "A public non-profit breeding and research facility for giant pandas and other rare animals.", latitude: 30.7329, longitude: 104.1444, bestTimeToVisit: "March to May" },
  { id: "h12", animalId: "a6", name: "Wolong National Nature Reserve", description: "Protected area located in Wenchuan County, known for giant panda habitats.", latitude: 31.0264, longitude: 103.1873, bestTimeToVisit: "September to November" },
  
  // Cheetah
  { id: "h13", animalId: "a7", name: "Serengeti National Park", description: "Tanzanian national park in the Serengeti ecosystem, famous for its cheetahs.", latitude: -2.3333, longitude: 34.8333, bestTimeToVisit: "June to October" },
  { id: "h14", animalId: "a7", name: "Kruger National Park", description: "One of Africa's largest game reserves, offering excellent cheetah spotting.", latitude: -23.9884, longitude: 31.5547, bestTimeToVisit: "May to September" },
  
  // Black Rhino
  { id: "h15", animalId: "a8", name: "Etosha National Park", description: "One of the largest national parks in Namibia, excellent for seeing black rhinos at waterholes.", latitude: -18.8556, longitude: 15.8959, bestTimeToVisit: "May to December" },

  // Indian Peafowl
  { id: "h7", animalId: "b1", name: "Keoladeo National Park", description: "A famous avifauna sanctuary that hosts thousands of birds, especially during the winter season.", latitude: 27.1596, longitude: 77.5235, bestTimeToVisit: "August to November" },

  // Great Hornbill
  { id: "h8", animalId: "b2", name: "Namdapha National Park", description: "The largest protected area in the Eastern Himalaya biodiversity hotspot, home to the Great Hornbill.", latitude: 27.4939, longitude: 96.3942, bestTimeToVisit: "October to March" },
  
  // Scarlet Macaw
  { id: "h16", animalId: "b3", name: "Corcovado National Park", description: "Internationally renowned biodiversity spot in Costa Rica with flourishing scarlet macaw populations.", latitude: 8.5375, longitude: -83.5681, bestTimeToVisit: "December to April" },
  { id: "h17", animalId: "b3", name: "Tambopata National Reserve", description: "Peruvian Amazon reserve known for macaw clay licks.", latitude: -12.9833, longitude: -69.2667, bestTimeToVisit: "May to October" },

  // Emperor Penguin
  { id: "h18", animalId: "b4", name: "Snow Hill Island", description: "An almost completely snow-capped island in Antarctica, home to a large Emperor Penguin colony.", latitude: -64.4667, longitude: -57.4333, bestTimeToVisit: "October to November" },

  // Flamingo
  { id: "h19", animalId: "b5", name: "Lake Nakuru", description: "One of the Rift Valley soda lakes, famous for its vast flocks of flamingos.", latitude: -0.3667, longitude: 36.0833, bestTimeToVisit: "July to December" },
  { id: "h20", animalId: "b5", name: "Camargue", description: "Natural region located south of Arles, France, known for its population of greater flamingos.", latitude: 43.5333, longitude: 4.5333, bestTimeToVisit: "May to June" }
];
