export interface Runner {
  id: string;
  name: string;
  nickname: string;
  bio: string;
  speed_stat: number; // 1-100
  stamina_stat: number; // 1-100
  image_url: string;
}

export const runners: Runner[] = [
  {
    id: "r1",
    name: "Oliver Thorne",
    nickname: "The Fireball",
    bio: "Known for explosive starts but occasionally gasses out before the final turn. A true high-risk, high-reward pick.",
    speed_stat: 92,
    stamina_stat: 65,
    image_url: "https://api.dicebear.com/9.x/avataaars/svg?seed=Oliver&hairColor=d0021b,ff5c5c&skinColor=ffdbb4",
  },
  {
    id: "r2",
    name: "Liam O'Connor",
    nickname: "Iron Lungs",
    bio: "A marathon runner who accidentally signed up for a sprint. Won't be the fastest off the line, but will never slow down.",
    speed_stat: 60,
    stamina_stat: 98,
    image_url: "https://api.dicebear.com/9.x/avataaars/svg?seed=Liam&hairColor=d0021b,ff5c5c&skinColor=edb98a",
  },
  {
    id: "r3",
    name: "Chloe Evans",
    nickname: "Crimson Blur",
    bio: "Defending champion from last year. Unmatched biomechanics and an intimidating pre-race stare.",
    speed_stat: 88,
    stamina_stat: 85,
    image_url: "https://api.dicebear.com/9.x/avataaars/svg?seed=Chloe&hairColor=d0021b,ff5c5c&skinColor=ffdbb4",
  },
  {
    id: "r4",
    name: "Noah 'Rusty' Brooks",
    nickname: "Rusty",
    bio: "Mostly here for the free post-race pizza. Surprisingly agile when motivated by food.",
    speed_stat: 75,
    stamina_stat: 70,
    image_url: "https://api.dicebear.com/9.x/avataaars/svg?seed=Noah&hairColor=d0021b,ff5c5c&skinColor=ffdbb4",
  },
  {
    id: "r5",
    name: "Emma Gingerich",
    nickname: "The Wildcard",
    bio: "Runs with chaotic energy. Her path is unpredictable, but she covers ground astonishingly fast.",
    speed_stat: 85,
    stamina_stat: 78,
    image_url: "https://api.dicebear.com/9.x/avataaars/svg?seed=Emma&hairColor=d0021b,ff5c5c&skinColor=edb98a",
  }
];

// Mock starting prediction counts
export const initialMockPredictions: Record<string, number> = {
  "r1": 150,
  "r2": 80,
  "r3": 300,  // Favorite
  "r4": 45,   // Underdog
  "r5": 110,
};
