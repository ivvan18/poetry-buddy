import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

@Injectable()
export class RhymeService {
  private rhymeCache: any = {};
  private cacheLimit = 15;
  private cacheIndex: string[] = [];

  constructor(private http: Http) { }

  search(word: string): Observable<string[]> {
    if (word === '') {
      return Observable.of([]);
    }

    if (word in this.rhymeCache) {
      return Observable.of(this.rhymeCache[word]);
    }

    const rhymeUrl = `https://api.datamuse.com/words?rel_rhy=${word}`;

    return this.http.get(rhymeUrl).map(response => {
      const rhymes = response.json().map((rhyme) => {
        return rhyme.word;
      });
      this.updateRhymeCache(word, rhymes);
      return <string[]>rhymes;
    });
  }

  updateRhymeCache(word: string, rhymes: string[]): void {
    const isRoomInCache = (this.cacheIndex.length < this.cacheLimit);
    if (isRoomInCache) {
      this.pushWordToCache(word, rhymes);
    } else {
      this.removeCacheOldestWord();
      this.pushWordToCache(word, rhymes);
    }
  }

  pushWordToCache(word: string, rhymes: string[]) : void {
    this.cacheIndex.push(word);
    this.rhymeCache[word] = rhymes;
  }

  removeCacheOldestWord(): void {
    const oldestWordInCache = this.cacheIndex.shift();
    delete this.rhymeCache[oldestWordInCache];
  }
  }
