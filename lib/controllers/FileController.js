import fs from 'fs';
import path from 'path';

export default class FileController {
  static async saveFile(req, res) {
    const OUTPUT_FOLDER = 'generated_test';

    let basePath = path.resolve(process.cwd(), OUTPUT_FOLDER);

    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath);
    }

    basePath = path.resolve(basePath, req.body.group);

    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath);
    }

    let count = 0;
    let filePath = path.resolve(basePath, `${req.body.name}.js`);
    while (fs.existsSync(filePath)) {
      count += 1;
      console.log(count, filePath, 'exists!');
      filePath = path.resolve(basePath, `${req.body.name}_${count}.js`);
    }
    fs.writeFileSync(filePath, req.body.content);

    return res.status(200).json({
      message: 'Saved',
    });
  }
}
