export const PHONE_NUMBER = "03121231231";
import img1 from "@/public/images/services-1.jpg";
import img2 from "@/public/images/mural-5.png";
export const SERVICES: {
  id: string;
  title: string;
  description: string;
  image: string;
}[] = [
  {
    id: "cabinet",
    title: "Mural Wall Painting",
    description:
      "We will paint your school, your wall with custom design you provide. Whether you want to provide education, guidance, or just make it beautiful we got you covered. Fateh Jang painting writing by Sadaqat Arts Painter School cartoon , school writing School wall painting. Class room painting sign art sign writing. Calligraphy art",
    image: img1.src,
  },

  {
    id: "wallpaper",
    title: "Custom Portrait Paintings",
    description:
      "Make custom portrait paintings for your loved ones, for your self, for buildings , trees, things, scene or any other things , you want to keep memory of",
    image: img2.src,
  },
];
