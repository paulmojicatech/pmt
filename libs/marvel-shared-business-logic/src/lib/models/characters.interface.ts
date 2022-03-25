export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  comics: { resourceURI: string }[];
}

export interface CharacterHttpResp {
  code: number;
  status: string;
  attributionHTML: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: {
      id: number;
      name: string;
      description: string;
      modified: string;
      thumbnail: {
        path: string;
        extension: string;
      };
      resourceURI: string;
      comics: {
        available: number;
        collectionURI: string;
        items: {
          resourceURI: string;
          name: string;
        }[];
      };
    }[];
  };
}
