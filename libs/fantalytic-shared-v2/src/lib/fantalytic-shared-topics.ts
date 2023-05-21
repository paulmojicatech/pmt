/* eslint-disable @typescript-eslint/no-explicit-any */
import { Topic } from './models/topics/topics.interface';

export function parseESPNRSSFeed(httpResponse: any): Topic[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(httpResponse, 'application/xml');
  const items = doc.getElementsByTagName('item');
  let topics: Topic[] = [];
  for (let i = 0; i < items.length; i++) {
    const topic = parseRssItemResponse(items[i]);
    topics = [...topics, topic];
  }
  // console.log('DOC', doc); 
  return topics;
}

function parseRssItemResponse(item: Element): Topic {
  const title = item.getElementsByTagName('title')[0].textContent ?? '';
  const description = item.getElementsByTagName('description')[0].firstChild?.textContent ?? '';
  const imageUrl = item.getElementsByTagName('enclosure')[0]?.getAttribute('url') ?? '';
  const link = item.getElementsByTagName('link')[0].firstChild?.textContent ?? '';
  const publishedDate = item.getElementsByTagName('pubDate')[0].textContent ?? '';
  const topic = {title, description, publishedDate, imageUrl,  link};
  return topic;
}
