import * as fs from 'fs';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import * as multer from 'multer';
import * as path from 'path';
import { uuid } from 'uuidv4';

import { IUploadService } from '../../Domain/Core/IUploadService';
import { IRequest } from '../../Utils/Request/custom';
import { authMiddleware } from '../Middleware/CustomMiddleware';

@controller('/uploads', authMiddleware)
export class UploadController {
  constructor(@inject('IUploadService') private uploadService: IUploadService) {}

  /**
   * TODO: need think about refactoring :)
   * @param {IRequest} request
   */
  @httpPost(
    '/',
    multer({
      storage: multer.diskStorage({
        destination: (req: IRequest, file, callback) => {
          const folderPath = path.resolve(`./public/uploads/${req.user.id}/`);

          if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
          }

          callback(null, folderPath);
        },

        filename(req, file, callback) {
          callback(null, `${uuid()}.${file.mimetype.split('/')[1]}`);
        },
      }),

      fileFilter: (req, file, callback) => {
        if (!file) {
          return callback(new Error('Could not upload image.'), false);
        }

        if (!file.mimetype.startsWith('image/') || !file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(
            new Error('Could not upload image. The file does not match the type: jpeg, png, gif.'),
            false
          );
        }

        callback(null, true);
      },
    }).single('image')
  )
  public upload(request: IRequest) {
    return this.uploadService.fromRequest(request);
  }
}
