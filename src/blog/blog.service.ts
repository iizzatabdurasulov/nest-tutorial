import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
  private blogs: Array<{
    id: number;
    title: string;
    content: string;
  }> = [];

  postBlog(blogData: { title: string; content: string }) {
    const newBlog = {
      id: this.blogs.length + 1,
      title: blogData.title,
      content: blogData.content,
    };

    this.blogs.push(newBlog);

    return {
      message: 'Blog created successfully',
      data: newBlog,
    };
  }

  getBlogById(id: number) {
    const blog = this.blogs.find((blog) => blog.id === Number(id));

    if (!blog) {
      return {
        message: 'Blog not found',
        data: null,
      };
    }

    return {
      message: 'This blog is here',
      data: blog,
    };
  }

  getAllBogs() {
    return this.blogs;
  }
}