export type Maybe<T> = T | null;

// ====================================================
// Types
// ====================================================

export interface Query {
  unused?: Maybe<string>;

  books?: Maybe<(Maybe<Book>)[]>;
}

export interface Book {
  title?: Maybe<string>;

  author?: Maybe<string>;
}

export interface Mutation {
  unused?: Maybe<string>;

  addBooks?: Maybe<string>;
}

export interface Subscription {
  unused?: Maybe<string>;
}

// ====================================================
// Arguments
// ====================================================

export interface AddBooksMutationArgs {
  title: string;
}
