import type {NextApiRequest, NextApiResponse} from 'next';

type ResponseData = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'POST') {
    // Process a POST request
    res.status(200).json({message: 'POST request received'});
  } else {
    res.status(404).json({message: 'Not Found'});
  }
}