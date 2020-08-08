import { controller, httpGet } from 'inversify-express-utils';

@controller('/')
export class HomeController {
  @httpGet('/')
  public home(): any {
    return { message: 'Home page.' };
  }
}
