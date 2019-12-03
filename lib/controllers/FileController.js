import fs from 'fs';
import path from 'path';

function saveFile(basePath, name, ext, content) {
  let count = 0;
  let filePath = path.resolve(basePath, `${name}.${ext}`);
  while (fs.existsSync(filePath)) {
    count += 1;
    console.log(count, filePath, 'exists!');
    filePath = path.resolve(basePath, `${name}_${count}.${ext}`);
  }
  fs.writeFileSync(filePath, content);
}

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

    saveFile(basePath, req.body.name, 'js', req.body.code);
    saveFile(basePath, req.body.name, 'json', req.body.fixture);

    return res.status(200).json({
      message: 'Saved',
    });
  }
}
