// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export interface MiniPost {
  title: string;
  date: string;
  author: {
    name: string;
  };
  coverImage?: string;
  excerpt: string;
  breadCrumbs: string[];
}

export interface FullPost extends MiniPost {
  content: string;
}
