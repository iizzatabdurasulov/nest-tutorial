import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BlogService } from './blog.service.js';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // Post method
  @Post()
  postBlog(@Body() blogData: { title: string; content: string }) {
    return this.blogService.postBlog(blogData);
  }

  // Get by id
  @Get(':id')
  getBlogById(@Param('id') id: number) {
    return this.blogService.getBlogById(id);
  }
  // Get all
  @Get()
  getAllBlog() {
    return this.blogService.getAllBogs();
  }
}
