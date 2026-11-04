import { getCollection, type CollectionEntry } from 'astro:content';
import { getCategory, orderedCategories, type CategoryId } from '../data/categories';

export type Post = CollectionEntry<'posts'>;

export function isSample(post: Post): boolean {
  return post.data.sample === true;
}

export function isPublished(post: Post): boolean {
  return post.data.draft !== true && !isSample(post);
}

/**
 * Position inside one 合集. `albumOrder` 1 is the first item in the WeChat
 * album UI. Publish date is not a sort key.
 */
export function compareAlbumOrder(a: Post, b: Post): number {
  const delta = a.data.albumOrder - b.data.albumOrder;
  if (delta !== 0) return delta;
  return a.id.localeCompare(b.id);
}

/** Across 合集: category `order`, then `albumOrder`. Never publish date. */
export function compareCatalogOrder(a: Post, b: Post): number {
  const categoryDelta = getCategory(a.data.category).order - getCategory(b.data.category).order;
  if (categoryDelta !== 0) return categoryDelta;
  return compareAlbumOrder(a, b);
}

function assertUniqueAlbumOrder(posts: Post[]): void {
  const seen = new Map<string, string>();
  for (const post of posts) {
    const key = `${post.data.category}:${post.data.albumOrder}`;
    const previous = seen.get(key);
    if (previous) {
      throw new Error(
        `合集 ${post.data.category} 的 albumOrder ${post.data.albumOrder} 重复：${previous} 与 ${post.id}`,
      );
    }
    seen.set(key, post.id);
  }
}

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => data.draft !== true);
  assertUniqueAlbumOrder(posts);
  return posts.sort(compareCatalogOrder);
}

export function publishedPosts(posts: Post[]): Post[] {
  return posts.filter(isPublished);
}

export function samplePosts(posts: Post[]): Post[] {
  return posts.filter(isSample);
}

export function postsInCategory(posts: Post[], id: CategoryId): Post[] {
  return posts.filter((post) => post.data.category === id).sort(compareAlbumOrder);
}

export function albumNeighbors(
  posts: Post[],
  current: Post,
): { prev: Post | undefined; next: Post | undefined } {
  const sequence = postsInCategory(posts, current.data.category);
  const index = sequence.findIndex((post) => post.id === current.id);
  return {
    prev: index > 0 ? sequence[index - 1] : undefined,
    next: index >= 0 && index < sequence.length - 1 ? sequence[index + 1] : undefined,
  };
}

export function countPublished(posts: Post[], id?: CategoryId): number {
  return posts.filter((post) => isPublished(post) && (id === undefined || post.data.category === id))
    .length;
}

/** Lookup only. Do not iterate this object to render 合集; use orderedCategories(). */
export function categoryCounts(posts: Post[]): Record<CategoryId, number> {
  return Object.fromEntries(
    orderedCategories().map((category) => [category.id, countPublished(posts, category.id)]),
  ) as Record<CategoryId, number>;
}
