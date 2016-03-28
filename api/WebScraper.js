import cheerio from 'cheerio';
import request from 'request-promise';

class WebScraper {
  constructor(baseURL = "http://jisho.org/search/") {
    this.baseURL = baseURL;
  }

  scrape(word) {
    console.log(word);
    return request(this.baseURL + word)
      .then((res) => {
        const $ = cheerio.load(res, {
          normalizeWhitespace: true,
          // xmlMode: true
        });

        let english = this._scrapeEnglish($);
        let japanese = this._scrapeJapanese($);
        let json = {
          keyword: word,
          english: english,
          japanese: japanese
        };
        return json
      })
      .catch((err) => {
        return err;
      })
  }

  _scrapeJapanese($) {
    let japArr = [];
    let japanese = {
      furigana: 'Furigana',
      kanji: 'Kanji',
      type: 'Type',
      level: 'Level'
    };

    $('#primary > div.exact_block > div:nth-child(2) > div.concept_light-wrapper.columns.zero-padding').filter(function(i, el) {
      console.log(i);
      let data = $(this);
      japanese.furigana = data.find('span.furigana').first().text();
      japanese.kanji = data.find('span.text').first().text();
      console.log(japanese.kanji);
      japanese.type = data.find('span.concept_light-common').first().text();
      japanese.level = data.find('span.concept_light-tag > a').first().text();
      japArr.push(japanese);
    });

    // if the arr is empty, init it
    // if (japArr.length === 0) {
    //   japArr.push(japanese);
    // }
    //
    // return japArr;
    return japanese;
  }

  _scrapeEnglish($) {

    let english = {
      meaning: 'Meaning',
      tags: 'Tags',
      number: -1,
    };
    $('#primary > div.exact_block > div:nth-child(2) > div.concept_light-meanings.medium-9.columns > div.meanings-wrapper').filter(function(i, el) {
      let data = $(this);
      english.meaning = data.find('.meaning-wrapper .meaning-meaning').first().text();
      english.number = data.find('.meaning-wrapper .meaning-definition-section_divider').first().text();
      english.tags = data.find('.meaning-tags').first().text();
    });

    return english;
  }
}

export default WebScraper;
