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
    name: "Marty Kacin",
    nickname: "Dr. Farty",
    bio: "Known for explosive starts but occasionally gasses out before the final turn. A true high-risk, high-reward pick.",
    speed_stat: 92,
    stamina_stat: 75,
    image_url: "https://api.dicebear.com/9.x/avataaars/svg?seed=Oliver&hairColor=d0021b,ff5c5c&skinColor=ffdbb4",
  },
  {
    id: "r2",
    name: "Charlie Lennig",
    nickname: "Mustache",
    bio: "Last years Winner. Won't be the fastest off the line, but will never slow down.",
    speed_stat: 88,
    stamina_stat: 98,
    image_url: "https://api.dicebear.com/9.x/avataaars/svg?seed=Charlie&top=longHairNotTooLong&hairColor=c0392b&facialHair=moustacheMagnum&facialHairColor=c0392b&skinColor=edb98a",
  }];