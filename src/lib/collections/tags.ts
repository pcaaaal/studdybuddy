import {pb} from '../pocketbase';

export async function getTagById(tagId: string) {
  try {
    return await pb.collection('tag').getOne(tagId, {requestKey: null});
  } catch (err) {
    console.error(`Failed to fetch tag with ID ${tagId}:`, err);
    return null;
  }
}