import chai from 'chai';
import chaiHttp from 'chai-http';
import rimraf from 'rimraf';
import fs from 'fs';
import path from 'path';
import app from '../lib/app';

chai.use(chaiHttp);
chai.should();

const { expect } = chai;

describe('POST /savefile', () => {
  const OUTPUT_FOLDER = 'generated_test';
  after(() => {
    rimraf(path.resolve(process.cwd(), OUTPUT_FOLDER), () => {});
  });

  it('should post 200 and wirte file', done => {
    chai
      .request(app)
      .post('/savefile')
      .send({
        group: 'group',
        name: 'name',
        content: 'file content',
      })
      .end((err, res) => {
        res.should.have.status(200);
        expect(fs.existsSync(path.resolve(process.cwd(), OUTPUT_FOLDER, 'group', 'name.js'))).to.be
          .true;
        done();
      });
  });

  it('should create incremental file name on second time', done => {
    chai
      .request(app)
      .post('/savefile')
      .send({
        group: 'group',
        name: 'name',
        content: 'file content',
      })
      .end((err, res) => {
        res.should.have.status(200);
        expect(fs.existsSync(path.resolve(process.cwd(), OUTPUT_FOLDER, 'group', 'name_1.js'))).to
          .be.true;
        done();
      });
  });

  it('should get a 400 without data in body', done => {
    chai
      .request(app)
      .post('/savefile')
      .send({ bad_name: 'thing a' })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
