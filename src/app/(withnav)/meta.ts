import { scenarios } from '@/config/scenarios';


export const meta = scenarios.map(({ title, description, href, avatarImage }) => ({
  title,
  description,
  href,
  avatarImage
}));
