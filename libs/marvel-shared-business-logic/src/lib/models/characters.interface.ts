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
      description: '';
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
