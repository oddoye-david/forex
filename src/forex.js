'use strict';

require("babel-polyfill");

import axios from 'axios';
import cheerio from 'cheerio';
import randomUA from 'random-ua';

import { stripCommas } from './utils';

/**
 * A method to scrape forex from www.xe.com
 * @param  String amount
 * @param  String base
 * @return String
 */
async function convertForex(amount, fromCurrency, toCurrency) {
  try {
    const response = await axios.get(`http://www.xe.com/currencyconverter/convert/?Amount=${amount}&From=${fromCurrency}&To=${toCurrency}`, {
      headers: {
        'User-Agent': randomUA.generate(),
      },
    });
    const {
      data,
    } = response;
    const $ = cheerio.load(data);
    const result = $('span.uccResultAmount').text().replace('GHS', '').replace(/\s\s*$/, '');
    const a = {
      amount: result,
      exchangeRate: Number(stripCommas(result.toString()) / stripCommas(amount.toString())).toFixed(2),
    };

    return a;
  } catch (error) {
    throw error;
  }
}

const ref = {
  amount: null,
  from: 'USD',
  to: 'EUR',
};


async function to(currency) {
  if (currency && typeof currency === 'string' && currency.length === 3) {
    ref.to = currency;
    const res = await convertForex(ref.amount, ref.from, ref.to);
    return res;
  }
  throw new Error('Please pass a valid ISO Currency code.');
}

function from(currency) {
  if (currency && typeof currency === 'string' && currency.length === 3) {
    ref.from = currency;
    return {
      to,
    };
  }
  throw new Error('Please pass a valid ISO Currency code.');
}

export default function Forex(amount) {
  if (amount && Number(amount)) {
    ref.amount = amount;
    return {
      from,
    };
  }
  throw new Error('Please pass a valid amount.');
}
