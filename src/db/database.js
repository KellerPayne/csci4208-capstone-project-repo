import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('data');

export class Database {
    constructor(filename) {
        this.file = path.join(dbPath, filename);
        this.cache = null;
        this.load();
    }

    load() {
        const raw = fs.readFileSync(this.file, 'utf-8');
        this.cache = JSON.parse(raw);
    }

    save() {
        const tempFile = this.file + '.tmp';
        fs.writeFileSync(tempFile, JSON.stringify(this.cache, null, 2));
        fs.renameSync(tempFile, this.file); // atomic write
    }

    getAll() {
        return this.cache;
    }

    writeAll(data) {
        this.cache = data;
        this.save();
    }
}