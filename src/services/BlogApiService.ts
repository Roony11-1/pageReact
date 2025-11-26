import { Blog } from "../model/Blog";
import { BaseApiService } from "./BaseApiService";

export class BlogApiService extends BaseApiService<Blog> 
{
  constructor() 
  {
    super("blog", Blog);
  }
}