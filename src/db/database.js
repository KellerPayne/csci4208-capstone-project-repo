import fs from 'fs';    // import file system module to read, write, and rename files
import path from 'path';        // import path module from Node to help build file paths

const dbPath = path.resolve('data');    // creates an absolute path on system with folder named "data"

/*
Constructor method that creates a new database for a json file passed in as argument.
*/

export class Database {
    constructor(fileName) {     // create an instance of Database class that controls the fileName passed in
        this.file = path.join(dbPath, fileName);    // combines absolute path and the fileName, essentially adding the file to the directory
        this.cache = null;      // sets up an in-memory cache for collection being created
        this.load();    // calls the load method explained below
    }

    load() {    // reads information from the database from the JSON file into memory
        const raw = fs.readFileSync(this.file, 'utf-8');    // reads JSON file synchronously, blocking any other reads from happening, interprets it as a text file and returns a string and not a buffer
        this.cache = JSON.parse(raw);   // converts raw JSON string into a JS value
    }

    save() {    // writes cache back to disk atomically
        const tempFile = this.file + '.tmp';    // builds a temp file name next to real file
        fs.writeFileSync(tempFile, JSON.stringify(this.cache, null, 2));    // converts tempFile into a JSON string indented with 2 spaces; writes the JSON string to temp file
        fs.renameSync(tempFile, this.file); // atomic write that renames the temp file to the real filename after it is fully written, swapping it with the new file in one operation
    }

    getAll() {  // accessor method that returns the in-memory cache directly as an array of objects
        return this.cache;
    }

    writeAll(data) {    // replaces cache data and saves it
        this.cache = data; // replaces whatever was in memory with data passed as argument
        this.save();        // calls save() method above to write the new cache to disk
    }
}