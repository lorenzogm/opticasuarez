import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  categories: string[];
  featured_image?: string;
  slug: string;
  content: string;
}

export function getBlogPosts(): BlogPost[] {
  try {
    const contentDir = path.join(process.cwd(), 'app/content/blog');
    
    // Check if directory exists
    if (!fs.existsSync(contentDir)) {
      return [];
    }
    
    const files = fs.readdirSync(contentDir);
    const mdFiles = files.filter(file => file.endsWith('.md'));
    
    const posts = mdFiles.map(file => {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      return {
        ...data,
        content,
        slug: data.slug || file.replace('.md', ''),
      } as BlogPost;
    });
    
    // Sort by date, newest first
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const posts = getBlogPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error('Error reading blog post:', error);
    return null;
  }
}